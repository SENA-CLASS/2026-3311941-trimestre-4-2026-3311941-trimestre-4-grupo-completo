import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IProjectPhase } from 'app/entities/project-phase/project-phase.model';
import { ProjectPhaseService } from 'app/entities/project-phase/service/project-phase.service';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IProjectActivity } from '../project-activity.model';
import { ProjectActivityService } from '../service/project-activity.service';

import { ProjectActivityFormGroup, ProjectActivityFormService } from './project-activity-form.service';

@Component({
  selector: 'ceet-project-activity-update',
  templateUrl: './project-activity-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class ProjectActivityUpdate implements OnInit {
  readonly isSaving = signal(false);
  projectActivity: IProjectActivity | null = null;

  projectPhasesSharedCollection = signal<IProjectPhase[]>([]);

  protected projectActivityService = inject(ProjectActivityService);
  protected projectActivityFormService = inject(ProjectActivityFormService);
  protected projectPhaseService = inject(ProjectPhaseService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ProjectActivityFormGroup = this.projectActivityFormService.createProjectActivityFormGroup();

  compareProjectPhase = (o1: IProjectPhase | null, o2: IProjectPhase | null): boolean =>
    this.projectPhaseService.compareProjectPhase(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ projectActivity }) => {
      this.projectActivity = projectActivity;
      if (projectActivity) {
        this.updateForm(projectActivity);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const projectActivity = this.projectActivityFormService.getProjectActivity(this.editForm);
    if (projectActivity.id === null) {
      this.subscribeToSaveResponse(this.projectActivityService.create(projectActivity));
    } else {
      this.subscribeToSaveResponse(this.projectActivityService.update(projectActivity));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IProjectActivity | null>): void {
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

  protected updateForm(projectActivity: IProjectActivity): void {
    this.projectActivity = projectActivity;
    this.projectActivityFormService.resetForm(this.editForm, projectActivity);

    this.projectPhasesSharedCollection.update(projectPhases =>
      this.projectPhaseService.addProjectPhaseToCollectionIfMissing<IProjectPhase>(projectPhases, projectActivity.projectPhase),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.projectPhaseService
      .query()
      .pipe(map((res: HttpResponse<IProjectPhase[]>) => res.body ?? []))
      .pipe(
        map((projectPhases: IProjectPhase[]) =>
          this.projectPhaseService.addProjectPhaseToCollectionIfMissing<IProjectPhase>(projectPhases, this.projectActivity?.projectPhase),
        ),
      )
      .subscribe((projectPhases: IProjectPhase[]) => this.projectPhasesSharedCollection.set(projectPhases));
  }
}
