import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { State } from 'app/entities/enumerations/state.model';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IInstructorWorkingDay } from '../instructor-working-day.model';
import { InstructorWorkingDayService } from '../service/instructor-working-day.service';

import { InstructorWorkingDayFormGroup, InstructorWorkingDayFormService } from './instructor-working-day-form.service';

@Component({
  selector: 'ceet-instructor-working-day-update',
  templateUrl: './instructor-working-day-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class InstructorWorkingDayUpdate implements OnInit {
  readonly isSaving = signal(false);
  instructorWorkingDay: IInstructorWorkingDay | null = null;
  stateValues = Object.keys(State);

  protected instructorWorkingDayService = inject(InstructorWorkingDayService);
  protected instructorWorkingDayFormService = inject(InstructorWorkingDayFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: InstructorWorkingDayFormGroup = this.instructorWorkingDayFormService.createInstructorWorkingDayFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ instructorWorkingDay }) => {
      this.instructorWorkingDay = instructorWorkingDay;
      if (instructorWorkingDay) {
        this.updateForm(instructorWorkingDay);
      }
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const instructorWorkingDay = this.instructorWorkingDayFormService.getInstructorWorkingDay(this.editForm);
    if (instructorWorkingDay.id === null) {
      this.subscribeToSaveResponse(this.instructorWorkingDayService.create(instructorWorkingDay));
    } else {
      this.subscribeToSaveResponse(this.instructorWorkingDayService.update(instructorWorkingDay));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IInstructorWorkingDay | null>): void {
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

  protected updateForm(instructorWorkingDay: IInstructorWorkingDay): void {
    this.instructorWorkingDay = instructorWorkingDay;
    this.instructorWorkingDayFormService.resetForm(this.editForm, instructorWorkingDay);
  }
}
