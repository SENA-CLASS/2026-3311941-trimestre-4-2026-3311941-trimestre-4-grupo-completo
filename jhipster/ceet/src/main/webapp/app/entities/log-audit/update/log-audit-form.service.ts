import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ILogAudit, NewLogAudit } from '../log-audit.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILogAudit for edit and NewLogAuditFormGroupInput for create.
 */
type LogAuditFormGroupInput = ILogAudit | PartialWithRequiredKeyOf<NewLogAudit>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ILogAudit | NewLogAudit> = Omit<T, 'dateAudit'> & {
  dateAudit?: string | null;
};

type LogAuditFormRawValue = FormValueOf<ILogAudit>;

type NewLogAuditFormRawValue = FormValueOf<NewLogAudit>;

type LogAuditFormDefaults = Pick<NewLogAudit, 'id' | 'dateAudit'>;

type LogAuditFormGroupContent = {
  id: FormControl<LogAuditFormRawValue['id'] | NewLogAudit['id']>;
  levelAudit: FormControl<LogAuditFormRawValue['levelAudit']>;
  logName: FormControl<LogAuditFormRawValue['logName']>;
  messageAudit: FormControl<LogAuditFormRawValue['messageAudit']>;
  dateAudit: FormControl<LogAuditFormRawValue['dateAudit']>;
  customer: FormControl<LogAuditFormRawValue['customer']>;
};

export type LogAuditFormGroup = FormGroup<LogAuditFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LogAuditFormService {
  createLogAuditFormGroup(logAudit?: LogAuditFormGroupInput): LogAuditFormGroup {
    const logAuditRawValue = this.convertLogAuditToLogAuditRawValue({
      ...this.getFormDefaults(),
      ...(logAudit ?? { id: null }),
    });
    return new FormGroup<LogAuditFormGroupContent>({
      id: new FormControl(
        { value: logAuditRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      levelAudit: new FormControl(logAuditRawValue.levelAudit, {
        validators: [Validators.required, Validators.maxLength(400)],
      }),
      logName: new FormControl(logAuditRawValue.logName, {
        validators: [Validators.required, Validators.maxLength(400)],
      }),
      messageAudit: new FormControl(logAuditRawValue.messageAudit, {
        validators: [Validators.required, Validators.maxLength(400)],
      }),
      dateAudit: new FormControl(logAuditRawValue.dateAudit, {
        validators: [Validators.required],
      }),
      customer: new FormControl(logAuditRawValue.customer, {
        validators: [Validators.required],
      }),
    });
  }

  getLogAudit(form: LogAuditFormGroup): ILogAudit | NewLogAudit {
    return this.convertLogAuditRawValueToLogAudit(form.getRawValue());
  }

  resetForm(form: LogAuditFormGroup, logAudit: LogAuditFormGroupInput): void {
    const logAuditRawValue = this.convertLogAuditToLogAuditRawValue({ ...this.getFormDefaults(), ...logAudit });
    form.reset({
      ...logAuditRawValue,
      id: { value: logAuditRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): LogAuditFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dateAudit: currentTime,
    };
  }

  private convertLogAuditRawValueToLogAudit(rawLogAudit: LogAuditFormRawValue | NewLogAuditFormRawValue): ILogAudit | NewLogAudit {
    return {
      ...rawLogAudit,
      dateAudit: dayjs(rawLogAudit.dateAudit, DATE_TIME_FORMAT),
    };
  }

  private convertLogAuditToLogAuditRawValue(
    logAudit: ILogAudit | (Partial<NewLogAudit> & LogAuditFormDefaults),
  ): LogAuditFormRawValue | PartialWithRequiredKeyOf<NewLogAuditFormRawValue> {
    return {
      ...logAudit,
      dateAudit: logAudit.dateAudit ? logAudit.dateAudit.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
