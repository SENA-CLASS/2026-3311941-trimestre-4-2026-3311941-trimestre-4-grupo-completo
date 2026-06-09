import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IAssessment, NewAssessment } from '../assessment.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAssessment for edit and NewAssessmentFormGroupInput for create.
 */
type AssessmentFormGroupInput = IAssessment | PartialWithRequiredKeyOf<NewAssessment>;

type AssessmentFormDefaults = Pick<NewAssessment, 'id'>;

type AssessmentFormGroupContent = {
  id: FormControl<IAssessment['id'] | NewAssessment['id']>;
  assessmentType: FormControl<IAssessment['assessmentType']>;
  assessmentState: FormControl<IAssessment['assessmentState']>;
};

export type AssessmentFormGroup = FormGroup<AssessmentFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AssessmentFormService {
  createAssessmentFormGroup(assessment?: AssessmentFormGroupInput): AssessmentFormGroup {
    const assessmentRawValue = {
      ...this.getFormDefaults(),
      ...(assessment ?? { id: null }),
    };
    return new FormGroup<AssessmentFormGroupContent>({
      id: new FormControl(
        { value: assessmentRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      assessmentType: new FormControl(assessmentRawValue.assessmentType, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      assessmentState: new FormControl(assessmentRawValue.assessmentState, {
        validators: [Validators.required],
      }),
    });
  }

  getAssessment(form: AssessmentFormGroup): IAssessment | NewAssessment {
    return form.getRawValue();
  }

  resetForm(form: AssessmentFormGroup, assessment: AssessmentFormGroupInput): void {
    const assessmentRawValue = { ...this.getFormDefaults(), ...assessment };
    form.reset({
      ...assessmentRawValue,
      id: { value: assessmentRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): AssessmentFormDefaults {
    return {
      id: null,
    };
  }
}
