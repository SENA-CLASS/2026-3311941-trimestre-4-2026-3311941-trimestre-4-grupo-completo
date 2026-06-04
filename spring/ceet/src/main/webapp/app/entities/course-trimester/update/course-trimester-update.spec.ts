import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { TrimesterService } from 'app/entities/trimester/service/trimester.service';
import { ITrimester } from 'app/entities/trimester/trimester.model';
import { ICourseTrimester } from '../course-trimester.model';
import { CourseTrimesterService } from '../service/course-trimester.service';

import { CourseTrimesterFormService } from './course-trimester-form.service';
import { CourseTrimesterUpdate } from './course-trimester-update';

describe('CourseTrimester Management Update Component', () => {
  let comp: CourseTrimesterUpdate;
  let fixture: ComponentFixture<CourseTrimesterUpdate>;
  let activatedRoute: ActivatedRoute;
  let courseTrimesterFormService: CourseTrimesterFormService;
  let courseTrimesterService: CourseTrimesterService;
  let courseService: CourseService;
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

    fixture = TestBed.createComponent(CourseTrimesterUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    courseTrimesterFormService = TestBed.inject(CourseTrimesterFormService);
    courseTrimesterService = TestBed.inject(CourseTrimesterService);
    courseService = TestBed.inject(CourseService);
    trimesterService = TestBed.inject(TrimesterService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Course query and add missing value', () => {
      const courseTrimester: ICourseTrimester = { id: '160fb1c3-2c69-4184-ab10-636c5d1d30b8' };
      const course: ICourse = { id: '111fabe5-d417-4bae-ac6e-f3e3a988982f' };
      courseTrimester.course = course;

      const courseCollection: ICourse[] = [{ id: '111fabe5-d417-4bae-ac6e-f3e3a988982f' }];
      vitest.spyOn(courseService, 'query').mockReturnValue(of(new HttpResponse({ body: courseCollection })));
      const additionalCourses = [course];
      const expectedCollection: ICourse[] = [...additionalCourses, ...courseCollection];
      vitest.spyOn(courseService, 'addCourseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ courseTrimester });
      comp.ngOnInit();

      expect(courseService.query).toHaveBeenCalled();
      expect(courseService.addCourseToCollectionIfMissing).toHaveBeenCalledWith(
        courseCollection,
        ...additionalCourses.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.coursesSharedCollection()).toEqual(expectedCollection);
    });

    it('should call Trimester query and add missing value', () => {
      const courseTrimester: ICourseTrimester = { id: '160fb1c3-2c69-4184-ab10-636c5d1d30b8' };
      const trimester: ITrimester = { id: '23943bac-1112-4eec-a590-f244e6fcb60b' };
      courseTrimester.trimester = trimester;

      const trimesterCollection: ITrimester[] = [{ id: '23943bac-1112-4eec-a590-f244e6fcb60b' }];
      vitest.spyOn(trimesterService, 'query').mockReturnValue(of(new HttpResponse({ body: trimesterCollection })));
      const additionalTrimesters = [trimester];
      const expectedCollection: ITrimester[] = [...additionalTrimesters, ...trimesterCollection];
      vitest.spyOn(trimesterService, 'addTrimesterToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ courseTrimester });
      comp.ngOnInit();

      expect(trimesterService.query).toHaveBeenCalled();
      expect(trimesterService.addTrimesterToCollectionIfMissing).toHaveBeenCalledWith(
        trimesterCollection,
        ...additionalTrimesters.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.trimestersSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const courseTrimester: ICourseTrimester = { id: '160fb1c3-2c69-4184-ab10-636c5d1d30b8' };
      const course: ICourse = { id: '111fabe5-d417-4bae-ac6e-f3e3a988982f' };
      courseTrimester.course = course;
      const trimester: ITrimester = { id: '23943bac-1112-4eec-a590-f244e6fcb60b' };
      courseTrimester.trimester = trimester;

      activatedRoute.data = of({ courseTrimester });
      comp.ngOnInit();

      expect(comp.coursesSharedCollection()).toContainEqual(course);
      expect(comp.trimestersSharedCollection()).toContainEqual(trimester);
      expect(comp.courseTrimester).toEqual(courseTrimester);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<ICourseTrimester>();
      const courseTrimester = { id: '87627c1c-a756-41da-8baf-2032937c03d7' };
      vitest.spyOn(courseTrimesterFormService, 'getCourseTrimester').mockReturnValue(courseTrimester);
      vitest.spyOn(courseTrimesterService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ courseTrimester });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(courseTrimester);
      saveSubject.complete();

      // THEN
      expect(courseTrimesterFormService.getCourseTrimester).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(courseTrimesterService.update).toHaveBeenCalledWith(expect.objectContaining(courseTrimester));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<ICourseTrimester>();
      const courseTrimester = { id: '87627c1c-a756-41da-8baf-2032937c03d7' };
      vitest.spyOn(courseTrimesterFormService, 'getCourseTrimester').mockReturnValue({ id: null });
      vitest.spyOn(courseTrimesterService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ courseTrimester: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(courseTrimester);
      saveSubject.complete();

      // THEN
      expect(courseTrimesterFormService.getCourseTrimester).toHaveBeenCalled();
      expect(courseTrimesterService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<ICourseTrimester>();
      const courseTrimester = { id: '87627c1c-a756-41da-8baf-2032937c03d7' };
      vitest.spyOn(courseTrimesterService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ courseTrimester });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(courseTrimesterService.update).toHaveBeenCalled();
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
