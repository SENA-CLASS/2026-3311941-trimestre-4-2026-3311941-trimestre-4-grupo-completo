import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { IInstructorWorkingDay } from '../instructor-working-day.model';
import { InstructorWorkingDayService } from '../service/instructor-working-day.service';

import { InstructorWorkingDayFormService } from './instructor-working-day-form.service';
import { InstructorWorkingDayUpdate } from './instructor-working-day-update';

describe('InstructorWorkingDay Management Update Component', () => {
  let comp: InstructorWorkingDayUpdate;
  let fixture: ComponentFixture<InstructorWorkingDayUpdate>;
  let activatedRoute: ActivatedRoute;
  let instructorWorkingDayFormService: InstructorWorkingDayFormService;
  let instructorWorkingDayService: InstructorWorkingDayService;

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

    fixture = TestBed.createComponent(InstructorWorkingDayUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    instructorWorkingDayFormService = TestBed.inject(InstructorWorkingDayFormService);
    instructorWorkingDayService = TestBed.inject(InstructorWorkingDayService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const instructorWorkingDay: IInstructorWorkingDay = { id: 'ecdc811d-5dbd-4900-9650-efc8cb17608a' };

      activatedRoute.data = of({ instructorWorkingDay });
      comp.ngOnInit();

      expect(comp.instructorWorkingDay).toEqual(instructorWorkingDay);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IInstructorWorkingDay>();
      const instructorWorkingDay = { id: 'a6718508-6ea5-4a16-8155-bfbc48acf256' };
      vitest.spyOn(instructorWorkingDayFormService, 'getInstructorWorkingDay').mockReturnValue(instructorWorkingDay);
      vitest.spyOn(instructorWorkingDayService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ instructorWorkingDay });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(instructorWorkingDay);
      saveSubject.complete();

      // THEN
      expect(instructorWorkingDayFormService.getInstructorWorkingDay).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(instructorWorkingDayService.update).toHaveBeenCalledWith(expect.objectContaining(instructorWorkingDay));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IInstructorWorkingDay>();
      const instructorWorkingDay = { id: 'a6718508-6ea5-4a16-8155-bfbc48acf256' };
      vitest.spyOn(instructorWorkingDayFormService, 'getInstructorWorkingDay').mockReturnValue({ id: null });
      vitest.spyOn(instructorWorkingDayService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ instructorWorkingDay: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(instructorWorkingDay);
      saveSubject.complete();

      // THEN
      expect(instructorWorkingDayFormService.getInstructorWorkingDay).toHaveBeenCalled();
      expect(instructorWorkingDayService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IInstructorWorkingDay>();
      const instructorWorkingDay = { id: 'a6718508-6ea5-4a16-8155-bfbc48acf256' };
      vitest.spyOn(instructorWorkingDayService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ instructorWorkingDay });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(instructorWorkingDayService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
