import { HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, finalize, map } from 'rxjs';

import { ILearningCompetence } from 'app/entities/learning-competence/learning-competence.model';
import { LearningCompetenceService } from 'app/entities/learning-competence/service/learning-competence.service';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { ILearningResult } from '../learning-result.model';
import { LearningResultService } from '../service/learning-result.service';

import { LearningResultFormGroup, LearningResultFormService } from './learning-result-form.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ceet-learning-result-update',
  templateUrl: './learning-result-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class LearningResultUpdate implements OnInit {
  readonly isSaving = signal(false);
  learningResult: ILearningResult | null = null;

  learningCompetencesSharedCollection = signal<ILearningCompetence[]>([]);

  protected learningResultService = inject(LearningResultService);
  protected learningResultFormService = inject(LearningResultFormService);
  protected learningCompetenceService = inject(LearningCompetenceService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: LearningResultFormGroup = this.learningResultFormService.createLearningResultFormGroup();

  compareLearningCompetence = (o1: ILearningCompetence | null, o2: ILearningCompetence | null): boolean =>
    this.learningCompetenceService.compareLearningCompetence(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ learningResult }) => {
      this.learningResult = learningResult;
      if (learningResult) {
        this.updateForm(learningResult);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const learningResult = this.learningResultFormService.getLearningResult(this.editForm);
    if (learningResult.id === null) {
      this.subscribeToSaveResponse(this.learningResultService.create(learningResult));
    } else {
      this.subscribeToSaveResponse(this.learningResultService.update(learningResult));
    }
  }

  protected subscribeToSaveResponse(result: Observable<ILearningResult | null>): void {
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

  protected updateForm(learningResult: ILearningResult): void {
    this.learningResult = learningResult;
    this.learningResultFormService.resetForm(this.editForm, learningResult);

    this.learningCompetencesSharedCollection.update(learningCompetences =>
      this.learningCompetenceService.addLearningCompetenceToCollectionIfMissing<ILearningCompetence>(
        learningCompetences,
        learningResult.learningCompetence,
      ),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.learningCompetenceService
      .query()
      .pipe(map((res: HttpResponse<ILearningCompetence[]>) => res.body ?? []))
      .pipe(
        map((learningCompetences: ILearningCompetence[]) =>
          this.learningCompetenceService.addLearningCompetenceToCollectionIfMissing<ILearningCompetence>(
            learningCompetences,
            this.learningResult?.learningCompetence,
          ),
        ),
      )
      .subscribe((learningCompetences: ILearningCompetence[]) => this.learningCompetencesSharedCollection.set(learningCompetences));
  }
}
