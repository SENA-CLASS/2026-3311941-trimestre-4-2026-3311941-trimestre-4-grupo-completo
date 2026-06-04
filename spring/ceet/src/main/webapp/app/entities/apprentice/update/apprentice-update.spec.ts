import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { ICustomer } from 'app/entities/customer/customer.model';
import { CustomerService } from 'app/entities/customer/service/customer.service';
import { TrainingStatusService } from 'app/entities/training-status/service/training-status.service';
import { ITrainingStatus } from 'app/entities/training-status/training-status.model';
import { IApprentice } from '../apprentice.model';
import { ApprenticeService } from '../service/apprentice.service';

import { ApprenticeFormService } from './apprentice-form.service';
import { ApprenticeUpdate } from './apprentice-update';

describe('Apprentice Management Update Component', () => {
  let comp: ApprenticeUpdate;
  let fixture: ComponentFixture<ApprenticeUpdate>;
  let activatedRoute: ActivatedRoute;
  let apprenticeFormService: ApprenticeFormService;
  let apprenticeService: ApprenticeService;
  let customerService: CustomerService;
  let trainingStatusService: TrainingStatusService;
  let courseService: CourseService;

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

    fixture = TestBed.createComponent(ApprenticeUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    apprenticeFormService = TestBed.inject(ApprenticeFormService);
    apprenticeService = TestBed.inject(ApprenticeService);
    customerService = TestBed.inject(CustomerService);
    trainingStatusService = TestBed.inject(TrainingStatusService);
    courseService = TestBed.inject(CourseService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Customer query and add missing value', () => {
      const apprentice: IApprentice = { id: 'f1537a32-8765-4478-a7fa-674e3f6ae8c1' };
      const customer: ICustomer = { id: 'da280165-638b-4501-b7f6-8e853e58ca86' };
      apprentice.customer = customer;

      const customerCollection: ICustomer[] = [{ id: 'da280165-638b-4501-b7f6-8e853e58ca86' }];
      vitest.spyOn(customerService, 'query').mockReturnValue(of(new HttpResponse({ body: customerCollection })));
      const additionalCustomers = [customer];
      const expectedCollection: ICustomer[] = [...additionalCustomers, ...customerCollection];
      vitest.spyOn(customerService, 'addCustomerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ apprentice });
      comp.ngOnInit();

      expect(customerService.query).toHaveBeenCalled();
      expect(customerService.addCustomerToCollectionIfMissing).toHaveBeenCalledWith(
        customerCollection,
        ...additionalCustomers.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.customersSharedCollection()).toEqual(expectedCollection);
    });

    it('should call TrainingStatus query and add missing value', () => {
      const apprentice: IApprentice = { id: 'f1537a32-8765-4478-a7fa-674e3f6ae8c1' };
      const trainingStatus: ITrainingStatus = { id: '053bf031-a284-46fd-8586-1a656a154cf3' };
      apprentice.trainingStatus = trainingStatus;

      const trainingStatusCollection: ITrainingStatus[] = [{ id: '053bf031-a284-46fd-8586-1a656a154cf3' }];
      vitest.spyOn(trainingStatusService, 'query').mockReturnValue(of(new HttpResponse({ body: trainingStatusCollection })));
      const additionalTrainingStatuses = [trainingStatus];
      const expectedCollection: ITrainingStatus[] = [...additionalTrainingStatuses, ...trainingStatusCollection];
      vitest.spyOn(trainingStatusService, 'addTrainingStatusToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ apprentice });
      comp.ngOnInit();

      expect(trainingStatusService.query).toHaveBeenCalled();
      expect(trainingStatusService.addTrainingStatusToCollectionIfMissing).toHaveBeenCalledWith(
        trainingStatusCollection,
        ...additionalTrainingStatuses.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.trainingStatusesSharedCollection()).toEqual(expectedCollection);
    });

    it('should call Course query and add missing value', () => {
      const apprentice: IApprentice = { id: 'f1537a32-8765-4478-a7fa-674e3f6ae8c1' };
      const course: ICourse = { id: '111fabe5-d417-4bae-ac6e-f3e3a988982f' };
      apprentice.course = course;

      const courseCollection: ICourse[] = [{ id: '111fabe5-d417-4bae-ac6e-f3e3a988982f' }];
      vitest.spyOn(courseService, 'query').mockReturnValue(of(new HttpResponse({ body: courseCollection })));
      const additionalCourses = [course];
      const expectedCollection: ICourse[] = [...additionalCourses, ...courseCollection];
      vitest.spyOn(courseService, 'addCourseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ apprentice });
      comp.ngOnInit();

      expect(courseService.query).toHaveBeenCalled();
      expect(courseService.addCourseToCollectionIfMissing).toHaveBeenCalledWith(
        courseCollection,
        ...additionalCourses.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.coursesSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const apprentice: IApprentice = { id: 'f1537a32-8765-4478-a7fa-674e3f6ae8c1' };
      const customer: ICustomer = { id: 'da280165-638b-4501-b7f6-8e853e58ca86' };
      apprentice.customer = customer;
      const trainingStatus: ITrainingStatus = { id: '053bf031-a284-46fd-8586-1a656a154cf3' };
      apprentice.trainingStatus = trainingStatus;
      const course: ICourse = { id: '111fabe5-d417-4bae-ac6e-f3e3a988982f' };
      apprentice.course = course;

      activatedRoute.data = of({ apprentice });
      comp.ngOnInit();

      expect(comp.customersSharedCollection()).toContainEqual(customer);
      expect(comp.trainingStatusesSharedCollection()).toContainEqual(trainingStatus);
      expect(comp.coursesSharedCollection()).toContainEqual(course);
      expect(comp.apprentice).toEqual(apprentice);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IApprentice>();
      const apprentice = { id: '8681ca6b-c1b7-4e43-96b8-c3fc96b48213' };
      vitest.spyOn(apprenticeFormService, 'getApprentice').mockReturnValue(apprentice);
      vitest.spyOn(apprenticeService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ apprentice });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(apprentice);
      saveSubject.complete();

      // THEN
      expect(apprenticeFormService.getApprentice).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(apprenticeService.update).toHaveBeenCalledWith(expect.objectContaining(apprentice));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IApprentice>();
      const apprentice = { id: '8681ca6b-c1b7-4e43-96b8-c3fc96b48213' };
      vitest.spyOn(apprenticeFormService, 'getApprentice').mockReturnValue({ id: null });
      vitest.spyOn(apprenticeService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ apprentice: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(apprentice);
      saveSubject.complete();

      // THEN
      expect(apprenticeFormService.getApprentice).toHaveBeenCalled();
      expect(apprenticeService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IApprentice>();
      const apprentice = { id: '8681ca6b-c1b7-4e43-96b8-c3fc96b48213' };
      vitest.spyOn(apprenticeService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ apprentice });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(apprenticeService.update).toHaveBeenCalled();
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

    describe('compareTrainingStatus', () => {
      it('should forward to trainingStatusService', () => {
        const entity = { id: '053bf031-a284-46fd-8586-1a656a154cf3' };
        const entity2 = { id: 'd8ce37b3-f820-49e1-980b-7132772e61a7' };
        vitest.spyOn(trainingStatusService, 'compareTrainingStatus');
        comp.compareTrainingStatus(entity, entity2);
        expect(trainingStatusService.compareTrainingStatus).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCourse', () => {
      it('should forward to courseService', () => {
        const entity = { id: '111fabe5-d417-4bae-ac6e-f3e3a988982f' };
        const entity2 = { id: '85e942c3-e3e8-4da2-bd51-1e7f78f98fe6' };
        vitest.spyOn(courseService, 'compareCourse');
        comp.compareCourse(entity, entity2);
        expect(courseService.compareCourse).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
