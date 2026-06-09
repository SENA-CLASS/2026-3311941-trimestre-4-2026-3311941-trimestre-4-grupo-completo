import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { WorkingDayCourseService } from '../service/working-day-course.service';
import { IWorkingDayCourse } from '../working-day-course.model';

import { WorkingDayCourseFormService } from './working-day-course-form.service';
import { WorkingDayCourseUpdate } from './working-day-course-update';

describe('WorkingDayCourse Management Update Component', () => {
  let comp: WorkingDayCourseUpdate;
  let fixture: ComponentFixture<WorkingDayCourseUpdate>;
  let activatedRoute: ActivatedRoute;
  let workingDayCourseFormService: WorkingDayCourseFormService;
  let workingDayCourseService: WorkingDayCourseService;

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

    fixture = TestBed.createComponent(WorkingDayCourseUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    workingDayCourseFormService = TestBed.inject(WorkingDayCourseFormService);
    workingDayCourseService = TestBed.inject(WorkingDayCourseService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const workingDayCourse: IWorkingDayCourse = { id: '647799fc-3023-41ef-914a-650d7703fb02' };

      activatedRoute.data = of({ workingDayCourse });
      comp.ngOnInit();

      expect(comp.workingDayCourse).toEqual(workingDayCourse);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IWorkingDayCourse>();
      const workingDayCourse = { id: '3317990a-8fb1-4654-821f-70185269b7b0' };
      vitest.spyOn(workingDayCourseFormService, 'getWorkingDayCourse').mockReturnValue(workingDayCourse);
      vitest.spyOn(workingDayCourseService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ workingDayCourse });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(workingDayCourse);
      saveSubject.complete();

      // THEN
      expect(workingDayCourseFormService.getWorkingDayCourse).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(workingDayCourseService.update).toHaveBeenCalledWith(expect.objectContaining(workingDayCourse));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IWorkingDayCourse>();
      const workingDayCourse = { id: '3317990a-8fb1-4654-821f-70185269b7b0' };
      vitest.spyOn(workingDayCourseFormService, 'getWorkingDayCourse').mockReturnValue({ id: null });
      vitest.spyOn(workingDayCourseService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ workingDayCourse: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(workingDayCourse);
      saveSubject.complete();

      // THEN
      expect(workingDayCourseFormService.getWorkingDayCourse).toHaveBeenCalled();
      expect(workingDayCourseService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IWorkingDayCourse>();
      const workingDayCourse = { id: '3317990a-8fb1-4654-821f-70185269b7b0' };
      vitest.spyOn(workingDayCourseService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ workingDayCourse });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(workingDayCourseService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
