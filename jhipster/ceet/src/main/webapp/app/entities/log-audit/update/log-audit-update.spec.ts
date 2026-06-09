import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { ICustomer } from 'app/entities/customer/customer.model';
import { CustomerService } from 'app/entities/customer/service/customer.service';
import { ILogAudit } from '../log-audit.model';
import { LogAuditService } from '../service/log-audit.service';

import { LogAuditFormService } from './log-audit-form.service';
import { LogAuditUpdate } from './log-audit-update';

describe('LogAudit Management Update Component', () => {
  let comp: LogAuditUpdate;
  let fixture: ComponentFixture<LogAuditUpdate>;
  let activatedRoute: ActivatedRoute;
  let logAuditFormService: LogAuditFormService;
  let logAuditService: LogAuditService;
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

    fixture = TestBed.createComponent(LogAuditUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    logAuditFormService = TestBed.inject(LogAuditFormService);
    logAuditService = TestBed.inject(LogAuditService);
    customerService = TestBed.inject(CustomerService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Customer query and add missing value', () => {
      const logAudit: ILogAudit = { id: 'f5e5d37d-e689-46a9-ae4c-92ac59e96ef3' };
      const customer: ICustomer = { id: 'da280165-638b-4501-b7f6-8e853e58ca86' };
      logAudit.customer = customer;

      const customerCollection: ICustomer[] = [{ id: 'da280165-638b-4501-b7f6-8e853e58ca86' }];
      vitest.spyOn(customerService, 'query').mockReturnValue(of(new HttpResponse({ body: customerCollection })));
      const additionalCustomers = [customer];
      const expectedCollection: ICustomer[] = [...additionalCustomers, ...customerCollection];
      vitest.spyOn(customerService, 'addCustomerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ logAudit });
      comp.ngOnInit();

      expect(customerService.query).toHaveBeenCalled();
      expect(customerService.addCustomerToCollectionIfMissing).toHaveBeenCalledWith(
        customerCollection,
        ...additionalCustomers.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.customersSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const logAudit: ILogAudit = { id: 'f5e5d37d-e689-46a9-ae4c-92ac59e96ef3' };
      const customer: ICustomer = { id: 'da280165-638b-4501-b7f6-8e853e58ca86' };
      logAudit.customer = customer;

      activatedRoute.data = of({ logAudit });
      comp.ngOnInit();

      expect(comp.customersSharedCollection()).toContainEqual(customer);
      expect(comp.logAudit).toEqual(logAudit);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<ILogAudit>();
      const logAudit = { id: '71eef2e7-cb01-4349-bad7-c9a369beb19a' };
      vitest.spyOn(logAuditFormService, 'getLogAudit').mockReturnValue(logAudit);
      vitest.spyOn(logAuditService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logAudit });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(logAudit);
      saveSubject.complete();

      // THEN
      expect(logAuditFormService.getLogAudit).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(logAuditService.update).toHaveBeenCalledWith(expect.objectContaining(logAudit));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<ILogAudit>();
      const logAudit = { id: '71eef2e7-cb01-4349-bad7-c9a369beb19a' };
      vitest.spyOn(logAuditFormService, 'getLogAudit').mockReturnValue({ id: null });
      vitest.spyOn(logAuditService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logAudit: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(logAudit);
      saveSubject.complete();

      // THEN
      expect(logAuditFormService.getLogAudit).toHaveBeenCalled();
      expect(logAuditService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<ILogAudit>();
      const logAudit = { id: '71eef2e7-cb01-4349-bad7-c9a369beb19a' };
      vitest.spyOn(logAuditService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logAudit });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(logAuditService.update).toHaveBeenCalled();
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
