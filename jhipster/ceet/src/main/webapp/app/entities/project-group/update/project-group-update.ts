import { HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, finalize, map } from 'rxjs';

import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { State } from 'app/entities/enumerations/state.model';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IProjectGroup } from '../project-group.model';
import { ProjectGroupService } from '../service/project-group.service';

import { ProjectGroupFormGroup, ProjectGroupFormService } from './project-group-form.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ceet-project-group-update',
  templateUrl: './project-group-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class ProjectGroupUpdate implements OnInit {
  readonly isSaving = signal(false);
  projectGroup: IProjectGroup | null = null;
  stateValues = Object.keys(State);

  coursesSharedCollection = signal<ICourse[]>([]);

  protected projectGroupService = inject(ProjectGroupService);
  protected projectGroupFormService = inject(ProjectGroupFormService);
  protected courseService = inject(CourseService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ProjectGroupFormGroup = this.projectGroupFormService.createProjectGroupFormGroup();

  compareCourse = (o1: ICourse | null, o2: ICourse | null): boolean => this.courseService.compareCourse(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ projectGroup }) => {
      this.projectGroup = projectGroup;
      if (projectGroup) {
        this.updateForm(projectGroup);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const projectGroup = this.projectGroupFormService.getProjectGroup(this.editForm);
    if (projectGroup.id === null) {
      this.subscribeToSaveResponse(this.projectGroupService.create(projectGroup));
    } else {
      this.subscribeToSaveResponse(this.projectGroupService.update(projectGroup));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IProjectGroup | null>): void {
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

  protected updateForm(projectGroup: IProjectGroup): void {
    this.projectGroup = projectGroup;
    this.projectGroupFormService.resetForm(this.editForm, projectGroup);

    this.coursesSharedCollection.update(courses =>
      this.courseService.addCourseToCollectionIfMissing<ICourse>(courses, projectGroup.course),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.courseService
      .query()
      .pipe(map((res: HttpResponse<ICourse[]>) => res.body ?? []))
      .pipe(map((courses: ICourse[]) => this.courseService.addCourseToCollectionIfMissing<ICourse>(courses, this.projectGroup?.course)))
      .subscribe((courses: ICourse[]) => this.coursesSharedCollection.set(courses));
  }
}
