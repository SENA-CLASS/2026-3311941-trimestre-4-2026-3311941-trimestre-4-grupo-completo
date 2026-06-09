import { HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, finalize, map } from 'rxjs';

import { ILearningResult } from 'app/entities/learning-result/learning-result.model';
import { LearningResultService } from 'app/entities/learning-result/service/learning-result.service';
import { IPlanning } from 'app/entities/planning/planning.model';
import { PlanningService } from 'app/entities/planning/service/planning.service';
import { TrimesterService } from 'app/entities/trimester/service/trimester.service';
import { ITrimester } from 'app/entities/trimester/trimester.model';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IQuarterSchedule } from '../quarter-schedule.model';
import { QuarterScheduleService } from '../service/quarter-schedule.service';

import { QuarterScheduleFormGroup, QuarterScheduleFormService } from './quarter-schedule-form.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ceet-quarter-schedule-update',
  templateUrl: './quarter-schedule-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class QuarterScheduleUpdate implements OnInit {
  readonly isSaving = signal(false);
  quarterSchedule: IQuarterSchedule | null = null;

  learningResultsSharedCollection = signal<ILearningResult[]>([]);
  planningsSharedCollection = signal<IPlanning[]>([]);
  trimestersSharedCollection = signal<ITrimester[]>([]);

  protected quarterScheduleService = inject(QuarterScheduleService);
  protected quarterScheduleFormService = inject(QuarterScheduleFormService);
  protected learningResultService = inject(LearningResultService);
  protected planningService = inject(PlanningService);
  protected trimesterService = inject(TrimesterService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: QuarterScheduleFormGroup = this.quarterScheduleFormService.createQuarterScheduleFormGroup();

  compareLearningResult = (o1: ILearningResult | null, o2: ILearningResult | null): boolean =>
    this.learningResultService.compareLearningResult(o1, o2);

  comparePlanning = (o1: IPlanning | null, o2: IPlanning | null): boolean => this.planningService.comparePlanning(o1, o2);

  compareTrimester = (o1: ITrimester | null, o2: ITrimester | null): boolean => this.trimesterService.compareTrimester(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ quarterSchedule }) => {
      this.quarterSchedule = quarterSchedule;
      if (quarterSchedule) {
        this.updateForm(quarterSchedule);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const quarterSchedule = this.quarterScheduleFormService.getQuarterSchedule(this.editForm);
    if (quarterSchedule.id === null) {
      this.subscribeToSaveResponse(this.quarterScheduleService.create(quarterSchedule));
    } else {
      this.subscribeToSaveResponse(this.quarterScheduleService.update(quarterSchedule));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IQuarterSchedule | null>): void {
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

  protected updateForm(quarterSchedule: IQuarterSchedule): void {
    this.quarterSchedule = quarterSchedule;
    this.quarterScheduleFormService.resetForm(this.editForm, quarterSchedule);

    this.learningResultsSharedCollection.update(learningResults =>
      this.learningResultService.addLearningResultToCollectionIfMissing<ILearningResult>(learningResults, quarterSchedule.learningResult),
    );
    this.planningsSharedCollection.update(plannings =>
      this.planningService.addPlanningToCollectionIfMissing<IPlanning>(plannings, quarterSchedule.planning),
    );
    this.trimestersSharedCollection.update(trimesters =>
      this.trimesterService.addTrimesterToCollectionIfMissing<ITrimester>(trimesters, quarterSchedule.trimester),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.learningResultService
      .query()
      .pipe(map((res: HttpResponse<ILearningResult[]>) => res.body ?? []))
      .pipe(
        map((learningResults: ILearningResult[]) =>
          this.learningResultService.addLearningResultToCollectionIfMissing<ILearningResult>(
            learningResults,
            this.quarterSchedule?.learningResult,
          ),
        ),
      )
      .subscribe((learningResults: ILearningResult[]) => this.learningResultsSharedCollection.set(learningResults));

    this.planningService
      .query()
      .pipe(map((res: HttpResponse<IPlanning[]>) => res.body ?? []))
      .pipe(
        map((plannings: IPlanning[]) =>
          this.planningService.addPlanningToCollectionIfMissing<IPlanning>(plannings, this.quarterSchedule?.planning),
        ),
      )
      .subscribe((plannings: IPlanning[]) => this.planningsSharedCollection.set(plannings));

    this.trimesterService
      .query()
      .pipe(map((res: HttpResponse<ITrimester[]>) => res.body ?? []))
      .pipe(
        map((trimesters: ITrimester[]) =>
          this.trimesterService.addTrimesterToCollectionIfMissing<ITrimester>(trimesters, this.quarterSchedule?.trimester),
        ),
      )
      .subscribe((trimesters: ITrimester[]) => this.trimestersSharedCollection.set(trimesters));
  }
}
