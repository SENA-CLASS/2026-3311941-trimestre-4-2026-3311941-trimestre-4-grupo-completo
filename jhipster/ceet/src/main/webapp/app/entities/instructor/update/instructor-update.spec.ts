import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { ICustomer } from 'app/entities/customer/customer.model';
import { CustomerService } from 'app/entities/customer/service/customer.service';
import { IInstructor } from '../instructor.model';
import { InstructorService } from '../service/instructor.service';

import { InstructorFormService } from './instructor-form.service';
import { InstructorUpdate } from './instructor-update';

describe('Instructor Management Update Component', () => {
  let comp: InstructorUpdate;
  let fixture: ComponentFixture<InstructorUpdate>;
  let activatedRoute: ActivatedRoute;
  let instructorFormService: InstructorFormService;
  let instructorService: InstructorService;
  let customerService: CustomerService;

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

    fixture = TestBed.createComponent(InstructorUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    instructorFormService = TestBed.inject(InstructorFormService);
    instructorService = TestBed.inject(InstructorService);
    customerService = TestBed.inject(CustomerService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Customer query and add missing value', () => {
      const instructor: IInstructor = { id: 'b05d1573-3a4f-4013-93d7-aa029ba1513f' };
      const customer: ICustomer = { id: 'da280165-638b-4501-b7f6-8e853e58ca86' };
      instructor.customer = customer;

      const customerCollection: ICustomer[] = [{ id: 'da280165-638b-4501-b7f6-8e853e58ca86' }];
      vitest.spyOn(customerService, 'query').mockReturnValue(of(new HttpResponse({ body: customerCollection })));
      const additionalCustomers = [customer];
      const expectedCollection: ICustomer[] = [...additionalCustomers, ...customerCollection];
      vitest.spyOn(customerService, 'addCustomerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ instructor });
      comp.ngOnInit();

      expect(customerService.query).toHaveBeenCalled();
      expect(customerService.addCustomerToCollectionIfMissing).toHaveBeenCalledWith(
        customerCollection,
        ...additionalCustomers.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.customersSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const instructor: IInstructor = { id: 'b05d1573-3a4f-4013-93d7-aa029ba1513f' };
      const customer: ICustomer = { id: 'da280165-638b-4501-b7f6-8e853e58ca86' };
      instructor.customer = customer;

      activatedRoute.data = of({ instructor });
      comp.ngOnInit();

      expect(comp.customersSharedCollection()).toContainEqual(customer);
      expect(comp.instructor).toEqual(instructor);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IInstructor>();
      const instructor = { id: '6fe9ece4-df13-40c8-9fc2-90d39fd11224' };
      vitest.spyOn(instructorFormService, 'getInstructor').mockReturnValue(instructor);
      vitest.spyOn(instructorService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ instructor });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(instructor);
      saveSubject.complete();

      // THEN
      expect(instructorFormService.getInstructor).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(instructorService.update).toHaveBeenCalledWith(expect.objectContaining(instructor));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IInstructor>();
      const instructor = { id: '6fe9ece4-df13-40c8-9fc2-90d39fd11224' };
      vitest.spyOn(instructorFormService, 'getInstructor').mockReturnValue({ id: null });
      vitest.spyOn(instructorService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ instructor: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(instructor);
      saveSubject.complete();

      // THEN
      expect(instructorFormService.getInstructor).toHaveBeenCalled();
      expect(instructorService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IInstructor>();
      const instructor = { id: '6fe9ece4-df13-40c8-9fc2-90d39fd11224' };
      vitest.spyOn(instructorService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ instructor });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(instructorService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCustomer', () => {
      it('should forward to customerService', () => {
        const entity = { id: 'da280165-638b-4501-b7f6-8e853e58ca86' };
        const entity2 = { id: '03d357fc-543e-4d3c-a02e-e2b30b4cd789' };
        vitest.spyOn(customerService, 'compareCustomer');
        comp.compareCustomer(entity, entity2);
        expect(customerService.compareCustomer).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
