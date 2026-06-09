import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { ILearningCompetence } from 'app/entities/learning-competence/learning-competence.model';
import { LearningCompetenceService } from 'app/entities/learning-competence/service/learning-competence.service';
import { ILearningResult } from '../learning-result.model';
import { LearningResultService } from '../service/learning-result.service';

import { LearningResultFormService } from './learning-result-form.service';
import { LearningResultUpdate } from './learning-result-update';

describe('LearningResult Management Update Component', () => {
  let comp: LearningResultUpdate;
  let fixture: ComponentFixture<LearningResultUpdate>;
  let activatedRoute: ActivatedRoute;
  let learningResultFormService: LearningResultFormService;
  let learningResultService: LearningResultService;
  let learningCompetenceService: LearningCompetenceService;

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

    fixture = TestBed.createComponent(LearningResultUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    learningResultFormService = TestBed.inject(LearningResultFormService);
    learningResultService = TestBed.inject(LearningResultService);
    learningCompetenceService = TestBed.inject(LearningCompetenceService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call LearningCompetence query and add missing value', () => {
      const learningResult: ILearningResult = { id: '18957aee-fabd-42ae-ac8b-2f943a81490c' };
      const learningCompetence: ILearningCompetence = { id: '67a3ee40-7a88-4800-b512-8818586690b5' };
      learningResult.learningCompetence = learningCompetence;

      const learningCompetenceCollection: ILearningCompetence[] = [{ id: '67a3ee40-7a88-4800-b512-8818586690b5' }];
      vitest.spyOn(learningCompetenceService, 'query').mockReturnValue(of(new HttpResponse({ body: learningCompetenceCollection })));
      const additionalLearningCompetences = [learningCompetence];
      const expectedCollection: ILearningCompetence[] = [...additionalLearningCompetences, ...learningCompetenceCollection];
      vitest.spyOn(learningCompetenceService, 'addLearningCompetenceToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ learningResult });
      comp.ngOnInit();

      expect(learningCompetenceService.query).toHaveBeenCalled();
      expect(learningCompetenceService.addLearningCompetenceToCollectionIfMissing).toHaveBeenCalledWith(
        learningCompetenceCollection,
        ...additionalLearningCompetences.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.learningCompetencesSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const learningResult: ILearningResult = { id: '18957aee-fabd-42ae-ac8b-2f943a81490c' };
      const learningCompetence: ILearningCompetence = { id: '67a3ee40-7a88-4800-b512-8818586690b5' };
      learningResult.learningCompetence = learningCompetence;

      activatedRoute.data = of({ learningResult });
      comp.ngOnInit();

      expect(comp.learningCompetencesSharedCollection()).toContainEqual(learningCompetence);
      expect(comp.learningResult).toEqual(learningResult);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<ILearningResult>();
      const learningResult = { id: '3df09e7d-3257-43f7-9cef-54f68c48c0ac' };
      vitest.spyOn(learningResultFormService, 'getLearningResult').mockReturnValue(learningResult);
      vitest.spyOn(learningResultService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ learningResult });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(learningResult);
      saveSubject.complete();

      // THEN
      expect(learningResultFormService.getLearningResult).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(learningResultService.update).toHaveBeenCalledWith(expect.objectContaining(learningResult));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<ILearningResult>();
      const learningResult = { id: '3df09e7d-3257-43f7-9cef-54f68c48c0ac' };
      vitest.spyOn(learningResultFormService, 'getLearningResult').mockReturnValue({ id: null });
      vitest.spyOn(learningResultService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ learningResult: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(learningResult);
      saveSubject.complete();

      // THEN
      expect(learningResultFormService.getLearningResult).toHaveBeenCalled();
      expect(learningResultService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<ILearningResult>();
      const learningResult = { id: '3df09e7d-3257-43f7-9cef-54f68c48c0ac' };
      vitest.spyOn(learningResultService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ learningResult });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(learningResultService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareLearningCompetence', () => {
      it('should forward to learningCompetenceService', () => {
        const entity = { id: '67a3ee40-7a88-4800-b512-8818586690b5' };
        const entity2 = { id: '3aea7988-06c6-469f-ac06-f7b3b58ed0b7' };
        vitest.spyOn(learningCompetenceService, 'compareLearningCompetence');
        comp.compareLearningCompetence(entity, entity2);
        expect(learningCompetenceService.compareLearningCompetence).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
