import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { ICustomer } from 'app/entities/customer/customer.model';
import { CustomerService } from 'app/entities/customer/service/customer.service';
import { ILogError } from '../log-error.model';
import { LogErrorService } from '../service/log-error.service';

import { LogErrorFormService } from './log-error-form.service';
import { LogErrorUpdate } from './log-error-update';

describe('LogError Management Update Component', () => {
  let comp: LogErrorUpdate;
  let fixture: ComponentFixture<LogErrorUpdate>;
  let activatedRoute: ActivatedRoute;
  let logErrorFormService: LogErrorFormService;
  let logErrorService: LogErrorService;
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

    fixture = TestBed.createComponent(LogErrorUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    logErrorFormService = TestBed.inject(LogErrorFormService);
    logErrorService = TestBed.inject(LogErrorService);
    customerService = TestBed.inject(CustomerService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Customer query and add missing value', () => {
      const logError: ILogError = { id: '5cc22e6b-06ac-42d0-a1ab-fed31ace05cd' };
      const customer: ICustomer = { id: 'da280165-638b-4501-b7f6-8e853e58ca86' };
      logError.customer = customer;

      const customerCollection: ICustomer[] = [{ id: 'da280165-638b-4501-b7f6-8e853e58ca86' }];
      vitest.spyOn(customerService, 'query').mockReturnValue(of(new HttpResponse({ body: customerCollection })));
      const additionalCustomers = [customer];
      const expectedCollection: ICustomer[] = [...additionalCustomers, ...customerCollection];
      vitest.spyOn(customerService, 'addCustomerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ logError });
      comp.ngOnInit();

      expect(customerService.query).toHaveBeenCalled();
      expect(customerService.addCustomerToCollectionIfMissing).toHaveBeenCalledWith(
        customerCollection,
        ...additionalCustomers.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.customersSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const logError: ILogError = { id: '5cc22e6b-06ac-42d0-a1ab-fed31ace05cd' };
      const customer: ICustomer = { id: 'da280165-638b-4501-b7f6-8e853e58ca86' };
      logError.customer = customer;

      activatedRoute.data = of({ logError });
      comp.ngOnInit();

      expect(comp.customersSharedCollection()).toContainEqual(customer);
      expect(comp.logError).toEqual(logError);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<ILogError>();
      const logError = { id: '86ed6f82-2f50-4460-81da-2d13f2ad36ef' };
      vitest.spyOn(logErrorFormService, 'getLogError').mockReturnValue(logError);
      vitest.spyOn(logErrorService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logError });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(logError);
      saveSubject.complete();

      // THEN
      expect(logErrorFormService.getLogError).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(logErrorService.update).toHaveBeenCalledWith(expect.objectContaining(logError));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<ILogError>();
      const logError = { id: '86ed6f82-2f50-4460-81da-2d13f2ad36ef' };
      vitest.spyOn(logErrorFormService, 'getLogError').mockReturnValue({ id: null });
      vitest.spyOn(logErrorService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logError: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(logError);
      saveSubject.complete();

      // THEN
      expect(logErrorFormService.getLogError).toHaveBeenCalled();
      expect(logErrorService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<ILogError>();
      const logError = { id: '86ed6f82-2f50-4460-81da-2d13f2ad36ef' };
      vitest.spyOn(logErrorService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logError });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(logErrorService.update).toHaveBeenCalled();
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
