import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { TrainingProgramService } from 'app/entities/training-program/service/training-program.service';
import { ITrainingProgram } from 'app/entities/training-program/training-program.model';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { ILearningCompetence } from '../learning-competence.model';
import { LearningCompetenceService } from '../service/learning-competence.service';

import { LearningCompetenceFormGroup, LearningCompetenceFormService } from './learning-competence-form.service';

@Component({
  selector: 'ceet-learning-competence-update',
  templateUrl: './learning-competence-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class LearningCompetenceUpdate implements OnInit {
  readonly isSaving = signal(false);
  learningCompetence: ILearningCompetence | null = null;

  trainingProgramsSharedCollection = signal<ITrainingProgram[]>([]);

  protected learningCompetenceService = inject(LearningCompetenceService);
  protected learningCompetenceFormService = inject(LearningCompetenceFormService);
  protected trainingProgramService = inject(TrainingProgramService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: LearningCompetenceFormGroup = this.learningCompetenceFormService.createLearningCompetenceFormGroup();

  compareTrainingProgram = (o1: ITrainingProgram | null, o2: ITrainingProgram | null): boolean =>
    this.trainingProgramService.compareTrainingProgram(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ learningCompetence }) => {
      this.learningCompetence = learningCompetence;
      if (learningCompetence) {
        this.updateForm(learningCompetence);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const learningCompetence = this.learningCompetenceFormService.getLearningCompetence(this.editForm);
    if (learningCompetence.id === null) {
      this.subscribeToSaveResponse(this.learningCompetenceService.create(learningCompetence));
    } else {
      this.subscribeToSaveResponse(this.learningCompetenceService.update(learningCompetence));
    }
  }

  protected subscribeToSaveResponse(result: Observable<ILearningCompetence | null>): void {
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

  protected updateForm(learningCompetence: ILearningCompetence): void {
    this.learningCompetence = learningCompetence;
    this.learningCompetenceFormService.resetForm(this.editForm, learningCompetence);

    this.trainingProgramsSharedCollection.update(trainingPrograms =>
      this.trainingProgramService.addTrainingProgramToCollectionIfMissing<ITrainingProgram>(
        trainingPrograms,
        learningCompetence.trainingProgram,
      ),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.trainingProgramService
      .query()
      .pipe(map((res: HttpResponse<ITrainingProgram[]>) => res.body ?? []))
      .pipe(
        map((trainingPrograms: ITrainingProgram[]) =>
          this.trainingProgramService.addTrainingProgramToCollectionIfMissing<ITrainingProgram>(
            trainingPrograms,
            this.learningCompetence?.trainingProgram,
          ),
        ),
      )
      .subscribe((trainingPrograms: ITrainingProgram[]) => this.trainingProgramsSharedCollection.set(trainingPrograms));
  }
}
