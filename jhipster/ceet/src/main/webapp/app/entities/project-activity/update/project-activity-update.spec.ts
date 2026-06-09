import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { IProjectPhase } from 'app/entities/project-phase/project-phase.model';
import { ProjectPhaseService } from 'app/entities/project-phase/service/project-phase.service';
import { IProjectActivity } from '../project-activity.model';
import { ProjectActivityService } from '../service/project-activity.service';

import { ProjectActivityFormService } from './project-activity-form.service';
import { ProjectActivityUpdate } from './project-activity-update';

describe('ProjectActivity Management Update Component', () => {
  let comp: ProjectActivityUpdate;
  let fixture: ComponentFixture<ProjectActivityUpdate>;
  let activatedRoute: ActivatedRoute;
  let projectActivityFormService: ProjectActivityFormService;
  let projectActivityService: ProjectActivityService;
  let projectPhaseService: ProjectPhaseService;

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

    fixture = TestBed.createComponent(ProjectActivityUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    projectActivityFormService = TestBed.inject(ProjectActivityFormService);
    projectActivityService = TestBed.inject(ProjectActivityService);
    projectPhaseService = TestBed.inject(ProjectPhaseService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call ProjectPhase query and add missing value', () => {
      const projectActivity: IProjectActivity = { id: '8fcd62e7-dc0e-453c-a593-0e57d65f34de' };
      const projectPhase: IProjectPhase = { id: 'd6306830-4cd7-49d4-ae49-a650a81278f2' };
      projectActivity.projectPhase = projectPhase;

      const projectPhaseCollection: IProjectPhase[] = [{ id: 'd6306830-4cd7-49d4-ae49-a650a81278f2' }];
      vitest.spyOn(projectPhaseService, 'query').mockReturnValue(of(new HttpResponse({ body: projectPhaseCollection })));
      const additionalProjectPhases = [projectPhase];
      const expectedCollection: IProjectPhase[] = [...additionalProjectPhases, ...projectPhaseCollection];
      vitest.spyOn(projectPhaseService, 'addProjectPhaseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ projectActivity });
      comp.ngOnInit();

      expect(projectPhaseService.query).toHaveBeenCalled();
      expect(projectPhaseService.addProjectPhaseToCollectionIfMissing).toHaveBeenCalledWith(
        projectPhaseCollection,
        ...additionalProjectPhases.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.projectPhasesSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const projectActivity: IProjectActivity = { id: '8fcd62e7-dc0e-453c-a593-0e57d65f34de' };
      const projectPhase: IProjectPhase = { id: 'd6306830-4cd7-49d4-ae49-a650a81278f2' };
      projectActivity.projectPhase = projectPhase;

      activatedRoute.data = of({ projectActivity });
      comp.ngOnInit();

      expect(comp.projectPhasesSharedCollection()).toContainEqual(projectPhase);
      expect(comp.projectActivity).toEqual(projectActivity);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IProjectActivity>();
      const projectActivity = { id: 'ce18f414-2724-443b-a81a-1f9d591eb13c' };
      vitest.spyOn(projectActivityFormService, 'getProjectActivity').mockReturnValue(projectActivity);
      vitest.spyOn(projectActivityService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ projectActivity });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(projectActivity);
      saveSubject.complete();

      // THEN
      expect(projectActivityFormService.getProjectActivity).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(projectActivityService.update).toHaveBeenCalledWith(expect.objectContaining(projectActivity));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IProjectActivity>();
      const projectActivity = { id: 'ce18f414-2724-443b-a81a-1f9d591eb13c' };
      vitest.spyOn(projectActivityFormService, 'getProjectActivity').mockReturnValue({ id: null });
      vitest.spyOn(projectActivityService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ projectActivity: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(projectActivity);
      saveSubject.complete();

      // THEN
      expect(projectActivityFormService.getProjectActivity).toHaveBeenCalled();
      expect(projectActivityService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IProjectActivity>();
      const projectActivity = { id: 'ce18f414-2724-443b-a81a-1f9d591eb13c' };
      vitest.spyOn(projectActivityService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ projectActivity });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(projectActivityService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareProjectPhase', () => {
      it('should forward to projectPhaseService', () => {
        const entity = { id: 'd6306830-4cd7-49d4-ae49-a650a81278f2' };
        const entity2 = { id: 'f66f01f6-089b-45fa-8a8f-13705ed76a37' };
        vitest.spyOn(projectPhaseService, 'compareProjectPhase');
        comp.compareProjectPhase(entity, entity2);
        expect(projectPhaseService.compareProjectPhase).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
