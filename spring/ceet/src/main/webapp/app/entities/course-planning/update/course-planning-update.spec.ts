import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { IPlanning } from 'app/entities/planning/planning.model';
import { PlanningService } from 'app/entities/planning/service/planning.service';
import { ICoursePlanning } from '../course-planning.model';
import { CoursePlanningService } from '../service/course-planning.service';

import { CoursePlanningFormService } from './course-planning-form.service';
import { CoursePlanningUpdate } from './course-planning-update';

describe('CoursePlanning Management Update Component', () => {
  let comp: CoursePlanningUpdate;
  let fixture: ComponentFixture<CoursePlanningUpdate>;
  let activatedRoute: ActivatedRoute;
  let coursePlanningFormService: CoursePlanningFormService;
  let coursePlanningService: CoursePlanningService;
  let courseService: CourseService;
  let planningService: PlanningService;

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

    fixture = TestBed.createComponent(CoursePlanningUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    coursePlanningFormService = TestBed.inject(CoursePlanningFormService);
    coursePlanningService = TestBed.inject(CoursePlanningService);
    courseService = TestBed.inject(CourseService);
    planningService = TestBed.inject(PlanningService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Course query and add missing value', () => {
      const coursePlanning: ICoursePlanning = { id: '348f1f27-344e-4abf-8109-9ade6238651b' };
      const course: ICourse = { id: '111fabe5-d417-4bae-ac6e-f3e3a988982f' };
      coursePlanning.course = course;

      const courseCollection: ICourse[] = [{ id: '111fabe5-d417-4bae-ac6e-f3e3a988982f' }];
      vitest.spyOn(courseService, 'query').mockReturnValue(of(new HttpResponse({ body: courseCollection })));
      const additionalCourses = [course];
      const expectedCollection: ICourse[] = [...additionalCourses, ...courseCollection];
      vitest.spyOn(courseService, 'addCourseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ coursePlanning });
      comp.ngOnInit();

      expect(courseService.query).toHaveBeenCalled();
      expect(courseService.addCourseToCollectionIfMissing).toHaveBeenCalledWith(
        courseCollection,
        ...additionalCourses.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.coursesSharedCollection()).toEqual(expectedCollection);
    });

    it('should call Planning query and add missing value', () => {
      const coursePlanning: ICoursePlanning = { id: '348f1f27-344e-4abf-8109-9ade6238651b' };
      const planning: IPlanning = { id: '3c7d8900-e060-455b-8080-b0f040d98cdb' };
      coursePlanning.planning = planning;

      const planningCollection: IPlanning[] = [{ id: '3c7d8900-e060-455b-8080-b0f040d98cdb' }];
      vitest.spyOn(planningService, 'query').mockReturnValue(of(new HttpResponse({ body: planningCollection })));
      const additionalPlannings = [planning];
      const expectedCollection: IPlanning[] = [...additionalPlannings, ...planningCollection];
      vitest.spyOn(planningService, 'addPlanningToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ coursePlanning });
      comp.ngOnInit();

      expect(planningService.query).toHaveBeenCalled();
      expect(planningService.addPlanningToCollectionIfMissing).toHaveBeenCalledWith(
        planningCollection,
        ...additionalPlannings.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.planningsSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const coursePlanning: ICoursePlanning = { id: '348f1f27-344e-4abf-8109-9ade6238651b' };
      const course: ICourse = { id: '111fabe5-d417-4bae-ac6e-f3e3a988982f' };
      coursePlanning.course = course;
      const planning: IPlanning = { id: '3c7d8900-e060-455b-8080-b0f040d98cdb' };
      coursePlanning.planning = planning;

      activatedRoute.data = of({ coursePlanning });
      comp.ngOnInit();

      expect(comp.coursesSharedCollection()).toContainEqual(course);
      expect(comp.planningsSharedCollection()).toContainEqual(planning);
      expect(comp.coursePlanning).toEqual(coursePlanning);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<ICoursePlanning>();
      const coursePlanning = { id: '4b803aa8-fa56-47c2-883b-22da200d8885' };
      vitest.spyOn(coursePlanningFormService, 'getCoursePlanning').mockReturnValue(coursePlanning);
      vitest.spyOn(coursePlanningService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ coursePlanning });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(coursePlanning);
      saveSubject.complete();

      // THEN
      expect(coursePlanningFormService.getCoursePlanning).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(coursePlanningService.update).toHaveBeenCalledWith(expect.objectContaining(coursePlanning));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<ICoursePlanning>();
      const coursePlanning = { id: '4b803aa8-fa56-47c2-883b-22da200d8885' };
      vitest.spyOn(coursePlanningFormService, 'getCoursePlanning').mockReturnValue({ id: null });
      vitest.spyOn(coursePlanningService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ coursePlanning: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(coursePlanning);
      saveSubject.complete();

      // THEN
      expect(coursePlanningFormService.getCoursePlanning).toHaveBeenCalled();
      expect(coursePlanningService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<ICoursePlanning>();
      const coursePlanning = { id: '4b803aa8-fa56-47c2-883b-22da200d8885' };
      vitest.spyOn(coursePlanningService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ coursePlanning });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(coursePlanningService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCourse', () => {
      it('should forward to courseService', () => {
        const entity = { id: '111fabe5-d417-4bae-ac6e-f3e3a988982f' };
        const entity2 = { id: '85e942c3-e3e8-4da2-bd51-1e7f78f98fe6' };
        vitest.spyOn(courseService, 'compareCourse');
        comp.compareCourse(entity, entity2);
        expect(courseService.compareCourse).toHaveBeenCalledWith(entity, entity2);
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
  });
});
