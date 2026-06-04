import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IApprentice } from 'app/entities/apprentice/apprentice.model';
import { ApprenticeService } from 'app/entities/apprentice/service/apprentice.service';
import { IProjectGroup } from 'app/entities/project-group/project-group.model';
import { ProjectGroupService } from 'app/entities/project-group/service/project-group.service';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IMemberGroup } from '../member-group.model';
import { MemberGroupService } from '../service/member-group.service';

import { MemberGroupFormGroup, MemberGroupFormService } from './member-group-form.service';

@Component({
  selector: 'ceet-member-group-update',
  templateUrl: './member-group-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class MemberGroupUpdate implements OnInit {
  readonly isSaving = signal(false);
  memberGroup: IMemberGroup | null = null;

  projectGroupsSharedCollection = signal<IProjectGroup[]>([]);
  apprenticesSharedCollection = signal<IApprentice[]>([]);

  protected memberGroupService = inject(MemberGroupService);
  protected memberGroupFormService = inject(MemberGroupFormService);
  protected projectGroupService = inject(ProjectGroupService);
  protected apprenticeService = inject(ApprenticeService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: MemberGroupFormGroup = this.memberGroupFormService.createMemberGroupFormGroup();

  compareProjectGroup = (o1: IProjectGroup | null, o2: IProjectGroup | null): boolean =>
    this.projectGroupService.compareProjectGroup(o1, o2);

  compareApprentice = (o1: IApprentice | null, o2: IApprentice | null): boolean => this.apprenticeService.compareApprentice(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ memberGroup }) => {
      this.memberGroup = memberGroup;
      if (memberGroup) {
        this.updateForm(memberGroup);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const memberGroup = this.memberGroupFormService.getMemberGroup(this.editForm);
    if (memberGroup.id === null) {
      this.subscribeToSaveResponse(this.memberGroupService.create(memberGroup));
    } else {
      this.subscribeToSaveResponse(this.memberGroupService.update(memberGroup));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IMemberGroup | null>): void {
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

  protected updateForm(memberGroup: IMemberGroup): void {
    this.memberGroup = memberGroup;
    this.memberGroupFormService.resetForm(this.editForm, memberGroup);

    this.projectGroupsSharedCollection.update(projectGroups =>
      this.projectGroupService.addProjectGroupToCollectionIfMissing<IProjectGroup>(projectGroups, memberGroup.projectGroup),
    );
    this.apprenticesSharedCollection.update(apprentices =>
      this.apprenticeService.addApprenticeToCollectionIfMissing<IApprentice>(apprentices, memberGroup.apprentice),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.projectGroupService
      .query()
      .pipe(map((res: HttpResponse<IProjectGroup[]>) => res.body ?? []))
      .pipe(
        map((projectGroups: IProjectGroup[]) =>
          this.projectGroupService.addProjectGroupToCollectionIfMissing<IProjectGroup>(projectGroups, this.memberGroup?.projectGroup),
        ),
      )
      .subscribe((projectGroups: IProjectGroup[]) => this.projectGroupsSharedCollection.set(projectGroups));

    this.apprenticeService
      .query()
      .pipe(map((res: HttpResponse<IApprentice[]>) => res.body ?? []))
      .pipe(
        map((apprentices: IApprentice[]) =>
          this.apprenticeService.addApprenticeToCollectionIfMissing<IApprentice>(apprentices, this.memberGroup?.apprentice),
        ),
      )
      .subscribe((apprentices: IApprentice[]) => this.apprenticesSharedCollection.set(apprentices));
  }
}
