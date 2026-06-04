import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { TrainingProgramService } from 'app/entities/training-program/service/training-program.service';
import { ITrainingProgram } from 'app/entities/training-program/training-program.model';
import { ILearningCompetence } from '../learning-competence.model';
import { LearningCompetenceService } from '../service/learning-competence.service';

import { LearningCompetenceFormService } from './learning-competence-form.service';
import { LearningCompetenceUpdate } from './learning-competence-update';

describe('LearningCompetence Management Update Component', () => {
  let comp: LearningCompetenceUpdate;
  let fixture: ComponentFixture<LearningCompetenceUpdate>;
  let activatedRoute: ActivatedRoute;
  let learningCompetenceFormService: LearningCompetenceFormService;
  let learningCompetenceService: LearningCompetenceService;
  let trainingProgramService: TrainingProgramService;

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

    fixture = TestBed.createComponent(LearningCompetenceUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    learningCompetenceFormService = TestBed.inject(LearningCompetenceFormService);
    learningCompetenceService = TestBed.inject(LearningCompetenceService);
    trainingProgramService = TestBed.inject(TrainingProgramService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call TrainingProgram query and add missing value', () => {
      const learningCompetence: ILearningCompetence = { id: '3aea7988-06c6-469f-ac06-f7b3b58ed0b7' };
      const trainingProgram: ITrainingProgram = { id: 'e35ca12a-dfa0-4f9c-9ffb-b83e56d621c3' };
      learningCompetence.trainingProgram = trainingProgram;

      const trainingProgramCollection: ITrainingProgram[] = [{ id: 'e35ca12a-dfa0-4f9c-9ffb-b83e56d621c3' }];
      vitest.spyOn(trainingProgramService, 'query').mockReturnValue(of(new HttpResponse({ body: trainingProgramCollection })));
      const additionalTrainingPrograms = [trainingProgram];
      const expectedCollection: ITrainingProgram[] = [...additionalTrainingPrograms, ...trainingProgramCollection];
      vitest.spyOn(trainingProgramService, 'addTrainingProgramToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ learningCompetence });
      comp.ngOnInit();

      expect(trainingProgramService.query).toHaveBeenCalled();
      expect(trainingProgramService.addTrainingProgramToCollectionIfMissing).toHaveBeenCalledWith(
        trainingProgramCollection,
        ...additionalTrainingPrograms.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.trainingProgramsSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const learningCompetence: ILearningCompetence = { id: '3aea7988-06c6-469f-ac06-f7b3b58ed0b7' };
      const trainingProgram: ITrainingProgram = { id: 'e35ca12a-dfa0-4f9c-9ffb-b83e56d621c3' };
      learningCompetence.trainingProgram = trainingProgram;

      activatedRoute.data = of({ learningCompetence });
      comp.ngOnInit();

      expect(comp.trainingProgramsSharedCollection()).toContainEqual(trainingProgram);
      expect(comp.learningCompetence).toEqual(learningCompetence);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<ILearningCompetence>();
      const learningCompetence = { id: '67a3ee40-7a88-4800-b512-8818586690b5' };
      vitest.spyOn(learningCompetenceFormService, 'getLearningCompetence').mockReturnValue(learningCompetence);
      vitest.spyOn(learningCompetenceService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ learningCompetence });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(learningCompetence);
      saveSubject.complete();

      // THEN
      expect(learningCompetenceFormService.getLearningCompetence).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(learningCompetenceService.update).toHaveBeenCalledWith(expect.objectContaining(learningCompetence));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<ILearningCompetence>();
      const learningCompetence = { id: '67a3ee40-7a88-4800-b512-8818586690b5' };
      vitest.spyOn(learningCompetenceFormService, 'getLearningCompetence').mockReturnValue({ id: null });
      vitest.spyOn(learningCompetenceService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ learningCompetence: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(learningCompetence);
      saveSubject.complete();

      // THEN
      expect(learningCompetenceFormService.getLearningCompetence).toHaveBeenCalled();
      expect(learningCompetenceService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<ILearningCompetence>();
      const learningCompetence = { id: '67a3ee40-7a88-4800-b512-8818586690b5' };
      vitest.spyOn(learningCompetenceService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ learningCompetence });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(learningCompetenceService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTrainingProgram', () => {
      it('should forward to trainingProgramService', () => {
        const entity = { id: 'e35ca12a-dfa0-4f9c-9ffb-b83e56d621c3' };
        const entity2 = { id: '7fba35d4-4d72-4e17-b4fd-ec279ba682a9' };
        vitest.spyOn(trainingProgramService, 'compareTrainingProgram');
        comp.compareTrainingProgram(entity, entity2);
        expect(trainingProgramService.compareTrainingProgram).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
