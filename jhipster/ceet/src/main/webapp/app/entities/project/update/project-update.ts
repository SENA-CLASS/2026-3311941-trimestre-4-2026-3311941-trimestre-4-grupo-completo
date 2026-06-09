import { HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, finalize, map } from 'rxjs';

import { State } from 'app/entities/enumerations/state.model';
import { TrainingProgramService } from 'app/entities/training-program/service/training-program.service';
import { ITrainingProgram } from 'app/entities/training-program/training-program.model';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IProject } from '../project.model';
import { ProjectService } from '../service/project.service';

import { ProjectFormGroup, ProjectFormService } from './project-form.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ceet-project-update',
  templateUrl: './project-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class ProjectUpdate implements OnInit {
  readonly isSaving = signal(false);
  project: IProject | null = null;
  stateValues = Object.keys(State);

  trainingProgramsSharedCollection = signal<ITrainingProgram[]>([]);

  protected projectService = inject(ProjectService);
  protected projectFormService = inject(ProjectFormService);
  protected trainingProgramService = inject(TrainingProgramService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ProjectFormGroup = this.projectFormService.createProjectFormGroup();

  compareTrainingProgram = (o1: ITrainingProgram | null, o2: ITrainingProgram | null): boolean =>
    this.trainingProgramService.compareTrainingProgram(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ project }) => {
      this.project = project;
      if (project) {
        this.updateForm(project);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const project = this.projectFormService.getProject(this.editForm);
    if (project.id === null) {
      this.subscribeToSaveResponse(this.projectService.create(project));
    } else {
      this.subscribeToSaveResponse(this.projectService.update(project));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IProject | null>): void {
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

  protected updateForm(project: IProject): void {
    this.project = project;
    this.projectFormService.resetForm(this.editForm, project);

    this.trainingProgramsSharedCollection.update(trainingPrograms =>
      this.trainingProgramService.addTrainingProgramToCollectionIfMissing<ITrainingProgram>(trainingPrograms, project.trainingProgram),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.trainingProgramService
      .query()
      .pipe(map((res: HttpResponse<ITrainingProgram[]>) => res.body ?? []))
      .pipe(
        map((trainingPrograms: ITrainingProgram[]) =>
          this.trainingProgramService.addTrainingProgramToCollectionIfMissing<ITrainingProgram>(
            trainingPrograms,
            this.project?.trainingProgram,
          ),
        ),
      )
      .subscribe((trainingPrograms: ITrainingProgram[]) => this.trainingProgramsSharedCollection.set(trainingPrograms));
  }
}
