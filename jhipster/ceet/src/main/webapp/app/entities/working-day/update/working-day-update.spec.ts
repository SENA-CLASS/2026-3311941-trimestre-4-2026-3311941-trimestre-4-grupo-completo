import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { IDay } from 'app/entities/day/day.model';
import { DayService } from 'app/entities/day/service/day.service';
import { IInstructorWorkingDay } from 'app/entities/instructor-working-day/instructor-working-day.model';
import { InstructorWorkingDayService } from 'app/entities/instructor-working-day/service/instructor-working-day.service';
import { WorkingDayService } from '../service/working-day.service';
import { IWorkingDay } from '../working-day.model';

import { WorkingDayFormService } from './working-day-form.service';
import { WorkingDayUpdate } from './working-day-update';

describe('WorkingDay Management Update Component', () => {
  let comp: WorkingDayUpdate;
  let fixture: ComponentFixture<WorkingDayUpdate>;
  let activatedRoute: ActivatedRoute;
  let workingDayFormService: WorkingDayFormService;
  let workingDayService: WorkingDayService;
  let instructorWorkingDayService: InstructorWorkingDayService;
  let dayService: DayService;

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

    fixture = TestBed.createComponent(WorkingDayUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    workingDayFormService = TestBed.inject(WorkingDayFormService);
    workingDayService = TestBed.inject(WorkingDayService);
    instructorWorkingDayService = TestBed.inject(InstructorWorkingDayService);
    dayService = TestBed.inject(DayService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call InstructorWorkingDay query and add missing value', () => {
      const workingDay: IWorkingDay = { id: 'fddad6dd-031d-41fc-8909-01f8ec6a7bc0' };
      const instructorWorkingDay: IInstructorWorkingDay = { id: 'a6718508-6ea5-4a16-8155-bfbc48acf256' };
      workingDay.instructorWorkingDay = instructorWorkingDay;

      const instructorWorkingDayCollection: IInstructorWorkingDay[] = [{ id: 'a6718508-6ea5-4a16-8155-bfbc48acf256' }];
      vitest.spyOn(instructorWorkingDayService, 'query').mockReturnValue(of(new HttpResponse({ body: instructorWorkingDayCollection })));
      const additionalInstructorWorkingDays = [instructorWorkingDay];
      const expectedCollection: IInstructorWorkingDay[] = [...additionalInstructorWorkingDays, ...instructorWorkingDayCollection];
      vitest.spyOn(instructorWorkingDayService, 'addInstructorWorkingDayToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ workingDay });
      comp.ngOnInit();

      expect(instructorWorkingDayService.query).toHaveBeenCalled();
      expect(instructorWorkingDayService.addInstructorWorkingDayToCollectionIfMissing).toHaveBeenCalledWith(
        instructorWorkingDayCollection,
        ...additionalInstructorWorkingDays.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.instructorWorkingDaysSharedCollection()).toEqual(expectedCollection);
    });

    it('should call Day query and add missing value', () => {
      const workingDay: IWorkingDay = { id: 'fddad6dd-031d-41fc-8909-01f8ec6a7bc0' };
      const day: IDay = { id: '712b4dd0-c635-4121-a9e3-1854687dde35' };
      workingDay.day = day;

      const dayCollection: IDay[] = [{ id: '712b4dd0-c635-4121-a9e3-1854687dde35' }];
      vitest.spyOn(dayService, 'query').mockReturnValue(of(new HttpResponse({ body: dayCollection })));
      const additionalDays = [day];
      const expectedCollection: IDay[] = [...additionalDays, ...dayCollection];
      vitest.spyOn(dayService, 'addDayToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ workingDay });
      comp.ngOnInit();

      expect(dayService.query).toHaveBeenCalled();
      expect(dayService.addDayToCollectionIfMissing).toHaveBeenCalledWith(
        dayCollection,
        ...additionalDays.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.daysSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const workingDay: IWorkingDay = { id: 'fddad6dd-031d-41fc-8909-01f8ec6a7bc0' };
      const instructorWorkingDay: IInstructorWorkingDay = { id: 'a6718508-6ea5-4a16-8155-bfbc48acf256' };
      workingDay.instructorWorkingDay = instructorWorkingDay;
      const day: IDay = { id: '712b4dd0-c635-4121-a9e3-1854687dde35' };
      workingDay.day = day;

      activatedRoute.data = of({ workingDay });
      comp.ngOnInit();

      expect(comp.instructorWorkingDaysSharedCollection()).toContainEqual(instructorWorkingDay);
      expect(comp.daysSharedCollection()).toContainEqual(day);
      expect(comp.workingDay).toEqual(workingDay);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IWorkingDay>();
      const workingDay = { id: 'a0aff8e9-f539-4c17-817e-bbf8dfab13f4' };
      vitest.spyOn(workingDayFormService, 'getWorkingDay').mockReturnValue(workingDay);
      vitest.spyOn(workingDayService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ workingDay });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(workingDay);
      saveSubject.complete();

      // THEN
      expect(workingDayFormService.getWorkingDay).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(workingDayService.update).toHaveBeenCalledWith(expect.objectContaining(workingDay));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IWorkingDay>();
      const workingDay = { id: 'a0aff8e9-f539-4c17-817e-bbf8dfab13f4' };
      vitest.spyOn(workingDayFormService, 'getWorkingDay').mockReturnValue({ id: null });
      vitest.spyOn(workingDayService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ workingDay: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(workingDay);
      saveSubject.complete();

      // THEN
      expect(workingDayFormService.getWorkingDay).toHaveBeenCalled();
      expect(workingDayService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IWorkingDay>();
      const workingDay = { id: 'a0aff8e9-f539-4c17-817e-bbf8dfab13f4' };
      vitest.spyOn(workingDayService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ workingDay });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(workingDayService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareInstructorWorkingDay', () => {
      it('should forward to instructorWorkingDayService', () => {
        const entity = { id: 'a6718508-6ea5-4a16-8155-bfbc48acf256' };
        const entity2 = { id: 'ecdc811d-5dbd-4900-9650-efc8cb17608a' };
        vitest.spyOn(instructorWorkingDayService, 'compareInstructorWorkingDay');
        comp.compareInstructorWorkingDay(entity, entity2);
        expect(instructorWorkingDayService.compareInstructorWorkingDay).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareDay', () => {
      it('should forward to dayService', () => {
        const entity = { id: '712b4dd0-c635-4121-a9e3-1854687dde35' };
        const entity2 = { id: 'c3c5c445-4f79-4566-bfd4-47c60ed1bf8e' };
        vitest.spyOn(dayService, 'compareDay');
        comp.compareDay(entity, entity2);
        expect(dayService.compareDay).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
