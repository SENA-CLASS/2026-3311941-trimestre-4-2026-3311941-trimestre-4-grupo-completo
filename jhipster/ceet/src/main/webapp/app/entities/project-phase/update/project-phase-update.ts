import { HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, finalize, map } from 'rxjs';

import { IProject } from 'app/entities/project/project.model';
import { ProjectService } from 'app/entities/project/service/project.service';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IProjectPhase } from '../project-phase.model';
import { ProjectPhaseService } from '../service/project-phase.service';

import { ProjectPhaseFormGroup, ProjectPhaseFormService } from './project-phase-form.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ceet-project-phase-update',
  templateUrl: './project-phase-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class ProjectPhaseUpdate implements OnInit {
  readonly isSaving = signal(false);
  projectPhase: IProjectPhase | null = null;

  projectsSharedCollection = signal<IProject[]>([]);

  protected projectPhaseService = inject(ProjectPhaseService);
  protected projectPhaseFormService = inject(ProjectPhaseFormService);
  protected projectService = inject(ProjectService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ProjectPhaseFormGroup = this.projectPhaseFormService.createProjectPhaseFormGroup();

  compareProject = (o1: IProject | null, o2: IProject | null): boolean => this.projectService.compareProject(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ projectPhase }) => {
      this.projectPhase = projectPhase;
      if (projectPhase) {
        this.updateForm(projectPhase);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const projectPhase = this.projectPhaseFormService.getProjectPhase(this.editForm);
    if (projectPhase.id === null) {
      this.subscribeToSaveResponse(this.projectPhaseService.create(projectPhase));
    } else {
      this.subscribeToSaveResponse(this.projectPhaseService.update(projectPhase));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IProjectPhase | null>): void {
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

  protected updateForm(projectPhase: IProjectPhase): void {
    this.projectPhase = projectPhase;
    this.projectPhaseFormService.resetForm(this.editForm, projectPhase);

    this.projectsSharedCollection.update(projects =>
      this.projectService.addProjectToCollectionIfMissing<IProject>(projects, projectPhase.project),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.projectService
      .query()
      .pipe(map((res: HttpResponse<IProject[]>) => res.body ?? []))
      .pipe(
        map((projects: IProject[]) => this.projectService.addProjectToCollectionIfMissing<IProject>(projects, this.projectPhase?.project)),
      )
      .subscribe((projects: IProject[]) => this.projectsSharedCollection.set(projects));
  }
}
