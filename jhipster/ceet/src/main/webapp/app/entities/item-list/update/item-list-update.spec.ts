import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { ICheckList } from 'app/entities/check-list/check-list.model';
import { CheckListService } from 'app/entities/check-list/service/check-list.service';
import { ILearningResult } from 'app/entities/learning-result/learning-result.model';
import { LearningResultService } from 'app/entities/learning-result/service/learning-result.service';
import { IItemList } from '../item-list.model';
import { ItemListService } from '../service/item-list.service';

import { ItemListFormService } from './item-list-form.service';
import { ItemListUpdate } from './item-list-update';

describe('ItemList Management Update Component', () => {
  let comp: ItemListUpdate;
  let fixture: ComponentFixture<ItemListUpdate>;
  let activatedRoute: ActivatedRoute;
  let itemListFormService: ItemListFormService;
  let itemListService: ItemListService;
  let checkListService: CheckListService;
  let learningResultService: LearningResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    });

    fixture = TestBed.createComponent(ItemListUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    itemListFormService = TestBed.inject(ItemListFormService);
    itemListService = TestBed.inject(ItemListService);
    checkListService = TestBed.inject(CheckListService);
    learningResultService = TestBed.inject(LearningResultService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call CheckList query and add missing value', () => {
      const itemList: IItemList = { id: 'ecdaac4d-d1f0-45d8-a82a-a8c15fe05153' };
      const checkList: ICheckList = { id: '7741670b-56eb-400b-a3ea-2a7b30040404' };
      itemList.checkList = checkList;

      const checkListCollection: ICheckList[] = [{ id: '7741670b-56eb-400b-a3ea-2a7b30040404' }];
      vitest.spyOn(checkListService, 'query').mockReturnValue(of(new HttpResponse({ body: checkListCollection })));
      const additionalCheckLists = [checkList];
      const expectedCollection: ICheckList[] = [...additionalCheckLists, ...checkListCollection];
      vitest.spyOn(checkListService, 'addCheckListToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ itemList });
      comp.ngOnInit();

      expect(checkListService.query).toHaveBeenCalled();
      expect(checkListService.addCheckListToCollectionIfMissing).toHaveBeenCalledWith(
        checkListCollection,
        ...additionalCheckLists.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.checkListsSharedCollection()).toEqual(expectedCollection);
    });

    it('should call LearningResult query and add missing value', () => {
      const itemList: IItemList = { id: 'ecdaac4d-d1f0-45d8-a82a-a8c15fe05153' };
      const learningResult: ILearningResult = { id: '3df09e7d-3257-43f7-9cef-54f68c48c0ac' };
      itemList.learningResult = learningResult;

      const learningResultCollection: ILearningResult[] = [{ id: '3df09e7d-3257-43f7-9cef-54f68c48c0ac' }];
      vitest.spyOn(learningResultService, 'query').mockReturnValue(of(new HttpResponse({ body: learningResultCollection })));
      const additionalLearningResults = [learningResult];
      const expectedCollection: ILearningResult[] = [...additionalLearningResults, ...learningResultCollection];
      vitest.spyOn(learningResultService, 'addLearningResultToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ itemList });
      comp.ngOnInit();

      expect(learningResultService.query).toHaveBeenCalled();
      expect(learningResultService.addLearningResultToCollectionIfMissing).toHaveBeenCalledWith(
        learningResultCollection,
        ...additionalLearningResults.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.learningResultsSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const itemList: IItemList = { id: 'ecdaac4d-d1f0-45d8-a82a-a8c15fe05153' };
      const checkList: ICheckList = { id: '7741670b-56eb-400b-a3ea-2a7b30040404' };
      itemList.checkList = checkList;
      const learningResult: ILearningResult = { id: '3df09e7d-3257-43f7-9cef-54f68c48c0ac' };
      itemList.learningResult = learningResult;

      activatedRoute.data = of({ itemList });
      comp.ngOnInit();

      expect(comp.checkListsSharedCollection()).toContainEqual(checkList);
      expect(comp.learningResultsSharedCollection()).toContainEqual(learningResult);
      expect(comp.itemList).toEqual(itemList);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IItemList>();
      const itemList = { id: 'f5c01f94-408b-48fb-9301-893ca4de0dc0' };
      vitest.spyOn(itemListFormService, 'getItemList').mockReturnValue(itemList);
      vitest.spyOn(itemListService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ itemList });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(itemList);
      saveSubject.complete();

      // THEN
      expect(itemListFormService.getItemList).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(itemListService.update).toHaveBeenCalledWith(expect.objectContaining(itemList));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IItemList>();
      const itemList = { id: 'f5c01f94-408b-48fb-9301-893ca4de0dc0' };
      vitest.spyOn(itemListFormService, 'getItemList').mockReturnValue({ id: null });
      vitest.spyOn(itemListService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ itemList: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(itemList);
      saveSubject.complete();

      // THEN
      expect(itemListFormService.getItemList).toHaveBeenCalled();
      expect(itemListService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IItemList>();
      const itemList = { id: 'f5c01f94-408b-48fb-9301-893ca4de0dc0' };
      vitest.spyOn(itemListService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ itemList });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(itemListService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCheckList', () => {
      it('should forward to checkListService', () => {
        const entity = { id: '7741670b-56eb-400b-a3ea-2a7b30040404' };
        const entity2 = { id: 'ee29852f-bfd9-4495-b2b5-7c31e2e7b499' };
        vitest.spyOn(checkListService, 'compareCheckList');
        comp.compareCheckList(entity, entity2);
        expect(checkListService.compareCheckList).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareLearningResult', () => {
      it('should forward to learningResultService', () => {
        const entity = { id: '3df09e7d-3257-43f7-9cef-54f68c48c0ac' };
        const entity2 = { id: '18957aee-fabd-42ae-ac8b-2f943a81490c' };
        vitest.spyOn(learningResultService, 'compareLearningResult');
        comp.compareLearningResult(entity, entity2);
        expect(learningResultService.compareLearningResult).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
