import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { IApprentice } from 'app/entities/apprentice/apprentice.model';
import { ApprenticeService } from 'app/entities/apprentice/service/apprentice.service';
import { IProjectGroup } from 'app/entities/project-group/project-group.model';
import { ProjectGroupService } from 'app/entities/project-group/service/project-group.service';
import { IMemberGroup } from '../member-group.model';
import { MemberGroupService } from '../service/member-group.service';

import { MemberGroupFormService } from './member-group-form.service';
import { MemberGroupUpdate } from './member-group-update';

describe('MemberGroup Management Update Component', () => {
  let comp: MemberGroupUpdate;
  let fixture: ComponentFixture<MemberGroupUpdate>;
  let activatedRoute: ActivatedRoute;
  let memberGroupFormService: MemberGroupFormService;
  let memberGroupService: MemberGroupService;
  let projectGroupService: ProjectGroupService;
  let apprenticeService: ApprenticeService;

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

    fixture = TestBed.createComponent(MemberGroupUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    memberGroupFormService = TestBed.inject(MemberGroupFormService);
    memberGroupService = TestBed.inject(MemberGroupService);
    projectGroupService = TestBed.inject(ProjectGroupService);
    apprenticeService = TestBed.inject(ApprenticeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call ProjectGroup query and add missing value', () => {
      const memberGroup: IMemberGroup = { id: 'c2a1fa14-445f-49f5-ba37-551635dc0bb3' };
      const projectGroup: IProjectGroup = { id: '09699592-062b-40e5-aa51-6ed07e22b997' };
      memberGroup.projectGroup = projectGroup;

      const projectGroupCollection: IProjectGroup[] = [{ id: '09699592-062b-40e5-aa51-6ed07e22b997' }];
      vitest.spyOn(projectGroupService, 'query').mockReturnValue(of(new HttpResponse({ body: projectGroupCollection })));
      const additionalProjectGroups = [projectGroup];
      const expectedCollection: IProjectGroup[] = [...additionalProjectGroups, ...projectGroupCollection];
      vitest.spyOn(projectGroupService, 'addProjectGroupToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ memberGroup });
      comp.ngOnInit();

      expect(projectGroupService.query).toHaveBeenCalled();
      expect(projectGroupService.addProjectGroupToCollectionIfMissing).toHaveBeenCalledWith(
        projectGroupCollection,
        ...additionalProjectGroups.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.projectGroupsSharedCollection()).toEqual(expectedCollection);
    });

    it('should call Apprentice query and add missing value', () => {
      const memberGroup: IMemberGroup = { id: 'c2a1fa14-445f-49f5-ba37-551635dc0bb3' };
      const apprentice: IApprentice = { id: '8681ca6b-c1b7-4e43-96b8-c3fc96b48213' };
      memberGroup.apprentice = apprentice;

      const apprenticeCollection: IApprentice[] = [{ id: '8681ca6b-c1b7-4e43-96b8-c3fc96b48213' }];
      vitest.spyOn(apprenticeService, 'query').mockReturnValue(of(new HttpResponse({ body: apprenticeCollection })));
      const additionalApprentices = [apprentice];
      const expectedCollection: IApprentice[] = [...additionalApprentices, ...apprenticeCollection];
      vitest.spyOn(apprenticeService, 'addApprenticeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ memberGroup });
      comp.ngOnInit();

      expect(apprenticeService.query).toHaveBeenCalled();
      expect(apprenticeService.addApprenticeToCollectionIfMissing).toHaveBeenCalledWith(
        apprenticeCollection,
        ...additionalApprentices.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.apprenticesSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const memberGroup: IMemberGroup = { id: 'c2a1fa14-445f-49f5-ba37-551635dc0bb3' };
      const projectGroup: IProjectGroup = { id: '09699592-062b-40e5-aa51-6ed07e22b997' };
      memberGroup.projectGroup = projectGroup;
      const apprentice: IApprentice = { id: '8681ca6b-c1b7-4e43-96b8-c3fc96b48213' };
      memberGroup.apprentice = apprentice;

      activatedRoute.data = of({ memberGroup });
      comp.ngOnInit();

      expect(comp.projectGroupsSharedCollection()).toContainEqual(projectGroup);
      expect(comp.apprenticesSharedCollection()).toContainEqual(apprentice);
      expect(comp.memberGroup).toEqual(memberGroup);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IMemberGroup>();
      const memberGroup = { id: 'aaafac9c-00f1-42dd-b0bb-5944cf56fc08' };
      vitest.spyOn(memberGroupFormService, 'getMemberGroup').mockReturnValue(memberGroup);
      vitest.spyOn(memberGroupService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ memberGroup });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(memberGroup);
      saveSubject.complete();

      // THEN
      expect(memberGroupFormService.getMemberGroup).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(memberGroupService.update).toHaveBeenCalledWith(expect.objectContaining(memberGroup));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IMemberGroup>();
      const memberGroup = { id: 'aaafac9c-00f1-42dd-b0bb-5944cf56fc08' };
      vitest.spyOn(memberGroupFormService, 'getMemberGroup').mockReturnValue({ id: null });
      vitest.spyOn(memberGroupService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ memberGroup: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(memberGroup);
      saveSubject.complete();

      // THEN
      expect(memberGroupFormService.getMemberGroup).toHaveBeenCalled();
      expect(memberGroupService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IMemberGroup>();
      const memberGroup = { id: 'aaafac9c-00f1-42dd-b0bb-5944cf56fc08' };
      vitest.spyOn(memberGroupService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ memberGroup });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(memberGroupService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareProjectGroup', () => {
      it('should forward to projectGroupService', () => {
        const entity = { id: '09699592-062b-40e5-aa51-6ed07e22b997' };
        const entity2 = { id: 'e32c8573-0365-4601-97ff-335f74d06785' };
        vitest.spyOn(projectGroupService, 'compareProjectGroup');
        comp.compareProjectGroup(entity, entity2);
        expect(projectGroupService.compareProjectGroup).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareApprentice', () => {
      it('should forward to apprenticeService', () => {
        const entity = { id: '8681ca6b-c1b7-4e43-96b8-c3fc96b48213' };
        const entity2 = { id: 'f1537a32-8765-4478-a7fa-674e3f6ae8c1' };
        vitest.spyOn(apprenticeService, 'compareApprentice');
        comp.compareApprentice(entity, entity2);
        expect(apprenticeService.compareApprentice).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
