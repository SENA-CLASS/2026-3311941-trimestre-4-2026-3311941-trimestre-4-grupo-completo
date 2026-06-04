import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { ICustomer } from 'app/entities/customer/customer.model';
import { CustomerService } from 'app/entities/customer/service/customer.service';
import { IGroupResponse } from 'app/entities/group-response/group-response.model';
import { GroupResponseService } from 'app/entities/group-response/service/group-response.service';
import { IObservationResponse } from '../observation-response.model';
import { ObservationResponseService } from '../service/observation-response.service';

import { ObservationResponseFormService } from './observation-response-form.service';
import { ObservationResponseUpdate } from './observation-response-update';

describe('ObservationResponse Management Update Component', () => {
  let comp: ObservationResponseUpdate;
  let fixture: ComponentFixture<ObservationResponseUpdate>;
  let activatedRoute: ActivatedRoute;
  let observationResponseFormService: ObservationResponseFormService;
  let observationResponseService: ObservationResponseService;
  let groupResponseService: GroupResponseService;
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

    fixture = TestBed.createComponent(ObservationResponseUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    observationResponseFormService = TestBed.inject(ObservationResponseFormService);
    observationResponseService = TestBed.inject(ObservationResponseService);
    groupResponseService = TestBed.inject(GroupResponseService);
    customerService = TestBed.inject(CustomerService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call GroupResponse query and add missing value', () => {
      const observationResponse: IObservationResponse = { id: 'dd4dbde6-a955-4c60-99f4-6e3b8c107465' };
      const groupResponse: IGroupResponse = { id: '57b45d23-226e-48e7-93c6-046bd207c9c6' };
      observationResponse.groupResponse = groupResponse;

      const groupResponseCollection: IGroupResponse[] = [{ id: '57b45d23-226e-48e7-93c6-046bd207c9c6' }];
      vitest.spyOn(groupResponseService, 'query').mockReturnValue(of(new HttpResponse({ body: groupResponseCollection })));
      const additionalGroupResponses = [groupResponse];
      const expectedCollection: IGroupResponse[] = [...additionalGroupResponses, ...groupResponseCollection];
      vitest.spyOn(groupResponseService, 'addGroupResponseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ observationResponse });
      comp.ngOnInit();

      expect(groupResponseService.query).toHaveBeenCalled();
      expect(groupResponseService.addGroupResponseToCollectionIfMissing).toHaveBeenCalledWith(
        groupResponseCollection,
        ...additionalGroupResponses.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.groupResponsesSharedCollection()).toEqual(expectedCollection);
    });

    it('should call Customer query and add missing value', () => {
      const observationResponse: IObservationResponse = { id: 'dd4dbde6-a955-4c60-99f4-6e3b8c107465' };
      const customer: ICustomer = { id: 'da280165-638b-4501-b7f6-8e853e58ca86' };
      observationResponse.customer = customer;

      const customerCollection: ICustomer[] = [{ id: 'da280165-638b-4501-b7f6-8e853e58ca86' }];
      vitest.spyOn(customerService, 'query').mockReturnValue(of(new HttpResponse({ body: customerCollection })));
      const additionalCustomers = [customer];
      const expectedCollection: ICustomer[] = [...additionalCustomers, ...customerCollection];
      vitest.spyOn(customerService, 'addCustomerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ observationResponse });
      comp.ngOnInit();

      expect(customerService.query).toHaveBeenCalled();
      expect(customerService.addCustomerToCollectionIfMissing).toHaveBeenCalledWith(
        customerCollection,
        ...additionalCustomers.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.customersSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const observationResponse: IObservationResponse = { id: 'dd4dbde6-a955-4c60-99f4-6e3b8c107465' };
      const groupResponse: IGroupResponse = { id: '57b45d23-226e-48e7-93c6-046bd207c9c6' };
      observationResponse.groupResponse = groupResponse;
      const customer: ICustomer = { id: 'da280165-638b-4501-b7f6-8e853e58ca86' };
      observationResponse.customer = customer;

      activatedRoute.data = of({ observationResponse });
      comp.ngOnInit();

      expect(comp.groupResponsesSharedCollection()).toContainEqual(groupResponse);
      expect(comp.customersSharedCollection()).toContainEqual(customer);
      expect(comp.observationResponse).toEqual(observationResponse);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IObservationResponse>();
      const observationResponse = { id: '4d4f5219-1b15-4afc-b043-9d7c859160bc' };
      vitest.spyOn(observationResponseFormService, 'getObservationResponse').mockReturnValue(observationResponse);
      vitest.spyOn(observationResponseService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ observationResponse });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(observationResponse);
      saveSubject.complete();

      // THEN
      expect(observationResponseFormService.getObservationResponse).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(observationResponseService.update).toHaveBeenCalledWith(expect.objectContaining(observationResponse));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IObservationResponse>();
      const observationResponse = { id: '4d4f5219-1b15-4afc-b043-9d7c859160bc' };
      vitest.spyOn(observationResponseFormService, 'getObservationResponse').mockReturnValue({ id: null });
      vitest.spyOn(observationResponseService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ observationResponse: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(observationResponse);
      saveSubject.complete();

      // THEN
      expect(observationResponseFormService.getObservationResponse).toHaveBeenCalled();
      expect(observationResponseService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IObservationResponse>();
      const observationResponse = { id: '4d4f5219-1b15-4afc-b043-9d7c859160bc' };
      vitest.spyOn(observationResponseService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ observationResponse });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(observationResponseService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareGroupResponse', () => {
      it('should forward to groupResponseService', () => {
        const entity = { id: '57b45d23-226e-48e7-93c6-046bd207c9c6' };
        const entity2 = { id: 'e20ecb71-d9ec-4694-82c9-f26362300c8f' };
        vitest.spyOn(groupResponseService, 'compareGroupResponse');
        comp.compareGroupResponse(entity, entity2);
        expect(groupResponseService.compareGroupResponse).toHaveBeenCalledWith(entity, entity2);
      });
    });

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
