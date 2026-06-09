import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { ICustomer } from 'app/entities/customer/customer.model';
import { CustomerService } from 'app/entities/customer/service/customer.service';
import { IProjectGroup } from 'app/entities/project-group/project-group.model';
import { ProjectGroupService } from 'app/entities/project-group/service/project-group.service';
import { IGeneralObservation } from '../general-observation.model';
import { GeneralObservationService } from '../service/general-observation.service';

import { GeneralObservationFormService } from './general-observation-form.service';
import { GeneralObservationUpdate } from './general-observation-update';

describe('GeneralObservation Management Update Component', () => {
  let comp: GeneralObservationUpdate;
  let fixture: ComponentFixture<GeneralObservationUpdate>;
  let activatedRoute: ActivatedRoute;
  let generalObservationFormService: GeneralObservationFormService;
  let generalObservationService: GeneralObservationService;
  let projectGroupService: ProjectGroupService;
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

    fixture = TestBed.createComponent(GeneralObservationUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    generalObservationFormService = TestBed.inject(GeneralObservationFormService);
    generalObservationService = TestBed.inject(GeneralObservationService);
    projectGroupService = TestBed.inject(ProjectGroupService);
    customerService = TestBed.inject(CustomerService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call ProjectGroup query and add missing value', () => {
      const generalObservation: IGeneralObservation = { id: '19f579cb-3eb3-4f57-b243-9eea32539920' };
      const projectGroup: IProjectGroup = { id: '09699592-062b-40e5-aa51-6ed07e22b997' };
      generalObservation.projectGroup = projectGroup;

      const projectGroupCollection: IProjectGroup[] = [{ id: '09699592-062b-40e5-aa51-6ed07e22b997' }];
      vitest.spyOn(projectGroupService, 'query').mockReturnValue(of(new HttpResponse({ body: projectGroupCollection })));
      const additionalProjectGroups = [projectGroup];
      const expectedCollection: IProjectGroup[] = [...additionalProjectGroups, ...projectGroupCollection];
      vitest.spyOn(projectGroupService, 'addProjectGroupToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ generalObservation });
      comp.ngOnInit();

      expect(projectGroupService.query).toHaveBeenCalled();
      expect(projectGroupService.addProjectGroupToCollectionIfMissing).toHaveBeenCalledWith(
        projectGroupCollection,
        ...additionalProjectGroups.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.projectGroupsSharedCollection()).toEqual(expectedCollection);
    });

    it('should call Customer query and add missing value', () => {
      const generalObservation: IGeneralObservation = { id: '19f579cb-3eb3-4f57-b243-9eea32539920' };
      const customer: ICustomer = { id: 'da280165-638b-4501-b7f6-8e853e58ca86' };
      generalObservation.customer = customer;

      const customerCollection: ICustomer[] = [{ id: 'da280165-638b-4501-b7f6-8e853e58ca86' }];
      vitest.spyOn(customerService, 'query').mockReturnValue(of(new HttpResponse({ body: customerCollection })));
      const additionalCustomers = [customer];
      const expectedCollection: ICustomer[] = [...additionalCustomers, ...customerCollection];
      vitest.spyOn(customerService, 'addCustomerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ generalObservation });
      comp.ngOnInit();

      expect(customerService.query).toHaveBeenCalled();
      expect(customerService.addCustomerToCollectionIfMissing).toHaveBeenCalledWith(
        customerCollection,
        ...additionalCustomers.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.customersSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const generalObservation: IGeneralObservation = { id: '19f579cb-3eb3-4f57-b243-9eea32539920' };
      const projectGroup: IProjectGroup = { id: '09699592-062b-40e5-aa51-6ed07e22b997' };
      generalObservation.projectGroup = projectGroup;
      const customer: ICustomer = { id: 'da280165-638b-4501-b7f6-8e853e58ca86' };
      generalObservation.customer = customer;

      activatedRoute.data = of({ generalObservation });
      comp.ngOnInit();

      expect(comp.projectGroupsSharedCollection()).toContainEqual(projectGroup);
      expect(comp.customersSharedCollection()).toContainEqual(customer);
      expect(comp.generalObservation).toEqual(generalObservation);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IGeneralObservation>();
      const generalObservation = { id: '43fc97fc-e912-46cc-a597-4921483b760d' };
      vitest.spyOn(generalObservationFormService, 'getGeneralObservation').mockReturnValue(generalObservation);
      vitest.spyOn(generalObservationService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ generalObservation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(generalObservation);
      saveSubject.complete();

      // THEN
      expect(generalObservationFormService.getGeneralObservation).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(generalObservationService.update).toHaveBeenCalledWith(expect.objectContaining(generalObservation));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IGeneralObservation>();
      const generalObservation = { id: '43fc97fc-e912-46cc-a597-4921483b760d' };
      vitest.spyOn(generalObservationFormService, 'getGeneralObservation').mockReturnValue({ id: null });
      vitest.spyOn(generalObservationService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ generalObservation: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(generalObservation);
      saveSubject.complete();

      // THEN
      expect(generalObservationFormService.getGeneralObservation).toHaveBeenCalled();
      expect(generalObservationService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IGeneralObservation>();
      const generalObservation = { id: '43fc97fc-e912-46cc-a597-4921483b760d' };
      vitest.spyOn(generalObservationService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ generalObservation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(generalObservationService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareProjectGroup', () => {
      it('should forward to projectGroupService', () => {
        const entity = { id: '09699592-062b-40e5-aa51-6ed07e22b997' };
        const entity2 = { id: 'e32c8573-0365-4601-97ff-335f74d06785' };
        vitest.spyOn(projectGroupService, 'compareProjectGroup');
        comp.compareProjectGroup(entity, entity2);
        expect(projectGroupService.compareProjectGroup).toHaveBeenCalledWith(entity, entity2);
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
