import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IObservationResponse, NewObservationResponse } from '../observation-response.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IObservationResponse for edit and NewObservationResponseFormGroupInput for create.
 */
type ObservationResponseFormGroupInput = IObservationResponse | PartialWithRequiredKeyOf<NewObservationResponse>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IObservationResponse | NewObservationResponse> = Omit<T, 'dateObservation'> & {
  dateObservation?: string | null;
};

type ObservationResponseFormRawValue = FormValueOf<IObservationResponse>;

type NewObservationResponseFormRawValue = FormValueOf<NewObservationResponse>;

type ObservationResponseFormDefaults = Pick<NewObservationResponse, 'id' | 'dateObservation'>;

type ObservationResponseFormGroupContent = {
  id: FormControl<ObservationResponseFormRawValue['id'] | NewObservationResponse['id']>;
  numberObservation: FormControl<ObservationResponseFormRawValue['numberObservation']>;
  obsevation: FormControl<ObservationResponseFormRawValue['obsevation']>;
  juries: FormControl<ObservationResponseFormRawValue['juries']>;
  dateObservation: FormControl<ObservationResponseFormRawValue['dateObservation']>;
  groupResponse: FormControl<ObservationResponseFormRawValue['groupResponse']>;
  customer: FormControl<ObservationResponseFormRawValue['customer']>;
};

export type ObservationResponseFormGroup = FormGroup<ObservationResponseFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ObservationResponseFormService {
  createObservationResponseFormGroup(observationResponse?: ObservationResponseFormGroupInput): ObservationResponseFormGroup {
    const observationResponseRawValue = this.convertObservationResponseToObservationResponseRawValue({
      ...this.getFormDefaults(),
      ...(observationResponse ?? { id: null }),
    });
    return new FormGroup<ObservationResponseFormGroupContent>({
      id: new FormControl(
        { value: observationResponseRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      numberObservation: new FormControl(observationResponseRawValue.numberObservation, {
        validators: [Validators.required],
      }),
      obsevation: new FormControl(observationResponseRawValue.obsevation, {
        validators: [Validators.required, Validators.maxLength(400)],
      }),
      juries: new FormControl(observationResponseRawValue.juries, {
        validators: [Validators.required, Validators.maxLength(400)],
      }),
      dateObservation: new FormControl(observationResponseRawValue.dateObservation, {
        validators: [Validators.required],
      }),
      groupResponse: new FormControl(observationResponseRawValue.groupResponse, {
        validators: [Validators.required],
      }),
      customer: new FormControl(observationResponseRawValue.customer, {
        validators: [Validators.required],
      }),
    });
  }

  getObservationResponse(form: ObservationResponseFormGroup): IObservationResponse | NewObservationResponse {
    return this.convertObservationResponseRawValueToObservationResponse(
      form.getRawValue() as ObservationResponseFormRawValue | NewObservationResponseFormRawValue,
    );
  }

  resetForm(form: ObservationResponseFormGroup, observationResponse: ObservationResponseFormGroupInput): void {
    const observationResponseRawValue = this.convertObservationResponseToObservationResponseRawValue({
      ...this.getFormDefaults(),
      ...observationResponse,
    });
    form.reset({
      ...observationResponseRawValue,
      id: { value: observationResponseRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): ObservationResponseFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dateObservation: currentTime,
    };
  }

  private convertObservationResponseRawValueToObservationResponse(
    rawObservationResponse: ObservationResponseFormRawValue | NewObservationResponseFormRawValue,
  ): IObservationResponse | NewObservationResponse {
    return {
      ...rawObservationResponse,
      dateObservation: dayjs(rawObservationResponse.dateObservation, DATE_TIME_FORMAT),
    };
  }

  private convertObservationResponseToObservationResponseRawValue(
    observationResponse: IObservationResponse | (Partial<NewObservationResponse> & ObservationResponseFormDefaults),
  ): ObservationResponseFormRawValue | PartialWithRequiredKeyOf<NewObservationResponseFormRawValue> {
    return {
      ...observationResponse,
      dateObservation: observationResponse.dateObservation ? observationResponse.dateObservation.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
