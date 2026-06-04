import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IProjectActivity } from 'app/entities/project-activity/project-activity.model';
import { ProjectActivityService } from 'app/entities/project-activity/service/project-activity.service';
import { IQuarterSchedule } from 'app/entities/quarter-schedule/quarter-schedule.model';
import { QuarterScheduleService } from 'app/entities/quarter-schedule/service/quarter-schedule.service';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IPlanningActivity } from '../planning-activity.model';
import { PlanningActivityService } from '../service/planning-activity.service';

import { PlanningActivityFormGroup, PlanningActivityFormService } from './planning-activity-form.service';

@Component({
  selector: 'ceet-planning-activity-update',
  templateUrl: './planning-activity-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class PlanningActivityUpdate implements OnInit {
  readonly isSaving = signal(false);
  planningActivity: IPlanningActivity | null = null;

  quarterSchedulesSharedCollection = signal<IQuarterSchedule[]>([]);
  projectActivitiesSharedCollection = signal<IProjectActivity[]>([]);

  protected planningActivityService = inject(PlanningActivityService);
  protected planningActivityFormService = inject(PlanningActivityFormService);
  protected quarterScheduleService = inject(QuarterScheduleService);
  protected projectActivityService = inject(ProjectActivityService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: PlanningActivityFormGroup = this.planningActivityFormService.createPlanningActivityFormGroup();

  compareQuarterSchedule = (o1: IQuarterSchedule | null, o2: IQuarterSchedule | null): boolean =>
    this.quarterScheduleService.compareQuarterSchedule(o1, o2);

  compareProjectActivity = (o1: IProjectActivity | null, o2: IProjectActivity | null): boolean =>
    this.projectActivityService.compareProjectActivity(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ planningActivity }) => {
      this.planningActivity = planningActivity;
      if (planningActivity) {
        this.updateForm(planningActivity);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const planningActivity = this.planningActivityFormService.getPlanningActivity(this.editForm);
    if (planningActivity.id === null) {
      this.subscribeToSaveResponse(this.planningActivityService.create(planningActivity));
    } else {
      this.subscribeToSaveResponse(this.planningActivityService.update(planningActivity));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IPlanningActivity | null>): void {
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

  protected updateForm(planningActivity: IPlanningActivity): void {
    this.planningActivity = planningActivity;
    this.planningActivityFormService.resetForm(this.editForm, planningActivity);

    this.quarterSchedulesSharedCollection.update(quarterSchedules =>
      this.quarterScheduleService.addQuarterScheduleToCollectionIfMissing<IQuarterSchedule>(
        quarterSchedules,
        planningActivity.quarterSchedule,
      ),
    );
    this.projectActivitiesSharedCollection.update(projectActivities =>
      this.projectActivityService.addProjectActivityToCollectionIfMissing<IProjectActivity>(
        projectActivities,
        planningActivity.projectActivity,
      ),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.quarterScheduleService
      .query()
      .pipe(map((res: HttpResponse<IQuarterSchedule[]>) => res.body ?? []))
      .pipe(
        map((quarterSchedules: IQuarterSchedule[]) =>
          this.quarterScheduleService.addQuarterScheduleToCollectionIfMissing<IQuarterSchedule>(
            quarterSchedules,
            this.planningActivity?.quarterSchedule,
          ),
        ),
      )
      .subscribe((quarterSchedules: IQuarterSchedule[]) => this.quarterSchedulesSharedCollection.set(quarterSchedules));

    this.projectActivityService
      .query()
      .pipe(map((res: HttpResponse<IProjectActivity[]>) => res.body ?? []))
      .pipe(
        map((projectActivities: IProjectActivity[]) =>
          this.projectActivityService.addProjectActivityToCollectionIfMissing<IProjectActivity>(
            projectActivities,
            this.planningActivity?.projectActivity,
          ),
        ),
      )
      .subscribe((projectActivities: IProjectActivity[]) => this.projectActivitiesSharedCollection.set(projectActivities));
  }
}
