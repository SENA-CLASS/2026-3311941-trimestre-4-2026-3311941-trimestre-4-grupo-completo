import { HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, finalize, map } from 'rxjs';

import { IDay } from 'app/entities/day/day.model';
import { DayService } from 'app/entities/day/service/day.service';
import { IInstructorWorkingDay } from 'app/entities/instructor-working-day/instructor-working-day.model';
import { InstructorWorkingDayService } from 'app/entities/instructor-working-day/service/instructor-working-day.service';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { WorkingDayService } from '../service/working-day.service';
import { IWorkingDay } from '../working-day.model';

import { WorkingDayFormGroup, WorkingDayFormService } from './working-day-form.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ceet-working-day-update',
  templateUrl: './working-day-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class WorkingDayUpdate implements OnInit {
  readonly isSaving = signal(false);
  workingDay: IWorkingDay | null = null;

  instructorWorkingDaysSharedCollection = signal<IInstructorWorkingDay[]>([]);
  daysSharedCollection = signal<IDay[]>([]);

  protected workingDayService = inject(WorkingDayService);
  protected workingDayFormService = inject(WorkingDayFormService);
  protected instructorWorkingDayService = inject(InstructorWorkingDayService);
  protected dayService = inject(DayService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: WorkingDayFormGroup = this.workingDayFormService.createWorkingDayFormGroup();

  compareInstructorWorkingDay = (o1: IInstructorWorkingDay | null, o2: IInstructorWorkingDay | null): boolean =>
    this.instructorWorkingDayService.compareInstructorWorkingDay(o1, o2);

  compareDay = (o1: IDay | null, o2: IDay | null): boolean => this.dayService.compareDay(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ workingDay }) => {
      this.workingDay = workingDay;
      if (workingDay) {
        this.updateForm(workingDay);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const workingDay = this.workingDayFormService.getWorkingDay(this.editForm);
    if (workingDay.id === null) {
      this.subscribeToSaveResponse(this.workingDayService.create(workingDay));
    } else {
      this.subscribeToSaveResponse(this.workingDayService.update(workingDay));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IWorkingDay | null>): void {
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

  protected updateForm(workingDay: IWorkingDay): void {
    this.workingDay = workingDay;
    this.workingDayFormService.resetForm(this.editForm, workingDay);

    this.instructorWorkingDaysSharedCollection.update(instructorWorkingDays =>
      this.instructorWorkingDayService.addInstructorWorkingDayToCollectionIfMissing<IInstructorWorkingDay>(
        instructorWorkingDays,
        workingDay.instructorWorkingDay,
      ),
    );
    this.daysSharedCollection.update(days => this.dayService.addDayToCollectionIfMissing<IDay>(days, workingDay.day));
  }

  protected loadRelationshipsOptions(): void {
    this.instructorWorkingDayService
      .query()
      .pipe(map((res: HttpResponse<IInstructorWorkingDay[]>) => res.body ?? []))
      .pipe(
        map((instructorWorkingDays: IInstructorWorkingDay[]) =>
          this.instructorWorkingDayService.addInstructorWorkingDayToCollectionIfMissing<IInstructorWorkingDay>(
            instructorWorkingDays,
            this.workingDay?.instructorWorkingDay,
          ),
        ),
      )
      .subscribe((instructorWorkingDays: IInstructorWorkingDay[]) => this.instructorWorkingDaysSharedCollection.set(instructorWorkingDays));

    this.dayService
      .query()
      .pipe(map((res: HttpResponse<IDay[]>) => res.body ?? []))
      .pipe(map((days: IDay[]) => this.dayService.addDayToCollectionIfMissing<IDay>(days, this.workingDay?.day)))
      .subscribe((days: IDay[]) => this.daysSharedCollection.set(days));
  }
}
