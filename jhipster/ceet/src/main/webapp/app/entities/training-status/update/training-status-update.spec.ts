import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { TrainingStatusService } from '../service/training-status.service';
import { ITrainingStatus } from '../training-status.model';

import { TrainingStatusFormService } from './training-status-form.service';
import { TrainingStatusUpdate } from './training-status-update';

describe('TrainingStatus Management Update Component', () => {
  let comp: TrainingStatusUpdate;
  let fixture: ComponentFixture<TrainingStatusUpdate>;
  let activatedRoute: ActivatedRoute;
  let trainingStatusFormService: TrainingStatusFormService;
  let trainingStatusService: TrainingStatusService;

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

    fixture = TestBed.createComponent(TrainingStatusUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    trainingStatusFormService = TestBed.inject(TrainingStatusFormService);
    trainingStatusService = TestBed.inject(TrainingStatusService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const trainingStatus: ITrainingStatus = { id: 'd8ce37b3-f820-49e1-980b-7132772e61a7' };

      activatedRoute.data = of({ trainingStatus });
      comp.ngOnInit();

      expect(comp.trainingStatus).toEqual(trainingStatus);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<ITrainingStatus>();
      const trainingStatus = { id: '053bf031-a284-46fd-8586-1a656a154cf3' };
      vitest.spyOn(trainingStatusFormService, 'getTrainingStatus').mockReturnValue(trainingStatus);
      vitest.spyOn(trainingStatusService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ trainingStatus });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(trainingStatus);
      saveSubject.complete();

      // THEN
      expect(trainingStatusFormService.getTrainingStatus).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(trainingStatusService.update).toHaveBeenCalledWith(expect.objectContaining(trainingStatus));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<ITrainingStatus>();
      const trainingStatus = { id: '053bf031-a284-46fd-8586-1a656a154cf3' };
      vitest.spyOn(trainingStatusFormService, 'getTrainingStatus').mockReturnValue({ id: null });
      vitest.spyOn(trainingStatusService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ trainingStatus: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(trainingStatus);
      saveSubject.complete();

      // THEN
      expect(trainingStatusFormService.getTrainingStatus).toHaveBeenCalled();
      expect(trainingStatusService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<ITrainingStatus>();
      const trainingStatus = { id: '053bf031-a284-46fd-8586-1a656a154cf3' };
      vitest.spyOn(trainingStatusService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ trainingStatus });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(trainingStatusService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
