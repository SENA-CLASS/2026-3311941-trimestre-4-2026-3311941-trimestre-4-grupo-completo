import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../item-list.test-samples';

import { ItemListFormService } from './item-list-form.service';

describe('ItemList Form Service', () => {
  let service: ItemListFormService;

  beforeEach(() => {
    service = TestBed.inject(ItemListFormService);
  });

  describe('Service methods', () => {
    describe('createItemListFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createItemListFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            itemNumber: expect.any(Object),
            question: expect.any(Object),
            checkList: expect.any(Object),
            learningResult: expect.any(Object),
          }),
        );
      });

      it('passing IItemList should create a new form with FormGroup', () => {
        const formGroup = service.createItemListFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            itemNumber: expect.any(Object),
            question: expect.any(Object),
            checkList: expect.any(Object),
            learningResult: expect.any(Object),
          }),
        );
      });
    });

    describe('getItemList', () => {
      it('should return NewItemList for default ItemList initial value', () => {
        const formGroup = service.createItemListFormGroup(sampleWithNewData);

        const itemList = service.getItemList(formGroup);

        expect(itemList).toMatchObject(sampleWithNewData);
      });

      it('should return NewItemList for empty ItemList initial value', () => {
        const formGroup = service.createItemListFormGroup();

        const itemList = service.getItemList(formGroup);

        expect(itemList).toMatchObject({});
      });

      it('should return IItemList', () => {
        const formGroup = service.createItemListFormGroup(sampleWithRequiredData);

        const itemList = service.getItemList(formGroup);

        expect(itemList).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IItemList should not enable id FormControl', () => {
        const formGroup = service.createItemListFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewItemList should disable id FormControl', () => {
        const formGroup = service.createItemListFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
