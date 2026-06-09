import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, finalize } from 'rxjs';

import { State } from 'app/entities/enumerations/state.model';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { WorkingDayCourseService } from '../service/working-day-course.service';
import { IWorkingDayCourse } from '../working-day-course.model';

import { WorkingDayCourseFormGroup, WorkingDayCourseFormService } from './working-day-course-form.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ceet-working-day-course-update',
  templateUrl: './working-day-course-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class WorkingDayCourseUpdate implements OnInit {
  readonly isSaving = signal(false);
  workingDayCourse: IWorkingDayCourse | null = null;
  stateValues = Object.keys(State);

  protected workingDayCourseService = inject(WorkingDayCourseService);
  protected workingDayCourseFormService = inject(WorkingDayCourseFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: WorkingDayCourseFormGroup = this.workingDayCourseFormService.createWorkingDayCourseFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ workingDayCourse }) => {
      this.workingDayCourse = workingDayCourse;
      if (workingDayCourse) {
        this.updateForm(workingDayCourse);
      }
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const workingDayCourse = this.workingDayCourseFormService.getWorkingDayCourse(this.editForm);
    if (workingDayCourse.id === null) {
      this.subscribeToSaveResponse(this.workingDayCourseService.create(workingDayCourse));
    } else {
      this.subscribeToSaveResponse(this.workingDayCourseService.update(workingDayCourse));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IWorkingDayCourse | null>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving.set(false);
  }

  protected updateForm(workingDayCourse: IWorkingDayCourse): void {
    this.workingDayCourse = workingDayCourse;
    this.workingDayCourseFormService.resetForm(this.editForm, workingDayCourse);
  }
}
