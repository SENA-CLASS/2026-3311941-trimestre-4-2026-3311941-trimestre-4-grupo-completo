import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { ILearningResult } from 'app/entities/learning-result/learning-result.model';
import { LearningResultService } from 'app/entities/learning-result/service/learning-result.service';
import { IPlanning } from 'app/entities/planning/planning.model';
import { PlanningService } from 'app/entities/planning/service/planning.service';
import { TrimesterService } from 'app/entities/trimester/service/trimester.service';
import { ITrimester } from 'app/entities/trimester/trimester.model';
import { IQuarterSchedule } from '../quarter-schedule.model';
import { QuarterScheduleService } from '../service/quarter-schedule.service';

import { QuarterScheduleFormService } from './quarter-schedule-form.service';
import { QuarterScheduleUpdate } from './quarter-schedule-update';

describe('QuarterSchedule Management Update Component', () => {
  let comp: QuarterScheduleUpdate;
  let fixture: ComponentFixture<QuarterScheduleUpdate>;
  let activatedRoute: ActivatedRoute;
  let quarterScheduleFormService: QuarterScheduleFormService;
  let quarterScheduleService: QuarterScheduleService;
  let learningResultService: LearningResultService;
  let planningService: PlanningService;
  let trimesterService: TrimesterService;

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

    fixture = TestBed.createComponent(QuarterScheduleUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    quarterScheduleFormService = TestBed.inject(QuarterScheduleFormService);
    quarterScheduleService = TestBed.inject(QuarterScheduleService);
    learningResultService = TestBed.inject(LearningResultService);
    planningService = TestBed.inject(PlanningService);
    trimesterService = TestBed.inject(TrimesterService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call LearningResult query and add missing value', () => {
      const quarterSchedule: IQuarterSchedule = { id: '6d26cf65-14a3-450e-b171-5321deb013d8' };
      const learningResult: ILearningResult = { id: '3df09e7d-3257-43f7-9cef-54f68c48c0ac' };
      quarterSchedule.learningResult = learningResult;

      const learningResultCollection: ILearningResult[] = [{ id: '3df09e7d-3257-43f7-9cef-54f68c48c0ac' }];
      vitest.spyOn(learningResultService, 'query').mockReturnValue(of(new HttpResponse({ body: learningResultCollection })));
      const additionalLearningResults = [learningResult];
      const expectedCollection: ILearningResult[] = [...additionalLearningResults, ...learningResultCollection];
      vitest.spyOn(learningResultService, 'addLearningResultToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ quarterSchedule });
      comp.ngOnInit();

      expect(learningResultService.query).toHaveBeenCalled();
      expect(learningResultService.addLearningResultToCollectionIfMissing).toHaveBeenCalledWith(
        learningResultCollection,
        ...additionalLearningResults.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.learningResultsSharedCollection()).toEqual(expectedCollection);
    });

    it('should call Planning query and add missing value', () => {
      const quarterSchedule: IQuarterSchedule = { id: '6d26cf65-14a3-450e-b171-5321deb013d8' };
      const planning: IPlanning = { id: '3c7d8900-e060-455b-8080-b0f040d98cdb' };
      quarterSchedule.planning = planning;

      const planningCollection: IPlanning[] = [{ id: '3c7d8900-e060-455b-8080-b0f040d98cdb' }];
      vitest.spyOn(planningService, 'query').mockReturnValue(of(new HttpResponse({ body: planningCollection })));
      const additionalPlannings = [planning];
      const expectedCollection: IPlanning[] = [...additionalPlannings, ...planningCollection];
      vitest.spyOn(planningService, 'addPlanningToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ quarterSchedule });
      comp.ngOnInit();

      expect(planningService.query).toHaveBeenCalled();
      expect(planningService.addPlanningToCollectionIfMissing).toHaveBeenCalledWith(
        planningCollection,
        ...additionalPlannings.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.planningsSharedCollection()).toEqual(expectedCollection);
    });

    it('should call Trimester query and add missing value', () => {
      const quarterSchedule: IQuarterSchedule = { id: '6d26cf65-14a3-450e-b171-5321deb013d8' };
      const trimester: ITrimester = { id: '23943bac-1112-4eec-a590-f244e6fcb60b' };
      quarterSchedule.trimester = trimester;

      const trimesterCollection: ITrimester[] = [{ id: '23943bac-1112-4eec-a590-f244e6fcb60b' }];
      vitest.spyOn(trimesterService, 'query').mockReturnValue(of(new HttpResponse({ body: trimesterCollection })));
      const additionalTrimesters = [trimester];
      const expectedCollection: ITrimester[] = [...additionalTrimesters, ...trimesterCollection];
      vitest.spyOn(trimesterService, 'addTrimesterToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ quarterSchedule });
      comp.ngOnInit();

      expect(trimesterService.query).toHaveBeenCalled();
      expect(trimesterService.addTrimesterToCollectionIfMissing).toHaveBeenCalledWith(
        trimesterCollection,
        ...additionalTrimesters.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.trimestersSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const quarterSchedule: IQuarterSchedule = { id: '6d26cf65-14a3-450e-b171-5321deb013d8' };
      const learningResult: ILearningResult = { id: '3df09e7d-3257-43f7-9cef-54f68c48c0ac' };
      quarterSchedule.learningResult = learningResult;
      const planning: IPlanning = { id: '3c7d8900-e060-455b-8080-b0f040d98cdb' };
      quarterSchedule.planning = planning;
      const trimester: ITrimester = { id: '23943bac-1112-4eec-a590-f244e6fcb60b' };
      quarterSchedule.trimester = trimester;

      activatedRoute.data = of({ quarterSchedule });
      comp.ngOnInit();

      expect(comp.learningResultsSharedCollection()).toContainEqual(learningResult);
      expect(comp.planningsSharedCollection()).toContainEqual(planning);
      expect(comp.trimestersSharedCollection()).toContainEqual(trimester);
      expect(comp.quarterSchedule).toEqual(quarterSchedule);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IQuarterSchedule>();
      const quarterSchedule = { id: 'cb8a58fb-ddc6-4c56-9542-9f8e60b8e090' };
      vitest.spyOn(quarterScheduleFormService, 'getQuarterSchedule').mockReturnValue(quarterSchedule);
      vitest.spyOn(quarterScheduleService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quarterSchedule });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(quarterSchedule);
      saveSubject.complete();

      // THEN
      expect(quarterScheduleFormService.getQuarterSchedule).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(quarterScheduleService.update).toHaveBeenCalledWith(expect.objectContaining(quarterSchedule));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IQuarterSchedule>();
      const quarterSchedule = { id: 'cb8a58fb-ddc6-4c56-9542-9f8e60b8e090' };
      vitest.spyOn(quarterScheduleFormService, 'getQuarterSchedule').mockReturnValue({ id: null });
      vitest.spyOn(quarterScheduleService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quarterSchedule: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(quarterSchedule);
      saveSubject.complete();

      // THEN
      expect(quarterScheduleFormService.getQuarterSchedule).toHaveBeenCalled();
      expect(quarterScheduleService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IQuarterSchedule>();
      const quarterSchedule = { id: 'cb8a58fb-ddc6-4c56-9542-9f8e60b8e090' };
      vitest.spyOn(quarterScheduleService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quarterSchedule });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(quarterScheduleService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareLearningResult', () => {
      it('should forward to learningResultService', () => {
        const entity = { id: '3df09e7d-3257-43f7-9cef-54f68c48c0ac' };
        const entity2 = { id: '18957aee-fabd-42ae-ac8b-2f943a81490c' };
        vitest.spyOn(learningResultService, 'compareLearningResult');
        comp.compareLearningResult(entity, entity2);
        expect(learningResultService.compareLearningResult).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('comparePlanning', () => {
      it('should forward to planningService', () => {
        const entity = { id: '3c7d8900-e060-455b-8080-b0f040d98cdb' };
        const entity2 = { id: 'a2a09b2c-8b16-4e97-9d64-b8ae8eae8653' };
        vitest.spyOn(planningService, 'comparePlanning');
        comp.comparePlanning(entity, entity2);
        expect(planningService.comparePlanning).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareTrimester', () => {
      it('should forward to trimesterService', () => {
        const entity = { id: '23943bac-1112-4eec-a590-f244e6fcb60b' };
        const entity2 = { id: 'fc8f5153-f1b8-4ede-b817-9b6c218e886f' };
        vitest.spyOn(trimesterService, 'compareTrimester');
        comp.compareTrimester(entity, entity2);
        expect(trimesterService.compareTrimester).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
