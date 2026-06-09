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
import { IPlanning } from 'app/entities/planning/planning.model';
import { PlanningService } from 'app/entities/planning/service/planning.service';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { ICoursePlanning } from '../course-planning.model';
import { CoursePlanningService } from '../service/course-planning.service';

import { CoursePlanningFormGroup, CoursePlanningFormService } from './course-planning-form.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ceet-course-planning-update',
  templateUrl: './course-planning-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class CoursePlanningUpdate implements OnInit {
  readonly isSaving = signal(false);
  coursePlanning: ICoursePlanning | null = null;
  stateValues = Object.keys(State);

  coursesSharedCollection = signal<ICourse[]>([]);
  planningsSharedCollection = signal<IPlanning[]>([]);

  protected coursePlanningService = inject(CoursePlanningService);
  protected coursePlanningFormService = inject(CoursePlanningFormService);
  protected courseService = inject(CourseService);
  protected planningService = inject(PlanningService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CoursePlanningFormGroup = this.coursePlanningFormService.createCoursePlanningFormGroup();

  compareCourse = (o1: ICourse | null, o2: ICourse | null): boolean => this.courseService.compareCourse(o1, o2);

  comparePlanning = (o1: IPlanning | null, o2: IPlanning | null): boolean => this.planningService.comparePlanning(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ coursePlanning }) => {
      this.coursePlanning = coursePlanning;
      if (coursePlanning) {
        this.updateForm(coursePlanning);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const coursePlanning = this.coursePlanningFormService.getCoursePlanning(this.editForm);
    if (coursePlanning.id === null) {
      this.subscribeToSaveResponse(this.coursePlanningService.create(coursePlanning));
    } else {
      this.subscribeToSaveResponse(this.coursePlanningService.update(coursePlanning));
    }
  }

  protected subscribeToSaveResponse(result: Observable<ICoursePlanning | null>): void {
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

  protected updateForm(coursePlanning: ICoursePlanning): void {
    this.coursePlanning = coursePlanning;
    this.coursePlanningFormService.resetForm(this.editForm, coursePlanning);

    this.coursesSharedCollection.update(courses =>
      this.courseService.addCourseToCollectionIfMissing<ICourse>(courses, coursePlanning.course),
    );
    this.planningsSharedCollection.update(plannings =>
      this.planningService.addPlanningToCollectionIfMissing<IPlanning>(plannings, coursePlanning.planning),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.courseService
      .query()
      .pipe(map((res: HttpResponse<ICourse[]>) => res.body ?? []))
      .pipe(map((courses: ICourse[]) => this.courseService.addCourseToCollectionIfMissing<ICourse>(courses, this.coursePlanning?.course)))
      .subscribe((courses: ICourse[]) => this.coursesSharedCollection.set(courses));

    this.planningService
      .query()
      .pipe(map((res: HttpResponse<IPlanning[]>) => res.body ?? []))
      .pipe(
        map((plannings: IPlanning[]) =>
          this.planningService.addPlanningToCollectionIfMissing<IPlanning>(plannings, this.coursePlanning?.planning),
        ),
      )
      .subscribe((plannings: IPlanning[]) => this.planningsSharedCollection.set(plannings));
  }
}
