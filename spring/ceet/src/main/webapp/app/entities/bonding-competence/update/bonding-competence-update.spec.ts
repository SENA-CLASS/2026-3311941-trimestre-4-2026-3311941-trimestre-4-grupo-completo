import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { IBondingInstructor } from 'app/entities/bonding-instructor/bonding-instructor.model';
import { BondingInstructorService } from 'app/entities/bonding-instructor/service/bonding-instructor.service';
import { ILearningCompetence } from 'app/entities/learning-competence/learning-competence.model';
import { LearningCompetenceService } from 'app/entities/learning-competence/service/learning-competence.service';
import { IBondingCompetence } from '../bonding-competence.model';
import { BondingCompetenceService } from '../service/bonding-competence.service';

import { BondingCompetenceFormService } from './bonding-competence-form.service';
import { BondingCompetenceUpdate } from './bonding-competence-update';

describe('BondingCompetence Management Update Component', () => {
  let comp: BondingCompetenceUpdate;
  let fixture: ComponentFixture<BondingCompetenceUpdate>;
  let activatedRoute: ActivatedRoute;
  let bondingCompetenceFormService: BondingCompetenceFormService;
  let bondingCompetenceService: BondingCompetenceService;
  let bondingInstructorService: BondingInstructorService;
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

    fixture = TestBed.createComponent(BondingCompetenceUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    bondingCompetenceFormService = TestBed.inject(BondingCompetenceFormService);
    bondingCompetenceService = TestBed.inject(BondingCompetenceService);
    bondingInstructorService = TestBed.inject(BondingInstructorService);
    learningCompetenceService = TestBed.inject(LearningCompetenceService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call BondingInstructor query and add missing value', () => {
      const bondingCompetence: IBondingCompetence = { id: 'cfd7fba8-1477-4385-86e4-1c2abc7aa2a8' };
      const bondingInstructor: IBondingInstructor = { id: 'ab7b6017-edd4-4b72-a00c-30124d1b29e7' };
      bondingCompetence.bondingInstructor = bondingInstructor;

      const bondingInstructorCollection: IBondingInstructor[] = [{ id: 'ab7b6017-edd4-4b72-a00c-30124d1b29e7' }];
      vitest.spyOn(bondingInstructorService, 'query').mockReturnValue(of(new HttpResponse({ body: bondingInstructorCollection })));
      const additionalBondingInstructors = [bondingInstructor];
      const expectedCollection: IBondingInstructor[] = [...additionalBondingInstructors, ...bondingInstructorCollection];
      vitest.spyOn(bondingInstructorService, 'addBondingInstructorToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ bondingCompetence });
      comp.ngOnInit();

      expect(bondingInstructorService.query).toHaveBeenCalled();
      expect(bondingInstructorService.addBondingInstructorToCollectionIfMissing).toHaveBeenCalledWith(
        bondingInstructorCollection,
        ...additionalBondingInstructors.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.bondingInstructorsSharedCollection()).toEqual(expectedCollection);
    });

    it('should call LearningCompetence query and add missing value', () => {
      const bondingCompetence: IBondingCompetence = { id: 'cfd7fba8-1477-4385-86e4-1c2abc7aa2a8' };
      const learningCompetence: ILearningCompetence = { id: '67a3ee40-7a88-4800-b512-8818586690b5' };
      bondingCompetence.learningCompetence = learningCompetence;

      const learningCompetenceCollection: ILearningCompetence[] = [{ id: '67a3ee40-7a88-4800-b512-8818586690b5' }];
      vitest.spyOn(learningCompetenceService, 'query').mockReturnValue(of(new HttpResponse({ body: learningCompetenceCollection })));
      const additionalLearningCompetences = [learningCompetence];
      const expectedCollection: ILearningCompetence[] = [...additionalLearningCompetences, ...learningCompetenceCollection];
      vitest.spyOn(learningCompetenceService, 'addLearningCompetenceToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ bondingCompetence });
      comp.ngOnInit();

      expect(learningCompetenceService.query).toHaveBeenCalled();
      expect(learningCompetenceService.addLearningCompetenceToCollectionIfMissing).toHaveBeenCalledWith(
        learningCompetenceCollection,
        ...additionalLearningCompetences.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.learningCompetencesSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const bondingCompetence: IBondingCompetence = { id: 'cfd7fba8-1477-4385-86e4-1c2abc7aa2a8' };
      const bondingInstructor: IBondingInstructor = { id: 'ab7b6017-edd4-4b72-a00c-30124d1b29e7' };
      bondingCompetence.bondingInstructor = bondingInstructor;
      const learningCompetence: ILearningCompetence = { id: '67a3ee40-7a88-4800-b512-8818586690b5' };
      bondingCompetence.learningCompetence = learningCompetence;

      activatedRoute.data = of({ bondingCompetence });
      comp.ngOnInit();

      expect(comp.bondingInstructorsSharedCollection()).toContainEqual(bondingInstructor);
      expect(comp.learningCompetencesSharedCollection()).toContainEqual(learningCompetence);
      expect(comp.bondingCompetence).toEqual(bondingCompetence);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IBondingCompetence>();
      const bondingCompetence = { id: '5edac464-b367-4167-9068-576bd03056c9' };
      vitest.spyOn(bondingCompetenceFormService, 'getBondingCompetence').mockReturnValue(bondingCompetence);
      vitest.spyOn(bondingCompetenceService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bondingCompetence });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(bondingCompetence);
      saveSubject.complete();

      // THEN
      expect(bondingCompetenceFormService.getBondingCompetence).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(bondingCompetenceService.update).toHaveBeenCalledWith(expect.objectContaining(bondingCompetence));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IBondingCompetence>();
      const bondingCompetence = { id: '5edac464-b367-4167-9068-576bd03056c9' };
      vitest.spyOn(bondingCompetenceFormService, 'getBondingCompetence').mockReturnValue({ id: null });
      vitest.spyOn(bondingCompetenceService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bondingCompetence: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(bondingCompetence);
      saveSubject.complete();

      // THEN
      expect(bondingCompetenceFormService.getBondingCompetence).toHaveBeenCalled();
      expect(bondingCompetenceService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IBondingCompetence>();
      const bondingCompetence = { id: '5edac464-b367-4167-9068-576bd03056c9' };
      vitest.spyOn(bondingCompetenceService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bondingCompetence });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(bondingCompetenceService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareBondingInstructor', () => {
      it('should forward to bondingInstructorService', () => {
        const entity = { id: 'ab7b6017-edd4-4b72-a00c-30124d1b29e7' };
        const entity2 = { id: 'b53dd849-590c-4532-8f92-15e5623948e6' };
        vitest.spyOn(bondingInstructorService, 'compareBondingInstructor');
        comp.compareBondingInstructor(entity, entity2);
        expect(bondingInstructorService.compareBondingInstructor).toHaveBeenCalledWith(entity, entity2);
      });
    });

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
