import { HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, finalize, map } from 'rxjs';

import { StateProgram } from 'app/entities/enumerations/state-program.model';
import { ILevelEducation } from 'app/entities/level-education/level-education.model';
import { LevelEducationService } from 'app/entities/level-education/service/level-education.service';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { TrainingProgramService } from '../service/training-program.service';
import { ITrainingProgram } from '../training-program.model';

import { TrainingProgramFormGroup, TrainingProgramFormService } from './training-program-form.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ceet-training-program-update',
  templateUrl: './training-program-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class TrainingProgramUpdate implements OnInit {
  readonly isSaving = signal(false);
  trainingProgram: ITrainingProgram | null = null;
  stateProgramValues = Object.keys(StateProgram);

  levelEducationsSharedCollection = signal<ILevelEducation[]>([]);

  protected trainingProgramService = inject(TrainingProgramService);
  protected trainingProgramFormService = inject(TrainingProgramFormService);
  protected levelEducationService = inject(LevelEducationService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TrainingProgramFormGroup = this.trainingProgramFormService.createTrainingProgramFormGroup();

  compareLevelEducation = (o1: ILevelEducation | null, o2: ILevelEducation | null): boolean =>
    this.levelEducationService.compareLevelEducation(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ trainingProgram }) => {
      this.trainingProgram = trainingProgram;
      if (trainingProgram) {
        this.updateForm(trainingProgram);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const trainingProgram = this.trainingProgramFormService.getTrainingProgram(this.editForm);
    if (trainingProgram.id === null) {
      this.subscribeToSaveResponse(this.trainingProgramService.create(trainingProgram));
    } else {
      this.subscribeToSaveResponse(this.trainingProgramService.update(trainingProgram));
    }
  }

  protected subscribeToSaveResponse(result: Observable<ITrainingProgram | null>): void {
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

  protected updateForm(trainingProgram: ITrainingProgram): void {
    this.trainingProgram = trainingProgram;
    this.trainingProgramFormService.resetForm(this.editForm, trainingProgram);

    this.levelEducationsSharedCollection.update(levelEducations =>
      this.levelEducationService.addLevelEducationToCollectionIfMissing<ILevelEducation>(levelEducations, trainingProgram.levelEducation),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.levelEducationService
      .query()
      .pipe(map((res: HttpResponse<ILevelEducation[]>) => res.body ?? []))
      .pipe(
        map((levelEducations: ILevelEducation[]) =>
          this.levelEducationService.addLevelEducationToCollectionIfMissing<ILevelEducation>(
            levelEducations,
            this.trainingProgram?.levelEducation,
          ),
        ),
      )
      .subscribe((levelEducations: ILevelEducation[]) => this.levelEducationsSharedCollection.set(levelEducations));
  }
}
