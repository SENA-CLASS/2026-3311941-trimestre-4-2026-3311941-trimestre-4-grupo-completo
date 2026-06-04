import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { TrainingProgramService } from 'app/entities/training-program/service/training-program.service';
import { ITrainingProgram } from 'app/entities/training-program/training-program.model';
import { ICheckList } from '../check-list.model';
import { CheckListService } from '../service/check-list.service';

import { CheckListFormService } from './check-list-form.service';
import { CheckListUpdate } from './check-list-update';

describe('CheckList Management Update Component', () => {
  let comp: CheckListUpdate;
  let fixture: ComponentFixture<CheckListUpdate>;
  let activatedRoute: ActivatedRoute;
  let checkListFormService: CheckListFormService;
  let checkListService: CheckListService;
  let trainingProgramService: TrainingProgramService;

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

    fixture = TestBed.createComponent(CheckListUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    checkListFormService = TestBed.inject(CheckListFormService);
    checkListService = TestBed.inject(CheckListService);
    trainingProgramService = TestBed.inject(TrainingProgramService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call TrainingProgram query and add missing value', () => {
      const checkList: ICheckList = { id: 'ee29852f-bfd9-4495-b2b5-7c31e2e7b499' };
      const trainingProgram: ITrainingProgram = { id: 'e35ca12a-dfa0-4f9c-9ffb-b83e56d621c3' };
      checkList.trainingProgram = trainingProgram;

      const trainingProgramCollection: ITrainingProgram[] = [{ id: 'e35ca12a-dfa0-4f9c-9ffb-b83e56d621c3' }];
      vitest.spyOn(trainingProgramService, 'query').mockReturnValue(of(new HttpResponse({ body: trainingProgramCollection })));
      const additionalTrainingPrograms = [trainingProgram];
      const expectedCollection: ITrainingProgram[] = [...additionalTrainingPrograms, ...trainingProgramCollection];
      vitest.spyOn(trainingProgramService, 'addTrainingProgramToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ checkList });
      comp.ngOnInit();

      expect(trainingProgramService.query).toHaveBeenCalled();
      expect(trainingProgramService.addTrainingProgramToCollectionIfMissing).toHaveBeenCalledWith(
        trainingProgramCollection,
        ...additionalTrainingPrograms.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.trainingProgramsSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const checkList: ICheckList = { id: 'ee29852f-bfd9-4495-b2b5-7c31e2e7b499' };
      const trainingProgram: ITrainingProgram = { id: 'e35ca12a-dfa0-4f9c-9ffb-b83e56d621c3' };
      checkList.trainingProgram = trainingProgram;

      activatedRoute.data = of({ checkList });
      comp.ngOnInit();

      expect(comp.trainingProgramsSharedCollection()).toContainEqual(trainingProgram);
      expect(comp.checkList).toEqual(checkList);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<ICheckList>();
      const checkList = { id: '7741670b-56eb-400b-a3ea-2a7b30040404' };
      vitest.spyOn(checkListFormService, 'getCheckList').mockReturnValue(checkList);
      vitest.spyOn(checkListService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ checkList });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(checkList);
      saveSubject.complete();

      // THEN
      expect(checkListFormService.getCheckList).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(checkListService.update).toHaveBeenCalledWith(expect.objectContaining(checkList));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<ICheckList>();
      const checkList = { id: '7741670b-56eb-400b-a3ea-2a7b30040404' };
      vitest.spyOn(checkListFormService, 'getCheckList').mockReturnValue({ id: null });
      vitest.spyOn(checkListService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ checkList: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(checkList);
      saveSubject.complete();

      // THEN
      expect(checkListFormService.getCheckList).toHaveBeenCalled();
      expect(checkListService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<ICheckList>();
      const checkList = { id: '7741670b-56eb-400b-a3ea-2a7b30040404' };
      vitest.spyOn(checkListService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ checkList });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(checkListService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTrainingProgram', () => {
      it('should forward to trainingProgramService', () => {
        const entity = { id: 'e35ca12a-dfa0-4f9c-9ffb-b83e56d621c3' };
        const entity2 = { id: '7fba35d4-4d72-4e17-b4fd-ec279ba682a9' };
        vitest.spyOn(trainingProgramService, 'compareTrainingProgram');
        comp.compareTrainingProgram(entity, entity2);
        expect(trainingProgramService.compareTrainingProgram).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
