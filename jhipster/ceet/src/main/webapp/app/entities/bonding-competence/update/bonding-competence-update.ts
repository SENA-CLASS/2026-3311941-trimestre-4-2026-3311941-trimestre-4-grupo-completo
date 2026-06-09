import { HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, finalize, map } from 'rxjs';

import { IBondingInstructor } from 'app/entities/bonding-instructor/bonding-instructor.model';
import { BondingInstructorService } from 'app/entities/bonding-instructor/service/bonding-instructor.service';
import { ILearningCompetence } from 'app/entities/learning-competence/learning-competence.model';
import { LearningCompetenceService } from 'app/entities/learning-competence/service/learning-competence.service';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IBondingCompetence } from '../bonding-competence.model';
import { BondingCompetenceService } from '../service/bonding-competence.service';

import { BondingCompetenceFormGroup, BondingCompetenceFormService } from './bonding-competence-form.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ceet-bonding-competence-update',
  templateUrl: './bonding-competence-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class BondingCompetenceUpdate implements OnInit {
  readonly isSaving = signal(false);
  bondingCompetence: IBondingCompetence | null = null;

  bondingInstructorsSharedCollection = signal<IBondingInstructor[]>([]);
  learningCompetencesSharedCollection = signal<ILearningCompetence[]>([]);

  protected bondingCompetenceService = inject(BondingCompetenceService);
  protected bondingCompetenceFormService = inject(BondingCompetenceFormService);
  protected bondingInstructorService = inject(BondingInstructorService);
  protected learningCompetenceService = inject(LearningCompetenceService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: BondingCompetenceFormGroup = this.bondingCompetenceFormService.createBondingCompetenceFormGroup();

  compareBondingInstructor = (o1: IBondingInstructor | null, o2: IBondingInstructor | null): boolean =>
    this.bondingInstructorService.compareBondingInstructor(o1, o2);

  compareLearningCompetence = (o1: ILearningCompetence | null, o2: ILearningCompetence | null): boolean =>
    this.learningCompetenceService.compareLearningCompetence(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bondingCompetence }) => {
      this.bondingCompetence = bondingCompetence;
      if (bondingCompetence) {
        this.updateForm(bondingCompetence);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const bondingCompetence = this.bondingCompetenceFormService.getBondingCompetence(this.editForm);
    if (bondingCompetence.id === null) {
      this.subscribeToSaveResponse(this.bondingCompetenceService.create(bondingCompetence));
    } else {
      this.subscribeToSaveResponse(this.bondingCompetenceService.update(bondingCompetence));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IBondingCompetence | null>): void {
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

  protected updateForm(bondingCompetence: IBondingCompetence): void {
    this.bondingCompetence = bondingCompetence;
    this.bondingCompetenceFormService.resetForm(this.editForm, bondingCompetence);

    this.bondingInstructorsSharedCollection.update(bondingInstructors =>
      this.bondingInstructorService.addBondingInstructorToCollectionIfMissing<IBondingInstructor>(
        bondingInstructors,
        bondingCompetence.bondingInstructor,
      ),
    );
    this.learningCompetencesSharedCollection.update(learningCompetences =>
      this.learningCompetenceService.addLearningCompetenceToCollectionIfMissing<ILearningCompetence>(
        learningCompetences,
        bondingCompetence.learningCompetence,
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
            this.bondingCompetence?.bondingInstructor,
          ),
        ),
      )
      .subscribe((bondingInstructors: IBondingInstructor[]) => this.bondingInstructorsSharedCollection.set(bondingInstructors));

    this.learningCompetenceService
      .query()
      .pipe(map((res: HttpResponse<ILearningCompetence[]>) => res.body ?? []))
      .pipe(
        map((learningCompetences: ILearningCompetence[]) =>
          this.learningCompetenceService.addLearningCompetenceToCollectionIfMissing<ILearningCompetence>(
            learningCompetences,
            this.bondingCompetence?.learningCompetence,
          ),
        ),
      )
      .subscribe((learningCompetences: ILearningCompetence[]) => this.learningCompetencesSharedCollection.set(learningCompetences));
  }
}
