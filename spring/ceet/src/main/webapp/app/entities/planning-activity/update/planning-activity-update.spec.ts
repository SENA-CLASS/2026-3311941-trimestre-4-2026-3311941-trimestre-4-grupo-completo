import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { IProjectActivity } from 'app/entities/project-activity/project-activity.model';
import { ProjectActivityService } from 'app/entities/project-activity/service/project-activity.service';
import { IQuarterSchedule } from 'app/entities/quarter-schedule/quarter-schedule.model';
import { QuarterScheduleService } from 'app/entities/quarter-schedule/service/quarter-schedule.service';
import { IPlanningActivity } from '../planning-activity.model';
import { PlanningActivityService } from '../service/planning-activity.service';

import { PlanningActivityFormService } from './planning-activity-form.service';
import { PlanningActivityUpdate } from './planning-activity-update';

describe('PlanningActivity Management Update Component', () => {
  let comp: PlanningActivityUpdate;
  let fixture: ComponentFixture<PlanningActivityUpdate>;
  let activatedRoute: ActivatedRoute;
  let planningActivityFormService: PlanningActivityFormService;
  let planningActivityService: PlanningActivityService;
  let quarterScheduleService: QuarterScheduleService;
  let projectActivityService: ProjectActivityService;

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

    fixture = TestBed.createComponent(PlanningActivityUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    planningActivityFormService = TestBed.inject(PlanningActivityFormService);
    planningActivityService = TestBed.inject(PlanningActivityService);
    quarterScheduleService = TestBed.inject(QuarterScheduleService);
    projectActivityService = TestBed.inject(ProjectActivityService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call QuarterSchedule query and add missing value', () => {
      const planningActivity: IPlanningActivity = { id: '62ae726d-e1bd-43c1-b6e1-2b81a88a5872' };
      const quarterSchedule: IQuarterSchedule = { id: 'cb8a58fb-ddc6-4c56-9542-9f8e60b8e090' };
      planningActivity.quarterSchedule = quarterSchedule;

      const quarterScheduleCollection: IQuarterSchedule[] = [{ id: 'cb8a58fb-ddc6-4c56-9542-9f8e60b8e090' }];
      vitest.spyOn(quarterScheduleService, 'query').mockReturnValue(of(new HttpResponse({ body: quarterScheduleCollection })));
      const additionalQuarterSchedules = [quarterSchedule];
      const expectedCollection: IQuarterSchedule[] = [...additionalQuarterSchedules, ...quarterScheduleCollection];
      vitest.spyOn(quarterScheduleService, 'addQuarterScheduleToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ planningActivity });
      comp.ngOnInit();

      expect(quarterScheduleService.query).toHaveBeenCalled();
      expect(quarterScheduleService.addQuarterScheduleToCollectionIfMissing).toHaveBeenCalledWith(
        quarterScheduleCollection,
        ...additionalQuarterSchedules.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.quarterSchedulesSharedCollection()).toEqual(expectedCollection);
    });

    it('should call ProjectActivity query and add missing value', () => {
      const planningActivity: IPlanningActivity = { id: '62ae726d-e1bd-43c1-b6e1-2b81a88a5872' };
      const projectActivity: IProjectActivity = { id: 'ce18f414-2724-443b-a81a-1f9d591eb13c' };
      planningActivity.projectActivity = projectActivity;

      const projectActivityCollection: IProjectActivity[] = [{ id: 'ce18f414-2724-443b-a81a-1f9d591eb13c' }];
      vitest.spyOn(projectActivityService, 'query').mockReturnValue(of(new HttpResponse({ body: projectActivityCollection })));
      const additionalProjectActivities = [projectActivity];
      const expectedCollection: IProjectActivity[] = [...additionalProjectActivities, ...projectActivityCollection];
      vitest.spyOn(projectActivityService, 'addProjectActivityToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ planningActivity });
      comp.ngOnInit();

      expect(projectActivityService.query).toHaveBeenCalled();
      expect(projectActivityService.addProjectActivityToCollectionIfMissing).toHaveBeenCalledWith(
        projectActivityCollection,
        ...additionalProjectActivities.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.projectActivitiesSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const planningActivity: IPlanningActivity = { id: '62ae726d-e1bd-43c1-b6e1-2b81a88a5872' };
      const quarterSchedule: IQuarterSchedule = { id: 'cb8a58fb-ddc6-4c56-9542-9f8e60b8e090' };
      planningActivity.quarterSchedule = quarterSchedule;
      const projectActivity: IProjectActivity = { id: 'ce18f414-2724-443b-a81a-1f9d591eb13c' };
      planningActivity.projectActivity = projectActivity;

      activatedRoute.data = of({ planningActivity });
      comp.ngOnInit();

      expect(comp.quarterSchedulesSharedCollection()).toContainEqual(quarterSchedule);
      expect(comp.projectActivitiesSharedCollection()).toContainEqual(projectActivity);
      expect(comp.planningActivity).toEqual(planningActivity);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IPlanningActivity>();
      const planningActivity = { id: 'e33c8a7c-2d1d-41a5-b595-8ae92ad792d5' };
      vitest.spyOn(planningActivityFormService, 'getPlanningActivity').mockReturnValue(planningActivity);
      vitest.spyOn(planningActivityService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ planningActivity });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(planningActivity);
      saveSubject.complete();

      // THEN
      expect(planningActivityFormService.getPlanningActivity).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(planningActivityService.update).toHaveBeenCalledWith(expect.objectContaining(planningActivity));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IPlanningActivity>();
      const planningActivity = { id: 'e33c8a7c-2d1d-41a5-b595-8ae92ad792d5' };
      vitest.spyOn(planningActivityFormService, 'getPlanningActivity').mockReturnValue({ id: null });
      vitest.spyOn(planningActivityService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ planningActivity: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(planningActivity);
      saveSubject.complete();

      // THEN
      expect(planningActivityFormService.getPlanningActivity).toHaveBeenCalled();
      expect(planningActivityService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IPlanningActivity>();
      const planningActivity = { id: 'e33c8a7c-2d1d-41a5-b595-8ae92ad792d5' };
      vitest.spyOn(planningActivityService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ planningActivity });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(planningActivityService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareQuarterSchedule', () => {
      it('should forward to quarterScheduleService', () => {
        const entity = { id: 'cb8a58fb-ddc6-4c56-9542-9f8e60b8e090' };
        const entity2 = { id: '6d26cf65-14a3-450e-b171-5321deb013d8' };
        vitest.spyOn(quarterScheduleService, 'compareQuarterSchedule');
        comp.compareQuarterSchedule(entity, entity2);
        expect(quarterScheduleService.compareQuarterSchedule).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareProjectActivity', () => {
      it('should forward to projectActivityService', () => {
        const entity = { id: 'ce18f414-2724-443b-a81a-1f9d591eb13c' };
        const entity2 = { id: '8fcd62e7-dc0e-453c-a593-0e57d65f34de' };
        vitest.spyOn(projectActivityService, 'compareProjectActivity');
        comp.compareProjectActivity(entity, entity2);
        expect(projectActivityService.compareProjectActivity).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
