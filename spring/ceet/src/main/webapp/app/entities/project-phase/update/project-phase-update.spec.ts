import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { IProject } from 'app/entities/project/project.model';
import { ProjectService } from 'app/entities/project/service/project.service';
import { IProjectPhase } from '../project-phase.model';
import { ProjectPhaseService } from '../service/project-phase.service';

import { ProjectPhaseFormService } from './project-phase-form.service';
import { ProjectPhaseUpdate } from './project-phase-update';

describe('ProjectPhase Management Update Component', () => {
  let comp: ProjectPhaseUpdate;
  let fixture: ComponentFixture<ProjectPhaseUpdate>;
  let activatedRoute: ActivatedRoute;
  let projectPhaseFormService: ProjectPhaseFormService;
  let projectPhaseService: ProjectPhaseService;
  let projectService: ProjectService;

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

    fixture = TestBed.createComponent(ProjectPhaseUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    projectPhaseFormService = TestBed.inject(ProjectPhaseFormService);
    projectPhaseService = TestBed.inject(ProjectPhaseService);
    projectService = TestBed.inject(ProjectService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Project query and add missing value', () => {
      const projectPhase: IProjectPhase = { id: 'f66f01f6-089b-45fa-8a8f-13705ed76a37' };
      const project: IProject = { id: '517762c3-0447-46f7-b25c-62db5ed7b0aa' };
      projectPhase.project = project;

      const projectCollection: IProject[] = [{ id: '517762c3-0447-46f7-b25c-62db5ed7b0aa' }];
      vitest.spyOn(projectService, 'query').mockReturnValue(of(new HttpResponse({ body: projectCollection })));
      const additionalProjects = [project];
      const expectedCollection: IProject[] = [...additionalProjects, ...projectCollection];
      vitest.spyOn(projectService, 'addProjectToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ projectPhase });
      comp.ngOnInit();

      expect(projectService.query).toHaveBeenCalled();
      expect(projectService.addProjectToCollectionIfMissing).toHaveBeenCalledWith(
        projectCollection,
        ...additionalProjects.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.projectsSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const projectPhase: IProjectPhase = { id: 'f66f01f6-089b-45fa-8a8f-13705ed76a37' };
      const project: IProject = { id: '517762c3-0447-46f7-b25c-62db5ed7b0aa' };
      projectPhase.project = project;

      activatedRoute.data = of({ projectPhase });
      comp.ngOnInit();

      expect(comp.projectsSharedCollection()).toContainEqual(project);
      expect(comp.projectPhase).toEqual(projectPhase);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IProjectPhase>();
      const projectPhase = { id: 'd6306830-4cd7-49d4-ae49-a650a81278f2' };
      vitest.spyOn(projectPhaseFormService, 'getProjectPhase').mockReturnValue(projectPhase);
      vitest.spyOn(projectPhaseService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ projectPhase });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(projectPhase);
      saveSubject.complete();

      // THEN
      expect(projectPhaseFormService.getProjectPhase).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(projectPhaseService.update).toHaveBeenCalledWith(expect.objectContaining(projectPhase));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IProjectPhase>();
      const projectPhase = { id: 'd6306830-4cd7-49d4-ae49-a650a81278f2' };
      vitest.spyOn(projectPhaseFormService, 'getProjectPhase').mockReturnValue({ id: null });
      vitest.spyOn(projectPhaseService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ projectPhase: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(projectPhase);
      saveSubject.complete();

      // THEN
      expect(projectPhaseFormService.getProjectPhase).toHaveBeenCalled();
      expect(projectPhaseService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IProjectPhase>();
      const projectPhase = { id: 'd6306830-4cd7-49d4-ae49-a650a81278f2' };
      vitest.spyOn(projectPhaseService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ projectPhase });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(projectPhaseService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareProject', () => {
      it('should forward to projectService', () => {
        const entity = { id: '517762c3-0447-46f7-b25c-62db5ed7b0aa' };
        const entity2 = { id: '5ff6b3ae-e7f8-4d04-a538-babd8e1e0e80' };
        vitest.spyOn(projectService, 'compareProject');
        comp.compareProject(entity, entity2);
        expect(projectService.compareProject).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
