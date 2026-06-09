import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { IBonding } from 'app/entities/bonding/bonding.model';
import { BondingService } from 'app/entities/bonding/service/bonding.service';
import { IInstructor } from 'app/entities/instructor/instructor.model';
import { InstructorService } from 'app/entities/instructor/service/instructor.service';
import { YearService } from 'app/entities/year/service/year.service';
import { IYear } from 'app/entities/year/year.model';
import { IBondingInstructor } from '../bonding-instructor.model';
import { BondingInstructorService } from '../service/bonding-instructor.service';

import { BondingInstructorFormService } from './bonding-instructor-form.service';
import { BondingInstructorUpdate } from './bonding-instructor-update';

describe('BondingInstructor Management Update Component', () => {
  let comp: BondingInstructorUpdate;
  let fixture: ComponentFixture<BondingInstructorUpdate>;
  let activatedRoute: ActivatedRoute;
  let bondingInstructorFormService: BondingInstructorFormService;
  let bondingInstructorService: BondingInstructorService;
  let yearService: YearService;
  let instructorService: InstructorService;
  let bondingService: BondingService;

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

    fixture = TestBed.createComponent(BondingInstructorUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    bondingInstructorFormService = TestBed.inject(BondingInstructorFormService);
    bondingInstructorService = TestBed.inject(BondingInstructorService);
    yearService = TestBed.inject(YearService);
    instructorService = TestBed.inject(InstructorService);
    bondingService = TestBed.inject(BondingService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Year query and add missing value', () => {
      const bondingInstructor: IBondingInstructor = { id: 'b53dd849-590c-4532-8f92-15e5623948e6' };
      const year: IYear = { id: '7d487a17-3974-4015-af9f-a5353d384918' };
      bondingInstructor.year = year;

      const yearCollection: IYear[] = [{ id: '7d487a17-3974-4015-af9f-a5353d384918' }];
      vitest.spyOn(yearService, 'query').mockReturnValue(of(new HttpResponse({ body: yearCollection })));
      const additionalYears = [year];
      const expectedCollection: IYear[] = [...additionalYears, ...yearCollection];
      vitest.spyOn(yearService, 'addYearToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ bondingInstructor });
      comp.ngOnInit();

      expect(yearService.query).toHaveBeenCalled();
      expect(yearService.addYearToCollectionIfMissing).toHaveBeenCalledWith(
        yearCollection,
        ...additionalYears.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.yearsSharedCollection()).toEqual(expectedCollection);
    });

    it('should call Instructor query and add missing value', () => {
      const bondingInstructor: IBondingInstructor = { id: 'b53dd849-590c-4532-8f92-15e5623948e6' };
      const instructor: IInstructor = { id: '6fe9ece4-df13-40c8-9fc2-90d39fd11224' };
      bondingInstructor.instructor = instructor;

      const instructorCollection: IInstructor[] = [{ id: '6fe9ece4-df13-40c8-9fc2-90d39fd11224' }];
      vitest.spyOn(instructorService, 'query').mockReturnValue(of(new HttpResponse({ body: instructorCollection })));
      const additionalInstructors = [instructor];
      const expectedCollection: IInstructor[] = [...additionalInstructors, ...instructorCollection];
      vitest.spyOn(instructorService, 'addInstructorToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ bondingInstructor });
      comp.ngOnInit();

      expect(instructorService.query).toHaveBeenCalled();
      expect(instructorService.addInstructorToCollectionIfMissing).toHaveBeenCalledWith(
        instructorCollection,
        ...additionalInstructors.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.instructorsSharedCollection()).toEqual(expectedCollection);
    });

    it('should call Bonding query and add missing value', () => {
      const bondingInstructor: IBondingInstructor = { id: 'b53dd849-590c-4532-8f92-15e5623948e6' };
      const bonding: IBonding = { id: '57960bcc-d6df-4acc-bce6-afeba60dd2e4' };
      bondingInstructor.bonding = bonding;

      const bondingCollection: IBonding[] = [{ id: '57960bcc-d6df-4acc-bce6-afeba60dd2e4' }];
      vitest.spyOn(bondingService, 'query').mockReturnValue(of(new HttpResponse({ body: bondingCollection })));
      const additionalBondings = [bonding];
      const expectedCollection: IBonding[] = [...additionalBondings, ...bondingCollection];
      vitest.spyOn(bondingService, 'addBondingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ bondingInstructor });
      comp.ngOnInit();

      expect(bondingService.query).toHaveBeenCalled();
      expect(bondingService.addBondingToCollectionIfMissing).toHaveBeenCalledWith(
        bondingCollection,
        ...additionalBondings.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.bondingsSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const bondingInstructor: IBondingInstructor = { id: 'b53dd849-590c-4532-8f92-15e5623948e6' };
      const year: IYear = { id: '7d487a17-3974-4015-af9f-a5353d384918' };
      bondingInstructor.year = year;
      const instructor: IInstructor = { id: '6fe9ece4-df13-40c8-9fc2-90d39fd11224' };
      bondingInstructor.instructor = instructor;
      const bonding: IBonding = { id: '57960bcc-d6df-4acc-bce6-afeba60dd2e4' };
      bondingInstructor.bonding = bonding;

      activatedRoute.data = of({ bondingInstructor });
      comp.ngOnInit();

      expect(comp.yearsSharedCollection()).toContainEqual(year);
      expect(comp.instructorsSharedCollection()).toContainEqual(instructor);
      expect(comp.bondingsSharedCollection()).toContainEqual(bonding);
      expect(comp.bondingInstructor).toEqual(bondingInstructor);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IBondingInstructor>();
      const bondingInstructor = { id: 'ab7b6017-edd4-4b72-a00c-30124d1b29e7' };
      vitest.spyOn(bondingInstructorFormService, 'getBondingInstructor').mockReturnValue(bondingInstructor);
      vitest.spyOn(bondingInstructorService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bondingInstructor });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(bondingInstructor);
      saveSubject.complete();

      // THEN
      expect(bondingInstructorFormService.getBondingInstructor).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(bondingInstructorService.update).toHaveBeenCalledWith(expect.objectContaining(bondingInstructor));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IBondingInstructor>();
      const bondingInstructor = { id: 'ab7b6017-edd4-4b72-a00c-30124d1b29e7' };
      vitest.spyOn(bondingInstructorFormService, 'getBondingInstructor').mockReturnValue({ id: null });
      vitest.spyOn(bondingInstructorService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bondingInstructor: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(bondingInstructor);
      saveSubject.complete();

      // THEN
      expect(bondingInstructorFormService.getBondingInstructor).toHaveBeenCalled();
      expect(bondingInstructorService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IBondingInstructor>();
      const bondingInstructor = { id: 'ab7b6017-edd4-4b72-a00c-30124d1b29e7' };
      vitest.spyOn(bondingInstructorService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bondingInstructor });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(bondingInstructorService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareYear', () => {
      it('should forward to yearService', () => {
        const entity = { id: '7d487a17-3974-4015-af9f-a5353d384918' };
        const entity2 = { id: '70a58d86-c825-46c0-9c7b-bf2627e12900' };
        vitest.spyOn(yearService, 'compareYear');
        comp.compareYear(entity, entity2);
        expect(yearService.compareYear).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareInstructor', () => {
      it('should forward to instructorService', () => {
        const entity = { id: '6fe9ece4-df13-40c8-9fc2-90d39fd11224' };
        const entity2 = { id: 'b05d1573-3a4f-4013-93d7-aa029ba1513f' };
        vitest.spyOn(instructorService, 'compareInstructor');
        comp.compareInstructor(entity, entity2);
        expect(instructorService.compareInstructor).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareBonding', () => {
      it('should forward to bondingService', () => {
        const entity = { id: '57960bcc-d6df-4acc-bce6-afeba60dd2e4' };
        const entity2 = { id: 'c7a8c508-c7aa-40be-9cbe-abb77ff018ba' };
        vitest.spyOn(bondingService, 'compareBonding');
        comp.compareBonding(entity, entity2);
        expect(bondingService.compareBonding).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
