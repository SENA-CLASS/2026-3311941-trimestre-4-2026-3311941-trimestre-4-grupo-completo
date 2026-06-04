import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IBondingInstructor } from 'app/entities/bonding-instructor/bonding-instructor.model';
import { BondingInstructorService } from 'app/entities/bonding-instructor/service/bonding-instructor.service';
import { IInstructorWorkingDay } from 'app/entities/instructor-working-day/instructor-working-day.model';
import { InstructorWorkingDayService } from 'app/entities/instructor-working-day/service/instructor-working-day.service';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IBoundingSchedule } from '../bounding-schedule.model';
import { BoundingScheduleService } from '../service/bounding-schedule.service';

import { BoundingScheduleFormGroup, BoundingScheduleFormService } from './bounding-schedule-form.service';

@Component({
  selector: 'ceet-bounding-schedule-update',
  templateUrl: './bounding-schedule-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class BoundingScheduleUpdate implements OnInit {
  readonly isSaving = signal(false);
  boundingSchedule: IBoundingSchedule | null = null;

  bondingInstructorsSharedCollection = signal<IBondingInstructor[]>([]);
  instructorWorkingDaysSharedCollection = signal<IInstructorWorkingDay[]>([]);

  protected boundingScheduleService = inject(BoundingScheduleService);
  protected boundingScheduleFormService = inject(BoundingScheduleFormService);
  protected bondingInstructorService = inject(BondingInstructorService);
  protected instructorWorkingDayService = inject(InstructorWorkingDayService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: BoundingScheduleFormGroup = this.boundingScheduleFormService.createBoundingScheduleFormGroup();

  compareBondingInstructor = (o1: IBondingInstructor | null, o2: IBondingInstructor | null): boolean =>
    this.bondingInstructorService.compareBondingInstructor(o1, o2);

  compareInstructorWorkingDay = (o1: IInstructorWorkingDay | null, o2: IInstructorWorkingDay | null): boolean =>
    this.instructorWorkingDayService.compareInstructorWorkingDay(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ boundingSchedule }) => {
      this.boundingSchedule = boundingSchedule;
      if (boundingSchedule) {
        this.updateForm(boundingSchedule);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const boundingSchedule = this.boundingScheduleFormService.getBoundingSchedule(this.editForm);
    if (boundingSchedule.id === null) {
      this.subscribeToSaveResponse(this.boundingScheduleService.create(boundingSchedule));
    } else {
      this.subscribeToSaveResponse(this.boundingScheduleService.update(boundingSchedule));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IBoundingSchedule | null>): void {
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

  protected updateForm(boundingSchedule: IBoundingSchedule): void {
    this.boundingSchedule = boundingSchedule;
    this.boundingScheduleFormService.resetForm(this.editForm, boundingSchedule);

    this.bondingInstructorsSharedCollection.update(bondingInstructors =>
      this.bondingInstructorService.addBondingInstructorToCollectionIfMissing<IBondingInstructor>(
        bondingInstructors,
        boundingSchedule.bondingInstructor,
      ),
    );
    this.instructorWorkingDaysSharedCollection.update(instructorWorkingDays =>
      this.instructorWorkingDayService.addInstructorWorkingDayToCollectionIfMissing<IInstructorWorkingDay>(
        instructorWorkingDays,
        boundingSchedule.instructorWorkingDay,
      ),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.bondingInstructorService
      .query()
      .pipe(map((res: HttpResponse<IBondingInstructor[]>) => res.body ?? []))
      .pipe(
        map((bondingInstructors: IBondingInstructor[]) =>
          this.bondingInstructorService.addBondingInstructorToCollectionIfMissing<IBondingInstructor>(
            bondingInstructors,
            this.boundingSchedule?.bondingInstructor,
          ),
        ),
      )
      .subscribe((bondingInstructors: IBondingInstructor[]) => this.bondingInstructorsSharedCollection.set(bondingInstructors));

    this.instructorWorkingDayService
      .query()
      .pipe(map((res: HttpResponse<IInstructorWorkingDay[]>) => res.body ?? []))
      .pipe(
        map((instructorWorkingDays: IInstructorWorkingDay[]) =>
          this.instructorWorkingDayService.addInstructorWorkingDayToCollectionIfMissing<IInstructorWorkingDay>(
            instructorWorkingDays,
            this.boundingSchedule?.instructorWorkingDay,
          ),
        ),
      )
      .subscribe((instructorWorkingDays: IInstructorWorkingDay[]) => this.instructorWorkingDaysSharedCollection.set(instructorWorkingDays));
  }
}
