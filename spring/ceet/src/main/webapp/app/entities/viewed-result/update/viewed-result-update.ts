import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICourseTrimester } from 'app/entities/course-trimester/course-trimester.model';
import { CourseTrimesterService } from 'app/entities/course-trimester/service/course-trimester.service';
import { ILearningResult } from 'app/entities/learning-result/learning-result.model';
import { LearningResultService } from 'app/entities/learning-result/service/learning-result.service';
import { IPlanning } from 'app/entities/planning/planning.model';
import { PlanningService } from 'app/entities/planning/service/planning.service';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';

import { ViewedResultService } from '../service/viewed-result.service';
import { IViewedResult } from '../viewed-result.model';

import { ViewedResultFormGroup, ViewedResultFormService } from './viewed-result-form.service';

@Component({
  selector: 'ceet-viewed-result-update',
  templateUrl: './viewed-result-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class ViewedResultUpdate implements OnInit {
  readonly isSaving = signal(false);
  viewedResult: IViewedResult | null = null;

  courseTrimestersSharedCollection = signal<ICourseTrimester[]>([]);
  planningsSharedCollection = signal<IPlanning[]>([]);
  learningResultsSharedCollection = signal<ILearningResult[]>([]);

  protected viewedResultService = inject(ViewedResultService);
  protected viewedResultFormService = inject(ViewedResultFormService);
  protected courseTrimesterService = inject(CourseTrimesterService);
  protected planningService = inject(PlanningService);
  protected learningResultService = inject(LearningResultService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ViewedResultFormGroup = this.viewedResultFormService.createViewedResultFormGroup();

  compareCourseTrimester = (o1: ICourseTrimester | null, o2: ICourseTrimester | null): boolean =>
    this.courseTrimesterService.compareCourseTrimester(o1, o2);

  comparePlanning = (o1: IPlanning | null, o2: IPlanning | null): boolean => this.planningService.comparePlanning(o1, o2);

  compareLearningResult = (o1: ILearningResult | null, o2: ILearningResult | null): boolean =>
    this.learningResultService.compareLearningResult(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ viewedResult }) => {
      this.viewedResult = viewedResult;
      if (viewedResult) {
        this.updateForm(viewedResult);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const viewedResult = this.viewedResultFormService.getViewedResult(this.editForm);
    if (viewedResult.id === null) {
      this.subscribeToSaveResponse(this.viewedResultService.create(viewedResult));
    } else {
      this.subscribeToSaveResponse(this.viewedResultService.update(viewedResult));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IViewedResult | null>): void {
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

  protected updateForm(viewedResult: IViewedResult): void {
    this.viewedResult = viewedResult;
    this.viewedResultFormService.resetForm(this.editForm, viewedResult);

    this.courseTrimestersSharedCollection.update(courseTrimesters =>
      this.courseTrimesterService.addCourseTrimesterToCollectionIfMissing<ICourseTrimester>(courseTrimesters, viewedResult.courseTrimester),
    );
    this.planningsSharedCollection.update(plannings =>
      this.planningService.addPlanningToCollectionIfMissing<IPlanning>(plannings, viewedResult.planning),
    );
    this.learningResultsSharedCollection.update(learningResults =>
      this.learningResultService.addLearningResultToCollectionIfMissing<ILearningResult>(learningResults, viewedResult.learningResult),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.courseTrimesterService
      .query()
      .pipe(map((res: HttpResponse<ICourseTrimester[]>) => res.body ?? []))
      .pipe(
        map((courseTrimesters: ICourseTrimester[]) =>
          this.courseTrimesterService.addCourseTrimesterToCollectionIfMissing<ICourseTrimester>(
            courseTrimesters,
            this.viewedResult?.courseTrimester,
          ),
        ),
      )
      .subscribe((courseTrimesters: ICourseTrimester[]) => this.courseTrimestersSharedCollection.set(courseTrimesters));

    this.planningService
      .query()
      .pipe(map((res: HttpResponse<IPlanning[]>) => res.body ?? []))
      .pipe(
        map((plannings: IPlanning[]) =>
          this.planningService.addPlanningToCollectionIfMissing<IPlanning>(plannings, this.viewedResult?.planning),
        ),
      )
      .subscribe((plannings: IPlanning[]) => this.planningsSharedCollection.set(plannings));

    this.learningResultService
      .query()
      .pipe(map((res: HttpResponse<ILearningResult[]>) => res.body ?? []))
      .pipe(
        map((learningResults: ILearningResult[]) =>
          this.learningResultService.addLearningResultToCollectionIfMissing<ILearningResult>(
            learningResults,
            this.viewedResult?.learningResult,
          ),
        ),
      )
      .subscribe((learningResults: ILearningResult[]) => this.learningResultsSharedCollection.set(learningResults));
  }
}
