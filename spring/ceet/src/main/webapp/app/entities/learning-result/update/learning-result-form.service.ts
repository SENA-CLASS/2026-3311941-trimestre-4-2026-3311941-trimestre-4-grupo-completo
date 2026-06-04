import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ILearningResult, NewLearningResult } from '../learning-result.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILearningResult for edit and NewLearningResultFormGroupInput for create.
 */
type LearningResultFormGroupInput = ILearningResult | PartialWithRequiredKeyOf<NewLearningResult>;

type LearningResultFormDefaults = Pick<NewLearningResult, 'id'>;

type LearningResultFormGroupContent = {
  id: FormControl<ILearningResult['id'] | NewLearningResult['id']>;
  resultCode: FormControl<ILearningResult['resultCode']>;
  denomination: FormControl<ILearningResult['denomination']>;
  learningCompetence: FormControl<ILearningResult['learningCompetence']>;
};

export type LearningResultFormGroup = FormGroup<LearningResultFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LearningResultFormService {
  createLearningResultFormGroup(learningResult?: LearningResultFormGroupInput): LearningResultFormGroup {
    const learningResultRawValue = {
      ...this.getFormDefaults(),
      ...(learningResult ?? { id: null }),
    };
    return new FormGroup<LearningResultFormGroupContent>({
      id: new FormControl(
        { value: learningResultRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      resultCode: new FormControl(learningResultRawValue.resultCode, {
        validators: [Validators.required, Validators.maxLength(40)],
      }),
      denomination: new FormControl(learningResultRawValue.denomination, {
        validators: [Validators.required, Validators.maxLength(1000)],
      }),
      learningCompetence: new FormControl(learningResultRawValue.learningCompetence, {
        validators: [Validators.required],
      }),
    });
  }

  getLearningResult(form: LearningResultFormGroup): ILearningResult | NewLearningResult {
    return form.getRawValue() as ILearningResult | NewLearningResult;
  }

  resetForm(form: LearningResultFormGroup, learningResult: LearningResultFormGroupInput): void {
    const learningResultRawValue = { ...this.getFormDefaults(), ...learningResult };
    form.reset({
      ...learningResultRawValue,
      id: { value: learningResultRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): LearningResultFormDefaults {
    return {
      id: null,
    };
  }
}
