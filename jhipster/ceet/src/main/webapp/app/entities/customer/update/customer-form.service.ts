import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ICustomer, NewCustomer } from '../customer.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICustomer for edit and NewCustomerFormGroupInput for create.
 */
type CustomerFormGroupInput = ICustomer | PartialWithRequiredKeyOf<NewCustomer>;

type CustomerFormDefaults = Pick<NewCustomer, 'id'>;

type CustomerFormGroupContent = {
  id: FormControl<ICustomer['id'] | NewCustomer['id']>;
  documentNumber: FormControl<ICustomer['documentNumber']>;
  firstName: FormControl<ICustomer['firstName']>;
  secondName: FormControl<ICustomer['secondName']>;
  fisrtLastName: FormControl<ICustomer['fisrtLastName']>;
  secondLastName: FormControl<ICustomer['secondLastName']>;
  user: FormControl<ICustomer['user']>;
  documentType: FormControl<ICustomer['documentType']>;
};

export type CustomerFormGroup = FormGroup<CustomerFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CustomerFormService {
  createCustomerFormGroup(customer?: CustomerFormGroupInput): CustomerFormGroup {
    const customerRawValue = {
      ...this.getFormDefaults(),
      ...(customer ?? { id: null }),
    };
    return new FormGroup<CustomerFormGroupContent>({
      id: new FormControl(
        { value: customerRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      documentNumber: new FormControl(customerRawValue.documentNumber, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      firstName: new FormControl(customerRawValue.firstName, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      secondName: new FormControl(customerRawValue.secondName, {
        validators: [Validators.maxLength(50)],
      }),
      fisrtLastName: new FormControl(customerRawValue.fisrtLastName, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      secondLastName: new FormControl(customerRawValue.secondLastName, {
        validators: [Validators.maxLength(50)],
      }),
      user: new FormControl(customerRawValue.user, {
        validators: [Validators.required],
      }),
      documentType: new FormControl(customerRawValue.documentType, {
        validators: [Validators.required],
      }),
    });
  }

  getCustomer(form: CustomerFormGroup): ICustomer | NewCustomer {
    return form.getRawValue();
  }

  resetForm(form: CustomerFormGroup, customer: CustomerFormGroupInput): void {
    const customerRawValue = { ...this.getFormDefaults(), ...customer };
    form.reset({
      ...customerRawValue,
      id: { value: customerRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): CustomerFormDefaults {
    return {
      id: null,
    };
  }
}
