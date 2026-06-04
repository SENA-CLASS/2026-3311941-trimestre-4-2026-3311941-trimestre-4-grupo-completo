import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { IBondingInstructor } from 'app/entities/bonding-instructor/bonding-instructor.model';
import { BondingInstructorService } from 'app/entities/bonding-instructor/service/bonding-instructor.service';
import { IInstructorWorkingDay } from 'app/entities/instructor-working-day/instructor-working-day.model';
import { InstructorWorkingDayService } from 'app/entities/instructor-working-day/service/instructor-working-day.service';
import { IBoundingSchedule } from '../bounding-schedule.model';
import { BoundingScheduleService } from '../service/bounding-schedule.service';

import { BoundingScheduleFormService } from './bounding-schedule-form.service';
import { BoundingScheduleUpdate } from './bounding-schedule-update';

describe('BoundingSchedule Management Update Component', () => {
  let comp: BoundingScheduleUpdate;
  let fixture: ComponentFixture<BoundingScheduleUpdate>;
  let activatedRoute: ActivatedRoute;
  let boundingScheduleFormService: BoundingScheduleFormService;
  let boundingScheduleService: BoundingScheduleService;
  let bondingInstructorService: BondingInstructorService;
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

    fixture = TestBed.createComponent(BoundingScheduleUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    boundingScheduleFormService = TestBed.inject(BoundingScheduleFormService);
    boundingScheduleService = TestBed.inject(BoundingScheduleService);
    bondingInstructorService = TestBed.inject(BondingInstructorService);
    instructorWorkingDayService = TestBed.inject(InstructorWorkingDayService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call BondingInstructor query and add missing value', () => {
      const boundingSchedule: IBoundingSchedule = { id: '502b7832-a5bd-4dc7-abd9-e94d122443a9' };
      const bondingInstructor: IBondingInstructor = { id: 'ab7b6017-edd4-4b72-a00c-30124d1b29e7' };
      boundingSchedule.bondingInstructor = bondingInstructor;

      const bondingInstructorCollection: IBondingInstructor[] = [{ id: 'ab7b6017-edd4-4b72-a00c-30124d1b29e7' }];
      vitest.spyOn(bondingInstructorService, 'query').mockReturnValue(of(new HttpResponse({ body: bondingInstructorCollection })));
      const additionalBondingInstructors = [bondingInstructor];
      const expectedCollection: IBondingInstructor[] = [...additionalBondingInstructors, ...bondingInstructorCollection];
      vitest.spyOn(bondingInstructorService, 'addBondingInstructorToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ boundingSchedule });
      comp.ngOnInit();

      expect(bondingInstructorService.query).toHaveBeenCalled();
      expect(bondingInstructorService.addBondingInstructorToCollectionIfMissing).toHaveBeenCalledWith(
        bondingInstructorCollection,
        ...additionalBondingInstructors.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.bondingInstructorsSharedCollection()).toEqual(expectedCollection);
    });

    it('should call InstructorWorkingDay query and add missing value', () => {
      const boundingSchedule: IBoundingSchedule = { id: '502b7832-a5bd-4dc7-abd9-e94d122443a9' };
      const instructorWorkingDay: IInstructorWorkingDay = { id: 'a6718508-6ea5-4a16-8155-bfbc48acf256' };
      boundingSchedule.instructorWorkingDay = instructorWorkingDay;

      const instructorWorkingDayCollection: IInstructorWorkingDay[] = [{ id: 'a6718508-6ea5-4a16-8155-bfbc48acf256' }];
      vitest.spyOn(instructorWorkingDayService, 'query').mockReturnValue(of(new HttpResponse({ body: instructorWorkingDayCollection })));
      const additionalInstructorWorkingDays = [instructorWorkingDay];
      const expectedCollection: IInstructorWorkingDay[] = [...additionalInstructorWorkingDays, ...instructorWorkingDayCollection];
      vitest.spyOn(instructorWorkingDayService, 'addInstructorWorkingDayToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ boundingSchedule });
      comp.ngOnInit();

      expect(instructorWorkingDayService.query).toHaveBeenCalled();
      expect(instructorWorkingDayService.addInstructorWorkingDayToCollectionIfMissing).toHaveBeenCalledWith(
        instructorWorkingDayCollection,
        ...additionalInstructorWorkingDays.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.instructorWorkingDaysSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const boundingSchedule: IBoundingSchedule = { id: '502b7832-a5bd-4dc7-abd9-e94d122443a9' };
      const bondingInstructor: IBondingInstructor = { id: 'ab7b6017-edd4-4b72-a00c-30124d1b29e7' };
      boundingSchedule.bondingInstructor = bondingInstructor;
      const instructorWorkingDay: IInstructorWorkingDay = { id: 'a6718508-6ea5-4a16-8155-bfbc48acf256' };
      boundingSchedule.instructorWorkingDay = instructorWorkingDay;

      activatedRoute.data = of({ boundingSchedule });
      comp.ngOnInit();

      expect(comp.bondingInstructorsSharedCollection()).toContainEqual(bondingInstructor);
      expect(comp.instructorWorkingDaysSharedCollection()).toContainEqual(instructorWorkingDay);
      expect(comp.boundingSchedule).toEqual(boundingSchedule);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IBoundingSchedule>();
      const boundingSchedule = { id: '25fe1b48-f026-4b16-aaf7-f684c5be822a' };
      vitest.spyOn(boundingScheduleFormService, 'getBoundingSchedule').mockReturnValue(boundingSchedule);
      vitest.spyOn(boundingScheduleService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ boundingSchedule });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(boundingSchedule);
      saveSubject.complete();

      // THEN
      expect(boundingScheduleFormService.getBoundingSchedule).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(boundingScheduleService.update).toHaveBeenCalledWith(expect.objectContaining(boundingSchedule));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IBoundingSchedule>();
      const boundingSchedule = { id: '25fe1b48-f026-4b16-aaf7-f684c5be822a' };
      vitest.spyOn(boundingScheduleFormService, 'getBoundingSchedule').mockReturnValue({ id: null });
      vitest.spyOn(boundingScheduleService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ boundingSchedule: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(boundingSchedule);
      saveSubject.complete();

      // THEN
      expect(boundingScheduleFormService.getBoundingSchedule).toHaveBeenCalled();
      expect(boundingScheduleService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IBoundingSchedule>();
      const boundingSchedule = { id: '25fe1b48-f026-4b16-aaf7-f684c5be822a' };
      vitest.spyOn(boundingScheduleService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ boundingSchedule });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(boundingScheduleService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareBondingInstructor', () => {
      it('should forward to bondingInstructorService', () => {
        const entity = { id: 'ab7b6017-edd4-4b72-a00c-30124d1b29e7' };
        const entity2 = { id: 'b53dd849-590c-4532-8f92-15e5623948e6' };
        vitest.spyOn(bondingInstructorService, 'compareBondingInstructor');
        comp.compareBondingInstructor(entity, entity2);
        expect(bondingInstructorService.compareBondingInstructor).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareInstructorWorkingDay', () => {
      it('should forward to instructorWorkingDayService', () => {
        const entity = { id: 'a6718508-6ea5-4a16-8155-bfbc48acf256' };
        const entity2 = { id: 'ecdc811d-5dbd-4900-9650-efc8cb17608a' };
        vitest.spyOn(instructorWorkingDayService, 'compareInstructorWorkingDay');
        comp.compareInstructorWorkingDay(entity, entity2);
        expect(instructorWorkingDayService.compareInstructorWorkingDay).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
