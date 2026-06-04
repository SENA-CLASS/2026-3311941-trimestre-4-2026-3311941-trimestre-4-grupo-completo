import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ILearningCompetence, NewLearningCompetence } from '../learning-competence.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILearningCompetence for edit and NewLearningCompetenceFormGroupInput for create.
 */
type LearningCompetenceFormGroupInput = ILearningCompetence | PartialWithRequiredKeyOf<NewLearningCompetence>;

type LearningCompetenceFormDefaults = Pick<NewLearningCompetence, 'id'>;

type LearningCompetenceFormGroupContent = {
  id: FormControl<ILearningCompetence['id'] | NewLearningCompetence['id']>;
  competenceCode: FormControl<ILearningCompetence['competenceCode']>;
  competitionDenomination: FormControl<ILearningCompetence['competitionDenomination']>;
  trainingProgram: FormControl<ILearningCompetence['trainingProgram']>;
};

export type LearningCompetenceFormGroup = FormGroup<LearningCompetenceFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LearningCompetenceFormService {
  createLearningCompetenceFormGroup(learningCompetence?: LearningCompetenceFormGroupInput): LearningCompetenceFormGroup {
    const learningCompetenceRawValue = {
      ...this.getFormDefaults(),
      ...(learningCompetence ?? { id: null }),
    };
    return new FormGroup<LearningCompetenceFormGroupContent>({
      id: new FormControl(
        { value: learningCompetenceRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      competenceCode: new FormControl(learningCompetenceRawValue.competenceCode, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      competitionDenomination: new FormControl(learningCompetenceRawValue.competitionDenomination, {
        validators: [Validators.required, Validators.maxLength(1000)],
      }),
      trainingProgram: new FormControl(learningCompetenceRawValue.trainingProgram, {
        validators: [Validators.required],
      }),
    });
  }

  getLearningCompetence(form: LearningCompetenceFormGroup): ILearningCompetence | NewLearningCompetence {
    return form.getRawValue() as ILearningCompetence | NewLearningCompetence;
  }

  resetForm(form: LearningCompetenceFormGroup, learningCompetence: LearningCompetenceFormGroupInput): void {
    const learningCompetenceRawValue = { ...this.getFormDefaults(), ...learningCompetence };
    form.reset({
      ...learningCompetenceRawValue,
      id: { value: learningCompetenceRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): LearningCompetenceFormDefaults {
    return {
      id: null,
    };
  }
}
