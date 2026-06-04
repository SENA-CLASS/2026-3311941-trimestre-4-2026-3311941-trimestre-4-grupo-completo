import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { ICourseStatus } from '../course-status.model';
import { CourseStatusService } from '../service/course-status.service';

import { CourseStatusFormService } from './course-status-form.service';
import { CourseStatusUpdate } from './course-status-update';

describe('CourseStatus Management Update Component', () => {
  let comp: CourseStatusUpdate;
  let fixture: ComponentFixture<CourseStatusUpdate>;
  let activatedRoute: ActivatedRoute;
  let courseStatusFormService: CourseStatusFormService;
  let courseStatusService: CourseStatusService;

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

    fixture = TestBed.createComponent(CourseStatusUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    courseStatusFormService = TestBed.inject(CourseStatusFormService);
    courseStatusService = TestBed.inject(CourseStatusService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const courseStatus: ICourseStatus = { id: 'ffe39020-1c0d-4cb1-a934-16944daffc5b' };

      activatedRoute.data = of({ courseStatus });
      comp.ngOnInit();

      expect(comp.courseStatus).toEqual(courseStatus);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<ICourseStatus>();
      const courseStatus = { id: '10d644f6-f194-440a-bbab-b099a4c4d9fb' };
      vitest.spyOn(courseStatusFormService, 'getCourseStatus').mockReturnValue(courseStatus);
      vitest.spyOn(courseStatusService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ courseStatus });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(courseStatus);
      saveSubject.complete();

      // THEN
      expect(courseStatusFormService.getCourseStatus).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(courseStatusService.update).toHaveBeenCalledWith(expect.objectContaining(courseStatus));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<ICourseStatus>();
      const courseStatus = { id: '10d644f6-f194-440a-bbab-b099a4c4d9fb' };
      vitest.spyOn(courseStatusFormService, 'getCourseStatus').mockReturnValue({ id: null });
      vitest.spyOn(courseStatusService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ courseStatus: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(courseStatus);
      saveSubject.complete();

      // THEN
      expect(courseStatusFormService.getCourseStatus).toHaveBeenCalled();
      expect(courseStatusService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<ICourseStatus>();
      const courseStatus = { id: '10d644f6-f194-440a-bbab-b099a4c4d9fb' };
      vitest.spyOn(courseStatusService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ courseStatus });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(courseStatusService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
