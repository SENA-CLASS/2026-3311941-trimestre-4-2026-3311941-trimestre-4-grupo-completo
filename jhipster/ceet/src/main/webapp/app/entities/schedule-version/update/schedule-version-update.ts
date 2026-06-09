import { HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, finalize, map } from 'rxjs';

import { ICurrentQuarter } from 'app/entities/current-quarter/current-quarter.model';
import { CurrentQuarterService } from 'app/entities/current-quarter/service/current-quarter.service';
import { State } from 'app/entities/enumerations/state.model';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IScheduleVersion } from '../schedule-version.model';
import { ScheduleVersionService } from '../service/schedule-version.service';

import { ScheduleVersionFormGroup, ScheduleVersionFormService } from './schedule-version-form.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ceet-schedule-version-update',
  templateUrl: './schedule-version-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class ScheduleVersionUpdate implements OnInit {
  readonly isSaving = signal(false);
  scheduleVersion: IScheduleVersion | null = null;
  stateValues = Object.keys(State);

  currentQuartersSharedCollection = signal<ICurrentQuarter[]>([]);

  protected scheduleVersionService = inject(ScheduleVersionService);
  protected scheduleVersionFormService = inject(ScheduleVersionFormService);
  protected currentQuarterService = inject(CurrentQuarterService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ScheduleVersionFormGroup = this.scheduleVersionFormService.createScheduleVersionFormGroup();

  compareCurrentQuarter = (o1: ICurrentQuarter | null, o2: ICurrentQuarter | null): boolean =>
    this.currentQuarterService.compareCurrentQuarter(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ scheduleVersion }) => {
      this.scheduleVersion = scheduleVersion;
      if (scheduleVersion) {
        this.updateForm(scheduleVersion);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const scheduleVersion = this.scheduleVersionFormService.getScheduleVersion(this.editForm);
    if (scheduleVersion.id === null) {
      this.subscribeToSaveResponse(this.scheduleVersionService.create(scheduleVersion));
    } else {
      this.subscribeToSaveResponse(this.scheduleVersionService.update(scheduleVersion));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IScheduleVersion | null>): void {
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

  protected updateForm(scheduleVersion: IScheduleVersion): void {
    this.scheduleVersion = scheduleVersion;
    this.scheduleVersionFormService.resetForm(this.editForm, scheduleVersion);

    this.currentQuartersSharedCollection.update(currentQuarters =>
      this.currentQuarterService.addCurrentQuarterToCollectionIfMissing<ICurrentQuarter>(currentQuarters, scheduleVersion.currentQuarter),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.currentQuarterService
      .query()
      .pipe(map((res: HttpResponse<ICurrentQuarter[]>) => res.body ?? []))
      .pipe(
        map((currentQuarters: ICurrentQuarter[]) =>
          this.currentQuarterService.addCurrentQuarterToCollectionIfMissing<ICurrentQuarter>(
            currentQuarters,
            this.scheduleVersion?.currentQuarter,
          ),
        ),
      )
      .subscribe((currentQuarters: ICurrentQuarter[]) => this.currentQuartersSharedCollection.set(currentQuarters));
  }
}
