import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { ICurrentQuarter } from 'app/entities/current-quarter/current-quarter.model';
import { CurrentQuarterService } from 'app/entities/current-quarter/service/current-quarter.service';
import { IScheduleVersion } from '../schedule-version.model';
import { ScheduleVersionService } from '../service/schedule-version.service';

import { ScheduleVersionFormService } from './schedule-version-form.service';
import { ScheduleVersionUpdate } from './schedule-version-update';

describe('ScheduleVersion Management Update Component', () => {
  let comp: ScheduleVersionUpdate;
  let fixture: ComponentFixture<ScheduleVersionUpdate>;
  let activatedRoute: ActivatedRoute;
  let scheduleVersionFormService: ScheduleVersionFormService;
  let scheduleVersionService: ScheduleVersionService;
  let currentQuarterService: CurrentQuarterService;

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

    fixture = TestBed.createComponent(ScheduleVersionUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    scheduleVersionFormService = TestBed.inject(ScheduleVersionFormService);
    scheduleVersionService = TestBed.inject(ScheduleVersionService);
    currentQuarterService = TestBed.inject(CurrentQuarterService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call CurrentQuarter query and add missing value', () => {
      const scheduleVersion: IScheduleVersion = { id: 'a7abaf4d-38ad-4254-b144-1421e43d3397' };
      const currentQuarter: ICurrentQuarter = { id: '0ed02114-2749-41f7-9a38-0f3348269a95' };
      scheduleVersion.currentQuarter = currentQuarter;

      const currentQuarterCollection: ICurrentQuarter[] = [{ id: '0ed02114-2749-41f7-9a38-0f3348269a95' }];
      vitest.spyOn(currentQuarterService, 'query').mockReturnValue(of(new HttpResponse({ body: currentQuarterCollection })));
      const additionalCurrentQuarters = [currentQuarter];
      const expectedCollection: ICurrentQuarter[] = [...additionalCurrentQuarters, ...currentQuarterCollection];
      vitest.spyOn(currentQuarterService, 'addCurrentQuarterToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ scheduleVersion });
      comp.ngOnInit();

      expect(currentQuarterService.query).toHaveBeenCalled();
      expect(currentQuarterService.addCurrentQuarterToCollectionIfMissing).toHaveBeenCalledWith(
        currentQuarterCollection,
        ...additionalCurrentQuarters.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.currentQuartersSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const scheduleVersion: IScheduleVersion = { id: 'a7abaf4d-38ad-4254-b144-1421e43d3397' };
      const currentQuarter: ICurrentQuarter = { id: '0ed02114-2749-41f7-9a38-0f3348269a95' };
      scheduleVersion.currentQuarter = currentQuarter;

      activatedRoute.data = of({ scheduleVersion });
      comp.ngOnInit();

      expect(comp.currentQuartersSharedCollection()).toContainEqual(currentQuarter);
      expect(comp.scheduleVersion).toEqual(scheduleVersion);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IScheduleVersion>();
      const scheduleVersion = { id: '92e0f35b-04d9-47d7-9946-bfa57a73f086' };
      vitest.spyOn(scheduleVersionFormService, 'getScheduleVersion').mockReturnValue(scheduleVersion);
      vitest.spyOn(scheduleVersionService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ scheduleVersion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(scheduleVersion);
      saveSubject.complete();

      // THEN
      expect(scheduleVersionFormService.getScheduleVersion).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(scheduleVersionService.update).toHaveBeenCalledWith(expect.objectContaining(scheduleVersion));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IScheduleVersion>();
      const scheduleVersion = { id: '92e0f35b-04d9-47d7-9946-bfa57a73f086' };
      vitest.spyOn(scheduleVersionFormService, 'getScheduleVersion').mockReturnValue({ id: null });
      vitest.spyOn(scheduleVersionService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ scheduleVersion: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(scheduleVersion);
      saveSubject.complete();

      // THEN
      expect(scheduleVersionFormService.getScheduleVersion).toHaveBeenCalled();
      expect(scheduleVersionService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IScheduleVersion>();
      const scheduleVersion = { id: '92e0f35b-04d9-47d7-9946-bfa57a73f086' };
      vitest.spyOn(scheduleVersionService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ scheduleVersion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(scheduleVersionService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCurrentQuarter', () => {
      it('should forward to currentQuarterService', () => {
        const entity = { id: '0ed02114-2749-41f7-9a38-0f3348269a95' };
        const entity2 = { id: '4af0f48b-9729-4737-a11e-246ced312d2f' };
        vitest.spyOn(currentQuarterService, 'compareCurrentQuarter');
        comp.compareCurrentQuarter(entity, entity2);
        expect(currentQuarterService.compareCurrentQuarter).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
