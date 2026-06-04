import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ILogError, NewLogError } from '../log-error.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILogError for edit and NewLogErrorFormGroupInput for create.
 */
type LogErrorFormGroupInput = ILogError | PartialWithRequiredKeyOf<NewLogError>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ILogError | NewLogError> = Omit<T, 'dateError'> & {
  dateError?: string | null;
};

type LogErrorFormRawValue = FormValueOf<ILogError>;

type NewLogErrorFormRawValue = FormValueOf<NewLogError>;

type LogErrorFormDefaults = Pick<NewLogError, 'id' | 'dateError'>;

type LogErrorFormGroupContent = {
  id: FormControl<LogErrorFormRawValue['id'] | NewLogError['id']>;
  levelError: FormControl<LogErrorFormRawValue['levelError']>;
  logName: FormControl<LogErrorFormRawValue['logName']>;
  messageError: FormControl<LogErrorFormRawValue['messageError']>;
  dateError: FormControl<LogErrorFormRawValue['dateError']>;
  customer: FormControl<LogErrorFormRawValue['customer']>;
};

export type LogErrorFormGroup = FormGroup<LogErrorFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LogErrorFormService {
  createLogErrorFormGroup(logError?: LogErrorFormGroupInput): LogErrorFormGroup {
    const logErrorRawValue = this.convertLogErrorToLogErrorRawValue({
      ...this.getFormDefaults(),
      ...(logError ?? { id: null }),
    });
    return new FormGroup<LogErrorFormGroupContent>({
      id: new FormControl(
        { value: logErrorRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      levelError: new FormControl(logErrorRawValue.levelError, {
        validators: [Validators.required, Validators.maxLength(400)],
      }),
      logName: new FormControl(logErrorRawValue.logName, {
        validators: [Validators.required, Validators.maxLength(400)],
      }),
      messageError: new FormControl(logErrorRawValue.messageError, {
        validators: [Validators.required, Validators.maxLength(400)],
      }),
      dateError: new FormControl(logErrorRawValue.dateError, {
        validators: [Validators.required],
      }),
      customer: new FormControl(logErrorRawValue.customer, {
        validators: [Validators.required],
      }),
    });
  }

  getLogError(form: LogErrorFormGroup): ILogError | NewLogError {
    return this.convertLogErrorRawValueToLogError(form.getRawValue() as LogErrorFormRawValue | NewLogErrorFormRawValue);
  }

  resetForm(form: LogErrorFormGroup, logError: LogErrorFormGroupInput): void {
    const logErrorRawValue = this.convertLogErrorToLogErrorRawValue({ ...this.getFormDefaults(), ...logError });
    form.reset({
      ...logErrorRawValue,
      id: { value: logErrorRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): LogErrorFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dateError: currentTime,
    };
  }

  private convertLogErrorRawValueToLogError(rawLogError: LogErrorFormRawValue | NewLogErrorFormRawValue): ILogError | NewLogError {
    return {
      ...rawLogError,
      dateError: dayjs(rawLogError.dateError, DATE_TIME_FORMAT),
    };
  }

  private convertLogErrorToLogErrorRawValue(
    logError: ILogError | (Partial<NewLogError> & LogErrorFormDefaults),
  ): LogErrorFormRawValue | PartialWithRequiredKeyOf<NewLogErrorFormRawValue> {
    return {
      ...logError,
      dateError: logError.dateError ? logError.dateError.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
