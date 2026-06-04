import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICheckList } from 'app/entities/check-list/check-list.model';
import { CheckListService } from 'app/entities/check-list/service/check-list.service';
import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { State } from 'app/entities/enumerations/state.model';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { ICheckListCourse } from '../check-list-course.model';
import { CheckListCourseService } from '../service/check-list-course.service';

import { CheckListCourseFormGroup, CheckListCourseFormService } from './check-list-course-form.service';

@Component({
  selector: 'ceet-check-list-course-update',
  templateUrl: './check-list-course-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class CheckListCourseUpdate implements OnInit {
  readonly isSaving = signal(false);
  checkListCourse: ICheckListCourse | null = null;
  stateValues = Object.keys(State);

  coursesSharedCollection = signal<ICourse[]>([]);
  checkListsSharedCollection = signal<ICheckList[]>([]);

  protected checkListCourseService = inject(CheckListCourseService);
  protected checkListCourseFormService = inject(CheckListCourseFormService);
  protected courseService = inject(CourseService);
  protected checkListService = inject(CheckListService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CheckListCourseFormGroup = this.checkListCourseFormService.createCheckListCourseFormGroup();

  compareCourse = (o1: ICourse | null, o2: ICourse | null): boolean => this.courseService.compareCourse(o1, o2);

  compareCheckList = (o1: ICheckList | null, o2: ICheckList | null): boolean => this.checkListService.compareCheckList(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ checkListCourse }) => {
      this.checkListCourse = checkListCourse;
      if (checkListCourse) {
        this.updateForm(checkListCourse);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const checkListCourse = this.checkListCourseFormService.getCheckListCourse(this.editForm);
    if (checkListCourse.id === null) {
      this.subscribeToSaveResponse(this.checkListCourseService.create(checkListCourse));
    } else {
      this.subscribeToSaveResponse(this.checkListCourseService.update(checkListCourse));
    }
  }

  protected subscribeToSaveResponse(result: Observable<ICheckListCourse | null>): void {
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

  protected updateForm(checkListCourse: ICheckListCourse): void {
    this.checkListCourse = checkListCourse;
    this.checkListCourseFormService.resetForm(this.editForm, checkListCourse);

    this.coursesSharedCollection.update(courses =>
      this.courseService.addCourseToCollectionIfMissing<ICourse>(courses, checkListCourse.course),
    );
    this.checkListsSharedCollection.update(checkLists =>
      this.checkListService.addCheckListToCollectionIfMissing<ICheckList>(checkLists, checkListCourse.checkList),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.courseService
      .query()
      .pipe(map((res: HttpResponse<ICourse[]>) => res.body ?? []))
      .pipe(map((courses: ICourse[]) => this.courseService.addCourseToCollectionIfMissing<ICourse>(courses, this.checkListCourse?.course)))
      .subscribe((courses: ICourse[]) => this.coursesSharedCollection.set(courses));

    this.checkListService
      .query()
      .pipe(map((res: HttpResponse<ICheckList[]>) => res.body ?? []))
      .pipe(
        map((checkLists: ICheckList[]) =>
          this.checkListService.addCheckListToCollectionIfMissing<ICheckList>(checkLists, this.checkListCourse?.checkList),
        ),
      )
      .subscribe((checkLists: ICheckList[]) => this.checkListsSharedCollection.set(checkLists));
  }
}
