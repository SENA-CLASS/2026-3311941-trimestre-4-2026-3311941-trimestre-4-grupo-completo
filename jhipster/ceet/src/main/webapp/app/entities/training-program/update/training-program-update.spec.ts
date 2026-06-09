import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { ILevelEducation } from 'app/entities/level-education/level-education.model';
import { LevelEducationService } from 'app/entities/level-education/service/level-education.service';
import { TrainingProgramService } from '../service/training-program.service';
import { ITrainingProgram } from '../training-program.model';

import { TrainingProgramFormService } from './training-program-form.service';
import { TrainingProgramUpdate } from './training-program-update';

describe('TrainingProgram Management Update Component', () => {
  let comp: TrainingProgramUpdate;
  let fixture: ComponentFixture<TrainingProgramUpdate>;
  let activatedRoute: ActivatedRoute;
  let trainingProgramFormService: TrainingProgramFormService;
  let trainingProgramService: TrainingProgramService;
  let levelEducationService: LevelEducationService;

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

    fixture = TestBed.createComponent(TrainingProgramUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    trainingProgramFormService = TestBed.inject(TrainingProgramFormService);
    trainingProgramService = TestBed.inject(TrainingProgramService);
    levelEducationService = TestBed.inject(LevelEducationService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call LevelEducation query and add missing value', () => {
      const trainingProgram: ITrainingProgram = { id: '7fba35d4-4d72-4e17-b4fd-ec279ba682a9' };
      const levelEducation: ILevelEducation = { id: '815b1471-c41c-4cfe-a7d8-56ff13b64510' };
      trainingProgram.levelEducation = levelEducation;

      const levelEducationCollection: ILevelEducation[] = [{ id: '815b1471-c41c-4cfe-a7d8-56ff13b64510' }];
      vitest.spyOn(levelEducationService, 'query').mockReturnValue(of(new HttpResponse({ body: levelEducationCollection })));
      const additionalLevelEducations = [levelEducation];
      const expectedCollection: ILevelEducation[] = [...additionalLevelEducations, ...levelEducationCollection];
      vitest.spyOn(levelEducationService, 'addLevelEducationToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ trainingProgram });
      comp.ngOnInit();

      expect(levelEducationService.query).toHaveBeenCalled();
      expect(levelEducationService.addLevelEducationToCollectionIfMissing).toHaveBeenCalledWith(
        levelEducationCollection,
        ...additionalLevelEducations.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.levelEducationsSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const trainingProgram: ITrainingProgram = { id: '7fba35d4-4d72-4e17-b4fd-ec279ba682a9' };
      const levelEducation: ILevelEducation = { id: '815b1471-c41c-4cfe-a7d8-56ff13b64510' };
      trainingProgram.levelEducation = levelEducation;

      activatedRoute.data = of({ trainingProgram });
      comp.ngOnInit();

      expect(comp.levelEducationsSharedCollection()).toContainEqual(levelEducation);
      expect(comp.trainingProgram).toEqual(trainingProgram);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<ITrainingProgram>();
      const trainingProgram = { id: 'e35ca12a-dfa0-4f9c-9ffb-b83e56d621c3' };
      vitest.spyOn(trainingProgramFormService, 'getTrainingProgram').mockReturnValue(trainingProgram);
      vitest.spyOn(trainingProgramService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ trainingProgram });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(trainingProgram);
      saveSubject.complete();

      // THEN
      expect(trainingProgramFormService.getTrainingProgram).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(trainingProgramService.update).toHaveBeenCalledWith(expect.objectContaining(trainingProgram));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<ITrainingProgram>();
      const trainingProgram = { id: 'e35ca12a-dfa0-4f9c-9ffb-b83e56d621c3' };
      vitest.spyOn(trainingProgramFormService, 'getTrainingProgram').mockReturnValue({ id: null });
      vitest.spyOn(trainingProgramService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ trainingProgram: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(trainingProgram);
      saveSubject.complete();

      // THEN
      expect(trainingProgramFormService.getTrainingProgram).toHaveBeenCalled();
      expect(trainingProgramService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<ITrainingProgram>();
      const trainingProgram = { id: 'e35ca12a-dfa0-4f9c-9ffb-b83e56d621c3' };
      vitest.spyOn(trainingProgramService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ trainingProgram });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(trainingProgramService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareLevelEducation', () => {
      it('should forward to levelEducationService', () => {
        const entity = { id: '815b1471-c41c-4cfe-a7d8-56ff13b64510' };
        const entity2 = { id: 'da387bdf-5e02-4940-8409-2be6a4f3a50c' };
        vitest.spyOn(levelEducationService, 'compareLevelEducation');
        comp.compareLevelEducation(entity, entity2);
        expect(levelEducationService.compareLevelEducation).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
