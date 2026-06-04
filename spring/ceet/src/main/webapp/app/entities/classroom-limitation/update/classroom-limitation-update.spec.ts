import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { IClassroom } from 'app/entities/classroom/classroom.model';
import { ClassroomService } from 'app/entities/classroom/service/classroom.service';
import { ILearningResult } from 'app/entities/learning-result/learning-result.model';
import { LearningResultService } from 'app/entities/learning-result/service/learning-result.service';
import { IClassroomLimitation } from '../classroom-limitation.model';
import { ClassroomLimitationService } from '../service/classroom-limitation.service';

import { ClassroomLimitationFormService } from './classroom-limitation-form.service';
import { ClassroomLimitationUpdate } from './classroom-limitation-update';

describe('ClassroomLimitation Management Update Component', () => {
  let comp: ClassroomLimitationUpdate;
  let fixture: ComponentFixture<ClassroomLimitationUpdate>;
  let activatedRoute: ActivatedRoute;
  let classroomLimitationFormService: ClassroomLimitationFormService;
  let classroomLimitationService: ClassroomLimitationService;
  let classroomService: ClassroomService;
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

    fixture = TestBed.createComponent(ClassroomLimitationUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    classroomLimitationFormService = TestBed.inject(ClassroomLimitationFormService);
    classroomLimitationService = TestBed.inject(ClassroomLimitationService);
    classroomService = TestBed.inject(ClassroomService);
    learningResultService = TestBed.inject(LearningResultService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Classroom query and add missing value', () => {
      const classroomLimitation: IClassroomLimitation = { id: 'abd0e7a4-53e9-4b22-8fb3-9883ceed36ea' };
      const classroom: IClassroom = { id: 'ef876767-91ce-4e28-b866-8ebdf1c26f6f' };
      classroomLimitation.classroom = classroom;

      const classroomCollection: IClassroom[] = [{ id: 'ef876767-91ce-4e28-b866-8ebdf1c26f6f' }];
      vitest.spyOn(classroomService, 'query').mockReturnValue(of(new HttpResponse({ body: classroomCollection })));
      const additionalClassrooms = [classroom];
      const expectedCollection: IClassroom[] = [...additionalClassrooms, ...classroomCollection];
      vitest.spyOn(classroomService, 'addClassroomToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ classroomLimitation });
      comp.ngOnInit();

      expect(classroomService.query).toHaveBeenCalled();
      expect(classroomService.addClassroomToCollectionIfMissing).toHaveBeenCalledWith(
        classroomCollection,
        ...additionalClassrooms.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.classroomsSharedCollection()).toEqual(expectedCollection);
    });

    it('should call LearningResult query and add missing value', () => {
      const classroomLimitation: IClassroomLimitation = { id: 'abd0e7a4-53e9-4b22-8fb3-9883ceed36ea' };
      const learningResult: ILearningResult = { id: '3df09e7d-3257-43f7-9cef-54f68c48c0ac' };
      classroomLimitation.learningResult = learningResult;

      const learningResultCollection: ILearningResult[] = [{ id: '3df09e7d-3257-43f7-9cef-54f68c48c0ac' }];
      vitest.spyOn(learningResultService, 'query').mockReturnValue(of(new HttpResponse({ body: learningResultCollection })));
      const additionalLearningResults = [learningResult];
      const expectedCollection: ILearningResult[] = [...additionalLearningResults, ...learningResultCollection];
      vitest.spyOn(learningResultService, 'addLearningResultToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ classroomLimitation });
      comp.ngOnInit();

      expect(learningResultService.query).toHaveBeenCalled();
      expect(learningResultService.addLearningResultToCollectionIfMissing).toHaveBeenCalledWith(
        learningResultCollection,
        ...additionalLearningResults.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.learningResultsSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const classroomLimitation: IClassroomLimitation = { id: 'abd0e7a4-53e9-4b22-8fb3-9883ceed36ea' };
      const classroom: IClassroom = { id: 'ef876767-91ce-4e28-b866-8ebdf1c26f6f' };
      classroomLimitation.classroom = classroom;
      const learningResult: ILearningResult = { id: '3df09e7d-3257-43f7-9cef-54f68c48c0ac' };
      classroomLimitation.learningResult = learningResult;

      activatedRoute.data = of({ classroomLimitation });
      comp.ngOnInit();

      expect(comp.classroomsSharedCollection()).toContainEqual(classroom);
      expect(comp.learningResultsSharedCollection()).toContainEqual(learningResult);
      expect(comp.classroomLimitation).toEqual(classroomLimitation);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IClassroomLimitation>();
      const classroomLimitation = { id: 'ba08a49b-1200-43e0-801b-3547f699926b' };
      vitest.spyOn(classroomLimitationFormService, 'getClassroomLimitation').mockReturnValue(classroomLimitation);
      vitest.spyOn(classroomLimitationService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ classroomLimitation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(classroomLimitation);
      saveSubject.complete();

      // THEN
      expect(classroomLimitationFormService.getClassroomLimitation).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(classroomLimitationService.update).toHaveBeenCalledWith(expect.objectContaining(classroomLimitation));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IClassroomLimitation>();
      const classroomLimitation = { id: 'ba08a49b-1200-43e0-801b-3547f699926b' };
      vitest.spyOn(classroomLimitationFormService, 'getClassroomLimitation').mockReturnValue({ id: null });
      vitest.spyOn(classroomLimitationService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ classroomLimitation: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(classroomLimitation);
      saveSubject.complete();

      // THEN
      expect(classroomLimitationFormService.getClassroomLimitation).toHaveBeenCalled();
      expect(classroomLimitationService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IClassroomLimitation>();
      const classroomLimitation = { id: 'ba08a49b-1200-43e0-801b-3547f699926b' };
      vitest.spyOn(classroomLimitationService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ classroomLimitation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(classroomLimitationService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareClassroom', () => {
      it('should forward to classroomService', () => {
        const entity = { id: 'ef876767-91ce-4e28-b866-8ebdf1c26f6f' };
        const entity2 = { id: '8ce047e9-4e00-4822-b68d-4115c0d99bb4' };
        vitest.spyOn(classroomService, 'compareClassroom');
        comp.compareClassroom(entity, entity2);
        expect(classroomService.compareClassroom).toHaveBeenCalledWith(entity, entity2);
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
