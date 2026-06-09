import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { IAssessment } from 'app/entities/assessment/assessment.model';
import { AssessmentService } from 'app/entities/assessment/service/assessment.service';
import { IItemList } from 'app/entities/item-list/item-list.model';
import { ItemListService } from 'app/entities/item-list/service/item-list.service';
import { IProjectGroup } from 'app/entities/project-group/project-group.model';
import { ProjectGroupService } from 'app/entities/project-group/service/project-group.service';
import { IGroupResponse } from '../group-response.model';
import { GroupResponseService } from '../service/group-response.service';

import { GroupResponseFormService } from './group-response-form.service';
import { GroupResponseUpdate } from './group-response-update';

describe('GroupResponse Management Update Component', () => {
  let comp: GroupResponseUpdate;
  let fixture: ComponentFixture<GroupResponseUpdate>;
  let activatedRoute: ActivatedRoute;
  let groupResponseFormService: GroupResponseFormService;
  let groupResponseService: GroupResponseService;
  let projectGroupService: ProjectGroupService;
  let assessmentService: AssessmentService;
  let itemListService: ItemListService;

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

    fixture = TestBed.createComponent(GroupResponseUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    groupResponseFormService = TestBed.inject(GroupResponseFormService);
    groupResponseService = TestBed.inject(GroupResponseService);
    projectGroupService = TestBed.inject(ProjectGroupService);
    assessmentService = TestBed.inject(AssessmentService);
    itemListService = TestBed.inject(ItemListService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call ProjectGroup query and add missing value', () => {
      const groupResponse: IGroupResponse = { id: 'e20ecb71-d9ec-4694-82c9-f26362300c8f' };
      const projectGroup: IProjectGroup = { id: '09699592-062b-40e5-aa51-6ed07e22b997' };
      groupResponse.projectGroup = projectGroup;

      const projectGroupCollection: IProjectGroup[] = [{ id: '09699592-062b-40e5-aa51-6ed07e22b997' }];
      vitest.spyOn(projectGroupService, 'query').mockReturnValue(of(new HttpResponse({ body: projectGroupCollection })));
      const additionalProjectGroups = [projectGroup];
      const expectedCollection: IProjectGroup[] = [...additionalProjectGroups, ...projectGroupCollection];
      vitest.spyOn(projectGroupService, 'addProjectGroupToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ groupResponse });
      comp.ngOnInit();

      expect(projectGroupService.query).toHaveBeenCalled();
      expect(projectGroupService.addProjectGroupToCollectionIfMissing).toHaveBeenCalledWith(
        projectGroupCollection,
        ...additionalProjectGroups.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.projectGroupsSharedCollection()).toEqual(expectedCollection);
    });

    it('should call Assessment query and add missing value', () => {
      const groupResponse: IGroupResponse = { id: 'e20ecb71-d9ec-4694-82c9-f26362300c8f' };
      const assessment: IAssessment = { id: 'bb314d01-ba25-4918-b045-cdb0e554b9e7' };
      groupResponse.assessment = assessment;

      const assessmentCollection: IAssessment[] = [{ id: 'bb314d01-ba25-4918-b045-cdb0e554b9e7' }];
      vitest.spyOn(assessmentService, 'query').mockReturnValue(of(new HttpResponse({ body: assessmentCollection })));
      const additionalAssessments = [assessment];
      const expectedCollection: IAssessment[] = [...additionalAssessments, ...assessmentCollection];
      vitest.spyOn(assessmentService, 'addAssessmentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ groupResponse });
      comp.ngOnInit();

      expect(assessmentService.query).toHaveBeenCalled();
      expect(assessmentService.addAssessmentToCollectionIfMissing).toHaveBeenCalledWith(
        assessmentCollection,
        ...additionalAssessments.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.assessmentsSharedCollection()).toEqual(expectedCollection);
    });

    it('should call ItemList query and add missing value', () => {
      const groupResponse: IGroupResponse = { id: 'e20ecb71-d9ec-4694-82c9-f26362300c8f' };
      const itemList: IItemList = { id: 'f5c01f94-408b-48fb-9301-893ca4de0dc0' };
      groupResponse.itemList = itemList;

      const itemListCollection: IItemList[] = [{ id: 'f5c01f94-408b-48fb-9301-893ca4de0dc0' }];
      vitest.spyOn(itemListService, 'query').mockReturnValue(of(new HttpResponse({ body: itemListCollection })));
      const additionalItemLists = [itemList];
      const expectedCollection: IItemList[] = [...additionalItemLists, ...itemListCollection];
      vitest.spyOn(itemListService, 'addItemListToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ groupResponse });
      comp.ngOnInit();

      expect(itemListService.query).toHaveBeenCalled();
      expect(itemListService.addItemListToCollectionIfMissing).toHaveBeenCalledWith(
        itemListCollection,
        ...additionalItemLists.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.itemListsSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const groupResponse: IGroupResponse = { id: 'e20ecb71-d9ec-4694-82c9-f26362300c8f' };
      const projectGroup: IProjectGroup = { id: '09699592-062b-40e5-aa51-6ed07e22b997' };
      groupResponse.projectGroup = projectGroup;
      const assessment: IAssessment = { id: 'bb314d01-ba25-4918-b045-cdb0e554b9e7' };
      groupResponse.assessment = assessment;
      const itemList: IItemList = { id: 'f5c01f94-408b-48fb-9301-893ca4de0dc0' };
      groupResponse.itemList = itemList;

      activatedRoute.data = of({ groupResponse });
      comp.ngOnInit();

      expect(comp.projectGroupsSharedCollection()).toContainEqual(projectGroup);
      expect(comp.assessmentsSharedCollection()).toContainEqual(assessment);
      expect(comp.itemListsSharedCollection()).toContainEqual(itemList);
      expect(comp.groupResponse).toEqual(groupResponse);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IGroupResponse>();
      const groupResponse = { id: '57b45d23-226e-48e7-93c6-046bd207c9c6' };
      vitest.spyOn(groupResponseFormService, 'getGroupResponse').mockReturnValue(groupResponse);
      vitest.spyOn(groupResponseService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ groupResponse });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(groupResponse);
      saveSubject.complete();

      // THEN
      expect(groupResponseFormService.getGroupResponse).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(groupResponseService.update).toHaveBeenCalledWith(expect.objectContaining(groupResponse));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IGroupResponse>();
      const groupResponse = { id: '57b45d23-226e-48e7-93c6-046bd207c9c6' };
      vitest.spyOn(groupResponseFormService, 'getGroupResponse').mockReturnValue({ id: null });
      vitest.spyOn(groupResponseService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ groupResponse: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(groupResponse);
      saveSubject.complete();

      // THEN
      expect(groupResponseFormService.getGroupResponse).toHaveBeenCalled();
      expect(groupResponseService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IGroupResponse>();
      const groupResponse = { id: '57b45d23-226e-48e7-93c6-046bd207c9c6' };
      vitest.spyOn(groupResponseService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ groupResponse });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(groupResponseService.update).toHaveBeenCalled();
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

    describe('compareAssessment', () => {
      it('should forward to assessmentService', () => {
        const entity = { id: 'bb314d01-ba25-4918-b045-cdb0e554b9e7' };
        const entity2 = { id: '4d8cb6e7-0e36-48d8-9238-cd3a2f69725c' };
        vitest.spyOn(assessmentService, 'compareAssessment');
        comp.compareAssessment(entity, entity2);
        expect(assessmentService.compareAssessment).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareItemList', () => {
      it('should forward to itemListService', () => {
        const entity = { id: 'f5c01f94-408b-48fb-9301-893ca4de0dc0' };
        const entity2 = { id: 'ecdaac4d-d1f0-45d8-a82a-a8c15fe05153' };
        vitest.spyOn(itemListService, 'compareItemList');
        comp.compareItemList(entity, entity2);
        expect(itemListService.compareItemList).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
