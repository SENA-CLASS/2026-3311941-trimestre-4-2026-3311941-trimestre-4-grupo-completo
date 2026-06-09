import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IGeneralObservation, NewGeneralObservation } from '../general-observation.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IGeneralObservation for edit and NewGeneralObservationFormGroupInput for create.
 */
type GeneralObservationFormGroupInput = IGeneralObservation | PartialWithRequiredKeyOf<NewGeneralObservation>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IGeneralObservation | NewGeneralObservation> = Omit<T, 'dateAudit'> & {
  dateAudit?: string | null;
};

type GeneralObservationFormRawValue = FormValueOf<IGeneralObservation>;

type NewGeneralObservationFormRawValue = FormValueOf<NewGeneralObservation>;

type GeneralObservationFormDefaults = Pick<NewGeneralObservation, 'id' | 'dateAudit'>;

type GeneralObservationFormGroupContent = {
  id: FormControl<GeneralObservationFormRawValue['id'] | NewGeneralObservation['id']>;
  number: FormControl<GeneralObservationFormRawValue['number']>;
  observationGeneral: FormControl<GeneralObservationFormRawValue['observationGeneral']>;
  jury: FormControl<GeneralObservationFormRawValue['jury']>;
  dateAudit: FormControl<GeneralObservationFormRawValue['dateAudit']>;
  projectGroup: FormControl<GeneralObservationFormRawValue['projectGroup']>;
  customer: FormControl<GeneralObservationFormRawValue['customer']>;
};

export type GeneralObservationFormGroup = FormGroup<GeneralObservationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class GeneralObservationFormService {
  createGeneralObservationFormGroup(generalObservation?: GeneralObservationFormGroupInput): GeneralObservationFormGroup {
    const generalObservationRawValue = this.convertGeneralObservationToGeneralObservationRawValue({
      ...this.getFormDefaults(),
      ...(generalObservation ?? { id: null }),
    });
    return new FormGroup<GeneralObservationFormGroupContent>({
      id: new FormControl(
        { value: generalObservationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      number: new FormControl(generalObservationRawValue.number, {
        validators: [Validators.required],
      }),
      observationGeneral: new FormControl(generalObservationRawValue.observationGeneral, {
        validators: [Validators.required, Validators.maxLength(500)],
      }),
      jury: new FormControl(generalObservationRawValue.jury, {
        validators: [Validators.required, Validators.maxLength(500)],
      }),
      dateAudit: new FormControl(generalObservationRawValue.dateAudit, {
        validators: [Validators.required],
      }),
      projectGroup: new FormControl(generalObservationRawValue.projectGroup, {
        validators: [Validators.required],
      }),
      customer: new FormControl(generalObservationRawValue.customer, {
        validators: [Validators.required],
      }),
    });
  }

  getGeneralObservation(form: GeneralObservationFormGroup): IGeneralObservation | NewGeneralObservation {
    return this.convertGeneralObservationRawValueToGeneralObservation(form.getRawValue());
  }

  resetForm(form: GeneralObservationFormGroup, generalObservation: GeneralObservationFormGroupInput): void {
    const generalObservationRawValue = this.convertGeneralObservationToGeneralObservationRawValue({
      ...this.getFormDefaults(),
      ...generalObservation,
    });
    form.reset({
      ...generalObservationRawValue,
      id: { value: generalObservationRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): GeneralObservationFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dateAudit: currentTime,
    };
  }

  private convertGeneralObservationRawValueToGeneralObservation(
    rawGeneralObservation: GeneralObservationFormRawValue | NewGeneralObservationFormRawValue,
  ): IGeneralObservation | NewGeneralObservation {
    return {
      ...rawGeneralObservation,
      dateAudit: dayjs(rawGeneralObservation.dateAudit, DATE_TIME_FORMAT),
    };
  }

  private convertGeneralObservationToGeneralObservationRawValue(
    generalObservation: IGeneralObservation | (Partial<NewGeneralObservation> & GeneralObservationFormDefaults),
  ): GeneralObservationFormRawValue | PartialWithRequiredKeyOf<NewGeneralObservationFormRawValue> {
    return {
      ...generalObservation,
      dateAudit: generalObservation.dateAudit ? generalObservation.dateAudit.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
