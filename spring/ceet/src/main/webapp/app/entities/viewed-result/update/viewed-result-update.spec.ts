import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { ICourseTrimester } from 'app/entities/course-trimester/course-trimester.model';
import { CourseTrimesterService } from 'app/entities/course-trimester/service/course-trimester.service';
import { ILearningResult } from 'app/entities/learning-result/learning-result.model';
import { LearningResultService } from 'app/entities/learning-result/service/learning-result.service';
import { IPlanning } from 'app/entities/planning/planning.model';
import { PlanningService } from 'app/entities/planning/service/planning.service';
import { ViewedResultService } from '../service/viewed-result.service';
import { IViewedResult } from '../viewed-result.model';

import { ViewedResultFormService } from './viewed-result-form.service';
import { ViewedResultUpdate } from './viewed-result-update';

describe('ViewedResult Management Update Component', () => {
  let comp: ViewedResultUpdate;
  let fixture: ComponentFixture<ViewedResultUpdate>;
  let activatedRoute: ActivatedRoute;
  let viewedResultFormService: ViewedResultFormService;
  let viewedResultService: ViewedResultService;
  let courseTrimesterService: CourseTrimesterService;
  let planningService: PlanningService;
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

    fixture = TestBed.createComponent(ViewedResultUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    viewedResultFormService = TestBed.inject(ViewedResultFormService);
    viewedResultService = TestBed.inject(ViewedResultService);
    courseTrimesterService = TestBed.inject(CourseTrimesterService);
    planningService = TestBed.inject(PlanningService);
    learningResultService = TestBed.inject(LearningResultService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call CourseTrimester query and add missing value', () => {
      const viewedResult: IViewedResult = { id: '9654f016-d4cb-4bc3-9d46-d5f6c821cccb' };
      const courseTrimester: ICourseTrimester = { id: '87627c1c-a756-41da-8baf-2032937c03d7' };
      viewedResult.courseTrimester = courseTrimester;

      const courseTrimesterCollection: ICourseTrimester[] = [{ id: '87627c1c-a756-41da-8baf-2032937c03d7' }];
      vitest.spyOn(courseTrimesterService, 'query').mockReturnValue(of(new HttpResponse({ body: courseTrimesterCollection })));
      const additionalCourseTrimesters = [courseTrimester];
      const expectedCollection: ICourseTrimester[] = [...additionalCourseTrimesters, ...courseTrimesterCollection];
      vitest.spyOn(courseTrimesterService, 'addCourseTrimesterToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ viewedResult });
      comp.ngOnInit();

      expect(courseTrimesterService.query).toHaveBeenCalled();
      expect(courseTrimesterService.addCourseTrimesterToCollectionIfMissing).toHaveBeenCalledWith(
        courseTrimesterCollection,
        ...additionalCourseTrimesters.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.courseTrimestersSharedCollection()).toEqual(expectedCollection);
    });

    it('should call Planning query and add missing value', () => {
      const viewedResult: IViewedResult = { id: '9654f016-d4cb-4bc3-9d46-d5f6c821cccb' };
      const planning: IPlanning = { id: '3c7d8900-e060-455b-8080-b0f040d98cdb' };
      viewedResult.planning = planning;

      const planningCollection: IPlanning[] = [{ id: '3c7d8900-e060-455b-8080-b0f040d98cdb' }];
      vitest.spyOn(planningService, 'query').mockReturnValue(of(new HttpResponse({ body: planningCollection })));
      const additionalPlannings = [planning];
      const expectedCollection: IPlanning[] = [...additionalPlannings, ...planningCollection];
      vitest.spyOn(planningService, 'addPlanningToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ viewedResult });
      comp.ngOnInit();

      expect(planningService.query).toHaveBeenCalled();
      expect(planningService.addPlanningToCollectionIfMissing).toHaveBeenCalledWith(
        planningCollection,
        ...additionalPlannings.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.planningsSharedCollection()).toEqual(expectedCollection);
    });

    it('should call LearningResult query and add missing value', () => {
      const viewedResult: IViewedResult = { id: '9654f016-d4cb-4bc3-9d46-d5f6c821cccb' };
      const learningResult: ILearningResult = { id: '3df09e7d-3257-43f7-9cef-54f68c48c0ac' };
      viewedResult.learningResult = learningResult;

      const learningResultCollection: ILearningResult[] = [{ id: '3df09e7d-3257-43f7-9cef-54f68c48c0ac' }];
      vitest.spyOn(learningResultService, 'query').mockReturnValue(of(new HttpResponse({ body: learningResultCollection })));
      const additionalLearningResults = [learningResult];
      const expectedCollection: ILearningResult[] = [...additionalLearningResults, ...learningResultCollection];
      vitest.spyOn(learningResultService, 'addLearningResultToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ viewedResult });
      comp.ngOnInit();

      expect(learningResultService.query).toHaveBeenCalled();
      expect(learningResultService.addLearningResultToCollectionIfMissing).toHaveBeenCalledWith(
        learningResultCollection,
        ...additionalLearningResults.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.learningResultsSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const viewedResult: IViewedResult = { id: '9654f016-d4cb-4bc3-9d46-d5f6c821cccb' };
      const courseTrimester: ICourseTrimester = { id: '87627c1c-a756-41da-8baf-2032937c03d7' };
      viewedResult.courseTrimester = courseTrimester;
      const planning: IPlanning = { id: '3c7d8900-e060-455b-8080-b0f040d98cdb' };
      viewedResult.planning = planning;
      const learningResult: ILearningResult = { id: '3df09e7d-3257-43f7-9cef-54f68c48c0ac' };
      viewedResult.learningResult = learningResult;

      activatedRoute.data = of({ viewedResult });
      comp.ngOnInit();

      expect(comp.courseTrimestersSharedCollection()).toContainEqual(courseTrimester);
      expect(comp.planningsSharedCollection()).toContainEqual(planning);
      expect(comp.learningResultsSharedCollection()).toContainEqual(learningResult);
      expect(comp.viewedResult).toEqual(viewedResult);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IViewedResult>();
      const viewedResult = { id: 'dceb3c65-7ad5-4d2c-adee-22240c1d2286' };
      vitest.spyOn(viewedResultFormService, 'getViewedResult').mockReturnValue(viewedResult);
      vitest.spyOn(viewedResultService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ viewedResult });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(viewedResult);
      saveSubject.complete();

      // THEN
      expect(viewedResultFormService.getViewedResult).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(viewedResultService.update).toHaveBeenCalledWith(expect.objectContaining(viewedResult));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IViewedResult>();
      const viewedResult = { id: 'dceb3c65-7ad5-4d2c-adee-22240c1d2286' };
      vitest.spyOn(viewedResultFormService, 'getViewedResult').mockReturnValue({ id: null });
      vitest.spyOn(viewedResultService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ viewedResult: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(viewedResult);
      saveSubject.complete();

      // THEN
      expect(viewedResultFormService.getViewedResult).toHaveBeenCalled();
      expect(viewedResultService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IViewedResult>();
      const viewedResult = { id: 'dceb3c65-7ad5-4d2c-adee-22240c1d2286' };
      vitest.spyOn(viewedResultService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ viewedResult });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(viewedResultService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCourseTrimester', () => {
      it('should forward to courseTrimesterService', () => {
        const entity = { id: '87627c1c-a756-41da-8baf-2032937c03d7' };
        const entity2 = { id: '160fb1c3-2c69-4184-ab10-636c5d1d30b8' };
        vitest.spyOn(courseTrimesterService, 'compareCourseTrimester');
        comp.compareCourseTrimester(entity, entity2);
        expect(courseTrimesterService.compareCourseTrimester).toHaveBeenCalledWith(entity, entity2);
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
