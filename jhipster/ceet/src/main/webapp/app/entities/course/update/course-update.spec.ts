import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { ICourseStatus } from 'app/entities/course-status/course-status.model';
import { CourseStatusService } from 'app/entities/course-status/service/course-status.service';
import { TrainingProgramService } from 'app/entities/training-program/service/training-program.service';
import { ITrainingProgram } from 'app/entities/training-program/training-program.model';
import { WorkingDayCourseService } from 'app/entities/working-day-course/service/working-day-course.service';
import { IWorkingDayCourse } from 'app/entities/working-day-course/working-day-course.model';
import { ICourse } from '../course.model';
import { CourseService } from '../service/course.service';

import { CourseFormService } from './course-form.service';
import { CourseUpdate } from './course-update';

describe('Course Management Update Component', () => {
  let comp: CourseUpdate;
  let fixture: ComponentFixture<CourseUpdate>;
  let activatedRoute: ActivatedRoute;
  let courseFormService: CourseFormService;
  let courseService: CourseService;
  let courseStatusService: CourseStatusService;
  let workingDayCourseService: WorkingDayCourseService;
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

    fixture = TestBed.createComponent(CourseUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    courseFormService = TestBed.inject(CourseFormService);
    courseService = TestBed.inject(CourseService);
    courseStatusService = TestBed.inject(CourseStatusService);
    workingDayCourseService = TestBed.inject(WorkingDayCourseService);
    trainingProgramService = TestBed.inject(TrainingProgramService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call CourseStatus query and add missing value', () => {
      const course: ICourse = { id: '85e942c3-e3e8-4da2-bd51-1e7f78f98fe6' };
      const courseStatus: ICourseStatus = { id: '10d644f6-f194-440a-bbab-b099a4c4d9fb' };
      course.courseStatus = courseStatus;

      const courseStatusCollection: ICourseStatus[] = [{ id: '10d644f6-f194-440a-bbab-b099a4c4d9fb' }];
      vitest.spyOn(courseStatusService, 'query').mockReturnValue(of(new HttpResponse({ body: courseStatusCollection })));
      const additionalCourseStatuses = [courseStatus];
      const expectedCollection: ICourseStatus[] = [...additionalCourseStatuses, ...courseStatusCollection];
      vitest.spyOn(courseStatusService, 'addCourseStatusToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ course });
      comp.ngOnInit();

      expect(courseStatusService.query).toHaveBeenCalled();
      expect(courseStatusService.addCourseStatusToCollectionIfMissing).toHaveBeenCalledWith(
        courseStatusCollection,
        ...additionalCourseStatuses.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.courseStatusesSharedCollection()).toEqual(expectedCollection);
    });

    it('should call WorkingDayCourse query and add missing value', () => {
      const course: ICourse = { id: '85e942c3-e3e8-4da2-bd51-1e7f78f98fe6' };
      const workingDayCourse: IWorkingDayCourse = { id: '3317990a-8fb1-4654-821f-70185269b7b0' };
      course.workingDayCourse = workingDayCourse;

      const workingDayCourseCollection: IWorkingDayCourse[] = [{ id: '3317990a-8fb1-4654-821f-70185269b7b0' }];
      vitest.spyOn(workingDayCourseService, 'query').mockReturnValue(of(new HttpResponse({ body: workingDayCourseCollection })));
      const additionalWorkingDayCourses = [workingDayCourse];
      const expectedCollection: IWorkingDayCourse[] = [...additionalWorkingDayCourses, ...workingDayCourseCollection];
      vitest.spyOn(workingDayCourseService, 'addWorkingDayCourseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ course });
      comp.ngOnInit();

      expect(workingDayCourseService.query).toHaveBeenCalled();
      expect(workingDayCourseService.addWorkingDayCourseToCollectionIfMissing).toHaveBeenCalledWith(
        workingDayCourseCollection,
        ...additionalWorkingDayCourses.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.workingDayCoursesSharedCollection()).toEqual(expectedCollection);
    });

    it('should call TrainingProgram query and add missing value', () => {
      const course: ICourse = { id: '85e942c3-e3e8-4da2-bd51-1e7f78f98fe6' };
      const trainingProgram: ITrainingProgram = { id: 'e35ca12a-dfa0-4f9c-9ffb-b83e56d621c3' };
      course.trainingProgram = trainingProgram;

      const trainingProgramCollection: ITrainingProgram[] = [{ id: 'e35ca12a-dfa0-4f9c-9ffb-b83e56d621c3' }];
      vitest.spyOn(trainingProgramService, 'query').mockReturnValue(of(new HttpResponse({ body: trainingProgramCollection })));
      const additionalTrainingPrograms = [trainingProgram];
      const expectedCollection: ITrainingProgram[] = [...additionalTrainingPrograms, ...trainingProgramCollection];
      vitest.spyOn(trainingProgramService, 'addTrainingProgramToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ course });
      comp.ngOnInit();

      expect(trainingProgramService.query).toHaveBeenCalled();
      expect(trainingProgramService.addTrainingProgramToCollectionIfMissing).toHaveBeenCalledWith(
        trainingProgramCollection,
        ...additionalTrainingPrograms.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.trainingProgramsSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const course: ICourse = { id: '85e942c3-e3e8-4da2-bd51-1e7f78f98fe6' };
      const courseStatus: ICourseStatus = { id: '10d644f6-f194-440a-bbab-b099a4c4d9fb' };
      course.courseStatus = courseStatus;
      const workingDayCourse: IWorkingDayCourse = { id: '3317990a-8fb1-4654-821f-70185269b7b0' };
      course.workingDayCourse = workingDayCourse;
      const trainingProgram: ITrainingProgram = { id: 'e35ca12a-dfa0-4f9c-9ffb-b83e56d621c3' };
      course.trainingProgram = trainingProgram;

      activatedRoute.data = of({ course });
      comp.ngOnInit();

      expect(comp.courseStatusesSharedCollection()).toContainEqual(courseStatus);
      expect(comp.workingDayCoursesSharedCollection()).toContainEqual(workingDayCourse);
      expect(comp.trainingProgramsSharedCollection()).toContainEqual(trainingProgram);
      expect(comp.course).toEqual(course);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<ICourse>();
      const course = { id: '111fabe5-d417-4bae-ac6e-f3e3a988982f' };
      vitest.spyOn(courseFormService, 'getCourse').mockReturnValue(course);
      vitest.spyOn(courseService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ course });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(course);
      saveSubject.complete();

      // THEN
      expect(courseFormService.getCourse).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(courseService.update).toHaveBeenCalledWith(expect.objectContaining(course));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<ICourse>();
      const course = { id: '111fabe5-d417-4bae-ac6e-f3e3a988982f' };
      vitest.spyOn(courseFormService, 'getCourse').mockReturnValue({ id: null });
      vitest.spyOn(courseService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ course: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(course);
      saveSubject.complete();

      // THEN
      expect(courseFormService.getCourse).toHaveBeenCalled();
      expect(courseService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<ICourse>();
      const course = { id: '111fabe5-d417-4bae-ac6e-f3e3a988982f' };
      vitest.spyOn(courseService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ course });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(courseService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCourseStatus', () => {
      it('should forward to courseStatusService', () => {
        const entity = { id: '10d644f6-f194-440a-bbab-b099a4c4d9fb' };
        const entity2 = { id: 'ffe39020-1c0d-4cb1-a934-16944daffc5b' };
        vitest.spyOn(courseStatusService, 'compareCourseStatus');
        comp.compareCourseStatus(entity, entity2);
        expect(courseStatusService.compareCourseStatus).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareWorkingDayCourse', () => {
      it('should forward to workingDayCourseService', () => {
        const entity = { id: '3317990a-8fb1-4654-821f-70185269b7b0' };
        const entity2 = { id: '647799fc-3023-41ef-914a-650d7703fb02' };
        vitest.spyOn(workingDayCourseService, 'compareWorkingDayCourse');
        comp.compareWorkingDayCourse(entity, entity2);
        expect(workingDayCourseService.compareWorkingDayCourse).toHaveBeenCalledWith(entity, entity2);
      });
    });

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
