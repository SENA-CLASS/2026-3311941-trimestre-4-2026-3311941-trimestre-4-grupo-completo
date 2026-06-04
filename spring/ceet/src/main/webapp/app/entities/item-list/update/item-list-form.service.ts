import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IItemList, NewItemList } from '../item-list.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IItemList for edit and NewItemListFormGroupInput for create.
 */
type ItemListFormGroupInput = IItemList | PartialWithRequiredKeyOf<NewItemList>;

type ItemListFormDefaults = Pick<NewItemList, 'id'>;

type ItemListFormGroupContent = {
  id: FormControl<IItemList['id'] | NewItemList['id']>;
  itemNumber: FormControl<IItemList['itemNumber']>;
  question: FormControl<IItemList['question']>;
  checkList: FormControl<IItemList['checkList']>;
  learningResult: FormControl<IItemList['learningResult']>;
};

export type ItemListFormGroup = FormGroup<ItemListFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ItemListFormService {
  createItemListFormGroup(itemList?: ItemListFormGroupInput): ItemListFormGroup {
    const itemListRawValue = {
      ...this.getFormDefaults(),
      ...(itemList ?? { id: null }),
    };
    return new FormGroup<ItemListFormGroupContent>({
      id: new FormControl(
        { value: itemListRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      itemNumber: new FormControl(itemListRawValue.itemNumber, {
        validators: [Validators.required],
      }),
      question: new FormControl(itemListRawValue.question, {
        validators: [Validators.required, Validators.maxLength(1000)],
      }),
      checkList: new FormControl(itemListRawValue.checkList, {
        validators: [Validators.required],
      }),
      learningResult: new FormControl(itemListRawValue.learningResult, {
        validators: [Validators.required],
      }),
    });
  }

  getItemList(form: ItemListFormGroup): IItemList | NewItemList {
    return form.getRawValue() as IItemList | NewItemList;
  }

  resetForm(form: ItemListFormGroup, itemList: ItemListFormGroupInput): void {
    const itemListRawValue = { ...this.getFormDefaults(), ...itemList };
    form.reset({
      ...itemListRawValue,
      id: { value: itemListRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): ItemListFormDefaults {
    return {
      id: null,
    };
  }
}
