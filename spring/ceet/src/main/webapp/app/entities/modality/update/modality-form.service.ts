import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IModality, NewModality } from '../modality.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IModality for edit and NewModalityFormGroupInput for create.
 */
type ModalityFormGroupInput = IModality | PartialWithRequiredKeyOf<NewModality>;

type ModalityFormDefaults = Pick<NewModality, 'id'>;

type ModalityFormGroupContent = {
  id: FormControl<IModality['id'] | NewModality['id']>;
  modalityName: FormControl<IModality['modalityName']>;
  modalityColor: FormControl<IModality['modalityColor']>;
  modalityState: FormControl<IModality['modalityState']>;
};

export type ModalityFormGroup = FormGroup<ModalityFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ModalityFormService {
  createModalityFormGroup(modality?: ModalityFormGroupInput): ModalityFormGroup {
    const modalityRawValue = {
      ...this.getFormDefaults(),
      ...(modality ?? { id: null }),
    };
    return new FormGroup<ModalityFormGroupContent>({
      id: new FormControl(
        { value: modalityRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      modalityName: new FormControl(modalityRawValue.modalityName, {
        validators: [Validators.required, Validators.maxLength(40)],
      }),
      modalityColor: new FormControl(modalityRawValue.modalityColor, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      modalityState: new FormControl(modalityRawValue.modalityState, {
        validators: [Validators.required],
      }),
    });
  }

  getModality(form: ModalityFormGroup): IModality | NewModality {
    return form.getRawValue() as IModality | NewModality;
  }

  resetForm(form: ModalityFormGroup, modality: ModalityFormGroupInput): void {
    const modalityRawValue = { ...this.getFormDefaults(), ...modality };
    form.reset({
      ...modalityRawValue,
      id: { value: modalityRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): ModalityFormDefaults {
    return {
      id: null,
    };
  }
}
