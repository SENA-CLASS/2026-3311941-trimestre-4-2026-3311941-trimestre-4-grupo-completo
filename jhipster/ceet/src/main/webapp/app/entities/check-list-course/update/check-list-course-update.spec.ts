import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { ICheckList } from 'app/entities/check-list/check-list.model';
import { CheckListService } from 'app/entities/check-list/service/check-list.service';
import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { ICheckListCourse } from '../check-list-course.model';
import { CheckListCourseService } from '../service/check-list-course.service';

import { CheckListCourseFormService } from './check-list-course-form.service';
import { CheckListCourseUpdate } from './check-list-course-update';

describe('CheckListCourse Management Update Component', () => {
  let comp: CheckListCourseUpdate;
  let fixture: ComponentFixture<CheckListCourseUpdate>;
  let activatedRoute: ActivatedRoute;
  let checkListCourseFormService: CheckListCourseFormService;
  let checkListCourseService: CheckListCourseService;
  let courseService: CourseService;
  let checkListService: CheckListService;

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

    fixture = TestBed.createComponent(CheckListCourseUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    checkListCourseFormService = TestBed.inject(CheckListCourseFormService);
    checkListCourseService = TestBed.inject(CheckListCourseService);
    courseService = TestBed.inject(CourseService);
    checkListService = TestBed.inject(CheckListService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Course query and add missing value', () => {
      const checkListCourse: ICheckListCourse = { id: 'b3f905ac-b319-4b8f-b56f-0255eda3d659' };
      const course: ICourse = { id: '111fabe5-d417-4bae-ac6e-f3e3a988982f' };
      checkListCourse.course = course;

      const courseCollection: ICourse[] = [{ id: '111fabe5-d417-4bae-ac6e-f3e3a988982f' }];
      vitest.spyOn(courseService, 'query').mockReturnValue(of(new HttpResponse({ body: courseCollection })));
      const additionalCourses = [course];
      const expectedCollection: ICourse[] = [...additionalCourses, ...courseCollection];
      vitest.spyOn(courseService, 'addCourseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ checkListCourse });
      comp.ngOnInit();

      expect(courseService.query).toHaveBeenCalled();
      expect(courseService.addCourseToCollectionIfMissing).toHaveBeenCalledWith(
        courseCollection,
        ...additionalCourses.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.coursesSharedCollection()).toEqual(expectedCollection);
    });

    it('should call CheckList query and add missing value', () => {
      const checkListCourse: ICheckListCourse = { id: 'b3f905ac-b319-4b8f-b56f-0255eda3d659' };
      const checkList: ICheckList = { id: '7741670b-56eb-400b-a3ea-2a7b30040404' };
      checkListCourse.checkList = checkList;

      const checkListCollection: ICheckList[] = [{ id: '7741670b-56eb-400b-a3ea-2a7b30040404' }];
      vitest.spyOn(checkListService, 'query').mockReturnValue(of(new HttpResponse({ body: checkListCollection })));
      const additionalCheckLists = [checkList];
      const expectedCollection: ICheckList[] = [...additionalCheckLists, ...checkListCollection];
      vitest.spyOn(checkListService, 'addCheckListToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ checkListCourse });
      comp.ngOnInit();

      expect(checkListService.query).toHaveBeenCalled();
      expect(checkListService.addCheckListToCollectionIfMissing).toHaveBeenCalledWith(
        checkListCollection,
        ...additionalCheckLists.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.checkListsSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const checkListCourse: ICheckListCourse = { id: 'b3f905ac-b319-4b8f-b56f-0255eda3d659' };
      const course: ICourse = { id: '111fabe5-d417-4bae-ac6e-f3e3a988982f' };
      checkListCourse.course = course;
      const checkList: ICheckList = { id: '7741670b-56eb-400b-a3ea-2a7b30040404' };
      checkListCourse.checkList = checkList;

      activatedRoute.data = of({ checkListCourse });
      comp.ngOnInit();

      expect(comp.coursesSharedCollection()).toContainEqual(course);
      expect(comp.checkListsSharedCollection()).toContainEqual(checkList);
      expect(comp.checkListCourse).toEqual(checkListCourse);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<ICheckListCourse>();
      const checkListCourse = { id: 'fe0e76c2-b0cd-455f-82aa-49d4fdb3fd1e' };
      vitest.spyOn(checkListCourseFormService, 'getCheckListCourse').mockReturnValue(checkListCourse);
      vitest.spyOn(checkListCourseService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ checkListCourse });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(checkListCourse);
      saveSubject.complete();

      // THEN
      expect(checkListCourseFormService.getCheckListCourse).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(checkListCourseService.update).toHaveBeenCalledWith(expect.objectContaining(checkListCourse));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<ICheckListCourse>();
      const checkListCourse = { id: 'fe0e76c2-b0cd-455f-82aa-49d4fdb3fd1e' };
      vitest.spyOn(checkListCourseFormService, 'getCheckListCourse').mockReturnValue({ id: null });
      vitest.spyOn(checkListCourseService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ checkListCourse: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(checkListCourse);
      saveSubject.complete();

      // THEN
      expect(checkListCourseFormService.getCheckListCourse).toHaveBeenCalled();
      expect(checkListCourseService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<ICheckListCourse>();
      const checkListCourse = { id: 'fe0e76c2-b0cd-455f-82aa-49d4fdb3fd1e' };
      vitest.spyOn(checkListCourseService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ checkListCourse });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(checkListCourseService.update).toHaveBeenCalled();
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

    describe('compareCheckList', () => {
      it('should forward to checkListService', () => {
        const entity = { id: '7741670b-56eb-400b-a3ea-2a7b30040404' };
        const entity2 = { id: 'ee29852f-bfd9-4495-b2b5-7c31e2e7b499' };
        vitest.spyOn(checkListService, 'compareCheckList');
        comp.compareCheckList(entity, entity2);
        expect(checkListService.compareCheckList).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
