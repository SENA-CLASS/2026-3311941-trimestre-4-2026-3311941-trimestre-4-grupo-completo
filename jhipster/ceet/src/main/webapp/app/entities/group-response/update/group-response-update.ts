import { HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, finalize, map } from 'rxjs';

import { IAssessment } from 'app/entities/assessment/assessment.model';
import { AssessmentService } from 'app/entities/assessment/service/assessment.service';
import { IItemList } from 'app/entities/item-list/item-list.model';
import { ItemListService } from 'app/entities/item-list/service/item-list.service';
import { IProjectGroup } from 'app/entities/project-group/project-group.model';
import { ProjectGroupService } from 'app/entities/project-group/service/project-group.service';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IGroupResponse } from '../group-response.model';
import { GroupResponseService } from '../service/group-response.service';

import { GroupResponseFormGroup, GroupResponseFormService } from './group-response-form.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ceet-group-response-update',
  templateUrl: './group-response-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class GroupResponseUpdate implements OnInit {
  readonly isSaving = signal(false);
  groupResponse: IGroupResponse | null = null;

  projectGroupsSharedCollection = signal<IProjectGroup[]>([]);
  assessmentsSharedCollection = signal<IAssessment[]>([]);
  itemListsSharedCollection = signal<IItemList[]>([]);

  protected groupResponseService = inject(GroupResponseService);
  protected groupResponseFormService = inject(GroupResponseFormService);
  protected projectGroupService = inject(ProjectGroupService);
  protected assessmentService = inject(AssessmentService);
  protected itemListService = inject(ItemListService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: GroupResponseFormGroup = this.groupResponseFormService.createGroupResponseFormGroup();

  compareProjectGroup = (o1: IProjectGroup | null, o2: IProjectGroup | null): boolean =>
    this.projectGroupService.compareProjectGroup(o1, o2);

  compareAssessment = (o1: IAssessment | null, o2: IAssessment | null): boolean => this.assessmentService.compareAssessment(o1, o2);

  compareItemList = (o1: IItemList | null, o2: IItemList | null): boolean => this.itemListService.compareItemList(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ groupResponse }) => {
      this.groupResponse = groupResponse;
      if (groupResponse) {
        this.updateForm(groupResponse);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const groupResponse = this.groupResponseFormService.getGroupResponse(this.editForm);
    if (groupResponse.id === null) {
      this.subscribeToSaveResponse(this.groupResponseService.create(groupResponse));
    } else {
      this.subscribeToSaveResponse(this.groupResponseService.update(groupResponse));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IGroupResponse | null>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving.set(false);
  }

  protected updateForm(groupResponse: IGroupResponse): void {
    this.groupResponse = groupResponse;
    this.groupResponseFormService.resetForm(this.editForm, groupResponse);

    this.projectGroupsSharedCollection.update(projectGroups =>
      this.projectGroupService.addProjectGroupToCollectionIfMissing<IProjectGroup>(projectGroups, groupResponse.projectGroup),
    );
    this.assessmentsSharedCollection.update(assessments =>
      this.assessmentService.addAssessmentToCollectionIfMissing<IAssessment>(assessments, groupResponse.assessment),
    );
    this.itemListsSharedCollection.update(itemLists =>
      this.itemListService.addItemListToCollectionIfMissing<IItemList>(itemLists, groupResponse.itemList),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.projectGroupService
      .query()
      .pipe(map((res: HttpResponse<IProjectGroup[]>) => res.body ?? []))
      .pipe(
        map((projectGroups: IProjectGroup[]) =>
          this.projectGroupService.addProjectGroupToCollectionIfMissing<IProjectGroup>(projectGroups, this.groupResponse?.projectGroup),
        ),
      )
      .subscribe((projectGroups: IProjectGroup[]) => this.projectGroupsSharedCollection.set(projectGroups));

    this.assessmentService
      .query()
      .pipe(map((res: HttpResponse<IAssessment[]>) => res.body ?? []))
      .pipe(
        map((assessments: IAssessment[]) =>
          this.assessmentService.addAssessmentToCollectionIfMissing<IAssessment>(assessments, this.groupResponse?.assessment),
        ),
      )
      .subscribe((assessments: IAssessment[]) => this.assessmentsSharedCollection.set(assessments));

    this.itemListService
      .query()
      .pipe(map((res: HttpResponse<IItemList[]>) => res.body ?? []))
      .pipe(
        map((itemLists: IItemList[]) =>
          this.itemListService.addItemListToCollectionIfMissing<IItemList>(itemLists, this.groupResponse?.itemList),
        ),
      )
      .subscribe((itemLists: IItemList[]) => this.itemListsSharedCollection.set(itemLists));
  }
}
