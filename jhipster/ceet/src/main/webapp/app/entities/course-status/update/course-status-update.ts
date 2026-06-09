import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, finalize } from 'rxjs';

import { State } from 'app/entities/enumerations/state.model';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { ICourseStatus } from '../course-status.model';
import { CourseStatusService } from '../service/course-status.service';

import { CourseStatusFormGroup, CourseStatusFormService } from './course-status-form.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ceet-course-status-update',
  templateUrl: './course-status-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class CourseStatusUpdate implements OnInit {
  readonly isSaving = signal(false);
  courseStatus: ICourseStatus | null = null;
  stateValues = Object.keys(State);

  protected courseStatusService = inject(CourseStatusService);
  protected courseStatusFormService = inject(CourseStatusFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CourseStatusFormGroup = this.courseStatusFormService.createCourseStatusFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ courseStatus }) => {
      this.courseStatus = courseStatus;
      if (courseStatus) {
        this.updateForm(courseStatus);
      }
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const courseStatus = this.courseStatusFormService.getCourseStatus(this.editForm);
    if (courseStatus.id === null) {
      this.subscribeToSaveResponse(this.courseStatusService.create(courseStatus));
    } else {
      this.subscribeToSaveResponse(this.courseStatusService.update(courseStatus));
    }
  }

  protected subscribeToSaveResponse(result: Observable<ICourseStatus | null>): void {
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

  protected updateForm(courseStatus: ICourseStatus): void {
    this.courseStatus = courseStatus;
    this.courseStatusFormService.resetForm(this.editForm, courseStatus);
  }
}
