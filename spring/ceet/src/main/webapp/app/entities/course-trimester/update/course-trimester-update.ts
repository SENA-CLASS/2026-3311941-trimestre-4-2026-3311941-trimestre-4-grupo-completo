import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { TrimesterService } from 'app/entities/trimester/service/trimester.service';
import { ITrimester } from 'app/entities/trimester/trimester.model';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { ICourseTrimester } from '../course-trimester.model';
import { CourseTrimesterService } from '../service/course-trimester.service';

import { CourseTrimesterFormGroup, CourseTrimesterFormService } from './course-trimester-form.service';

@Component({
  selector: 'ceet-course-trimester-update',
  templateUrl: './course-trimester-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class CourseTrimesterUpdate implements OnInit {
  readonly isSaving = signal(false);
  courseTrimester: ICourseTrimester | null = null;

  coursesSharedCollection = signal<ICourse[]>([]);
  trimestersSharedCollection = signal<ITrimester[]>([]);

  protected courseTrimesterService = inject(CourseTrimesterService);
  protected courseTrimesterFormService = inject(CourseTrimesterFormService);
  protected courseService = inject(CourseService);
  protected trimesterService = inject(TrimesterService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CourseTrimesterFormGroup = this.courseTrimesterFormService.createCourseTrimesterFormGroup();

  compareCourse = (o1: ICourse | null, o2: ICourse | null): boolean => this.courseService.compareCourse(o1, o2);

  compareTrimester = (o1: ITrimester | null, o2: ITrimester | null): boolean => this.trimesterService.compareTrimester(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ courseTrimester }) => {
      this.courseTrimester = courseTrimester;
      if (courseTrimester) {
        this.updateForm(courseTrimester);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const courseTrimester = this.courseTrimesterFormService.getCourseTrimester(this.editForm);
    if (courseTrimester.id === null) {
      this.subscribeToSaveResponse(this.courseTrimesterService.create(courseTrimester));
    } else {
      this.subscribeToSaveResponse(this.courseTrimesterService.update(courseTrimester));
    }
  }

  protected subscribeToSaveResponse(result: Observable<ICourseTrimester | null>): void {
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

  protected updateForm(courseTrimester: ICourseTrimester): void {
    this.courseTrimester = courseTrimester;
    this.courseTrimesterFormService.resetForm(this.editForm, courseTrimester);

    this.coursesSharedCollection.update(courses =>
      this.courseService.addCourseToCollectionIfMissing<ICourse>(courses, courseTrimester.course),
    );
    this.trimestersSharedCollection.update(trimesters =>
      this.trimesterService.addTrimesterToCollectionIfMissing<ITrimester>(trimesters, courseTrimester.trimester),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.courseService
      .query()
      .pipe(map((res: HttpResponse<ICourse[]>) => res.body ?? []))
      .pipe(map((courses: ICourse[]) => this.courseService.addCourseToCollectionIfMissing<ICourse>(courses, this.courseTrimester?.course)))
      .subscribe((courses: ICourse[]) => this.coursesSharedCollection.set(courses));

    this.trimesterService
      .query()
      .pipe(map((res: HttpResponse<ITrimester[]>) => res.body ?? []))
      .pipe(
        map((trimesters: ITrimester[]) =>
          this.trimesterService.addTrimesterToCollectionIfMissing<ITrimester>(trimesters, this.courseTrimester?.trimester),
        ),
      )
      .subscribe((trimesters: ITrimester[]) => this.trimestersSharedCollection.set(trimesters));
  }
}
