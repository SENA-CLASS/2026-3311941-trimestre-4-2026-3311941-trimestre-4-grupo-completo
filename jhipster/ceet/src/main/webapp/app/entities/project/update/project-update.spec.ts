import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { TrainingProgramService } from 'app/entities/training-program/service/training-program.service';
import { ITrainingProgram } from 'app/entities/training-program/training-program.model';
import { IProject } from '../project.model';
import { ProjectService } from '../service/project.service';

import { ProjectFormService } from './project-form.service';
import { ProjectUpdate } from './project-update';

describe('Project Management Update Component', () => {
  let comp: ProjectUpdate;
  let fixture: ComponentFixture<ProjectUpdate>;
  let activatedRoute: ActivatedRoute;
  let projectFormService: ProjectFormService;
  let projectService: ProjectService;
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

    fixture = TestBed.createComponent(ProjectUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    projectFormService = TestBed.inject(ProjectFormService);
    projectService = TestBed.inject(ProjectService);
    trainingProgramService = TestBed.inject(TrainingProgramService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call TrainingProgram query and add missing value', () => {
      const project: IProject = { id: '5ff6b3ae-e7f8-4d04-a538-babd8e1e0e80' };
      const trainingProgram: ITrainingProgram = { id: 'e35ca12a-dfa0-4f9c-9ffb-b83e56d621c3' };
      project.trainingProgram = trainingProgram;

      const trainingProgramCollection: ITrainingProgram[] = [{ id: 'e35ca12a-dfa0-4f9c-9ffb-b83e56d621c3' }];
      vitest.spyOn(trainingProgramService, 'query').mockReturnValue(of(new HttpResponse({ body: trainingProgramCollection })));
      const additionalTrainingPrograms = [trainingProgram];
      const expectedCollection: ITrainingProgram[] = [...additionalTrainingPrograms, ...trainingProgramCollection];
      vitest.spyOn(trainingProgramService, 'addTrainingProgramToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ project });
      comp.ngOnInit();

      expect(trainingProgramService.query).toHaveBeenCalled();
      expect(trainingProgramService.addTrainingProgramToCollectionIfMissing).toHaveBeenCalledWith(
        trainingProgramCollection,
        ...additionalTrainingPrograms.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.trainingProgramsSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const project: IProject = { id: '5ff6b3ae-e7f8-4d04-a538-babd8e1e0e80' };
      const trainingProgram: ITrainingProgram = { id: 'e35ca12a-dfa0-4f9c-9ffb-b83e56d621c3' };
      project.trainingProgram = trainingProgram;

      activatedRoute.data = of({ project });
      comp.ngOnInit();

      expect(comp.trainingProgramsSharedCollection()).toContainEqual(trainingProgram);
      expect(comp.project).toEqual(project);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IProject>();
      const project = { id: '517762c3-0447-46f7-b25c-62db5ed7b0aa' };
      vitest.spyOn(projectFormService, 'getProject').mockReturnValue(project);
      vitest.spyOn(projectService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ project });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(project);
      saveSubject.complete();

      // THEN
      expect(projectFormService.getProject).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(projectService.update).toHaveBeenCalledWith(expect.objectContaining(project));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IProject>();
      const project = { id: '517762c3-0447-46f7-b25c-62db5ed7b0aa' };
      vitest.spyOn(projectFormService, 'getProject').mockReturnValue({ id: null });
      vitest.spyOn(projectService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ project: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(project);
      saveSubject.complete();

      // THEN
      expect(projectFormService.getProject).toHaveBeenCalled();
      expect(projectService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IProject>();
      const project = { id: '517762c3-0447-46f7-b25c-62db5ed7b0aa' };
      vitest.spyOn(projectService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ project });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(projectService.update).toHaveBeenCalled();
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
