import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { IPlanning } from '../planning.model';
import { PlanningService } from '../service/planning.service';

import { PlanningFormService } from './planning-form.service';
import { PlanningUpdate } from './planning-update';

describe('Planning Management Update Component', () => {
  let comp: PlanningUpdate;
  let fixture: ComponentFixture<PlanningUpdate>;
  let activatedRoute: ActivatedRoute;
  let planningFormService: PlanningFormService;
  let planningService: PlanningService;

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

    fixture = TestBed.createComponent(PlanningUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    planningFormService = TestBed.inject(PlanningFormService);
    planningService = TestBed.inject(PlanningService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const planning: IPlanning = { id: 'a2a09b2c-8b16-4e97-9d64-b8ae8eae8653' };

      activatedRoute.data = of({ planning });
      comp.ngOnInit();

      expect(comp.planning).toEqual(planning);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IPlanning>();
      const planning = { id: '3c7d8900-e060-455b-8080-b0f040d98cdb' };
      vitest.spyOn(planningFormService, 'getPlanning').mockReturnValue(planning);
      vitest.spyOn(planningService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ planning });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(planning);
      saveSubject.complete();

      // THEN
      expect(planningFormService.getPlanning).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(planningService.update).toHaveBeenCalledWith(expect.objectContaining(planning));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IPlanning>();
      const planning = { id: '3c7d8900-e060-455b-8080-b0f040d98cdb' };
      vitest.spyOn(planningFormService, 'getPlanning').mockReturnValue({ id: null });
      vitest.spyOn(planningService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ planning: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(planning);
      saveSubject.complete();

      // THEN
      expect(planningFormService.getPlanning).toHaveBeenCalled();
      expect(planningService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IPlanning>();
      const planning = { id: '3c7d8900-e060-455b-8080-b0f040d98cdb' };
      vitest.spyOn(planningService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ planning });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(planningService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
