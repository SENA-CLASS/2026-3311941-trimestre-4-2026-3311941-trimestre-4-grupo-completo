import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap/datepicker';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICourseStatus } from 'app/entities/course-status/course-status.model';
import { CourseStatusService } from 'app/entities/course-status/service/course-status.service';
import { ITrainingProgram } from 'app/entities/training-program/training-program.model';
import { WorkingDayCourseService } from 'app/entities/working-day-course/service/working-day-course.service';
import { IWorkingDayCourse } from 'app/entities/working-day-course/working-day-course.model';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';

import { ICourse } from '../course.model';
import { CourseService } from '../service/course.service';

import { CourseFormGroup, CourseFormService } from './course-form.service';
import { TrainingProgramService } from 'app/entities/training-program/service/training-program.service';

@Component({
  selector: 'ceet-course-update',
  templateUrl: './course-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule, NgbInputDatepicker],
})
export class CourseUpdate implements OnInit {
  readonly isSaving = signal(false);
  course: ICourse | null = null;

  courseStatusesSharedCollection = signal<ICourseStatus[]>([]);
  workingDayCoursesSharedCollection = signal<IWorkingDayCourse[]>([]);
  trainingProgramsSharedCollection = signal<ITrainingProgram[]>([]);

  protected courseService = inject(CourseService);
  protected courseFormService = inject(CourseFormService);
  protected courseStatusService = inject(CourseStatusService);
  protected workingDayCourseService = inject(WorkingDayCourseService);
  protected trainingProgramService = inject(TrainingProgramService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CourseFormGroup = this.courseFormService.createCourseFormGroup();

  compareCourseStatus = (o1: ICourseStatus | null, o2: ICourseStatus | null): boolean =>
    this.courseStatusService.compareCourseStatus(o1, o2);

  compareWorkingDayCourse = (o1: IWorkingDayCourse | null, o2: IWorkingDayCourse | null): boolean =>
    this.workingDayCourseService.compareWorkingDayCourse(o1, o2);

  compareTrainingProgram = (o1: ITrainingProgram | null, o2: ITrainingProgram | null): boolean =>
    this.trainingProgramService.compareTrainingProgram(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ course }) => {
      this.course = course;
      if (course) {
        this.updateForm(course);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const course = this.courseFormService.getCourse(this.editForm);
    if (course.id === null) {
      this.subscribeToSaveResponse(this.courseService.create(course));
    } else {
      this.subscribeToSaveResponse(this.courseService.update(course));
    }
  }

  protected subscribeToSaveResponse(result: Observable<ICourse | null>): void {
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

  protected updateForm(course: ICourse): void {
    this.course = course;
    this.courseFormService.resetForm(this.editForm, course);

    this.courseStatusesSharedCollection.update(courseStatuses =>
      this.courseStatusService.addCourseStatusToCollectionIfMissing<ICourseStatus>(courseStatuses, course.courseStatus),
    );
    this.workingDayCoursesSharedCollection.update(workingDayCourses =>
      this.workingDayCourseService.addWorkingDayCourseToCollectionIfMissing<IWorkingDayCourse>(workingDayCourses, course.workingDayCourse),
    );
    this.trainingProgramsSharedCollection.update(trainingPrograms =>
      this.trainingProgramService.addTrainingProgramToCollectionIfMissing<ITrainingProgram>(trainingPrograms, course.trainingProgram),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.courseStatusService
      .query()
      .pipe(map((res: HttpResponse<ICourseStatus[]>) => res.body ?? []))
      .pipe(
        map((courseStatuses: ICourseStatus[]) =>
          this.courseStatusService.addCourseStatusToCollectionIfMissing<ICourseStatus>(courseStatuses, this.course?.courseStatus),
        ),
      )
      .subscribe((courseStatuses: ICourseStatus[]) => this.courseStatusesSharedCollection.set(courseStatuses));

    this.workingDayCourseService
      .query()
      .pipe(map((res: HttpResponse<IWorkingDayCourse[]>) => res.body ?? []))
      .pipe(
        map((workingDayCourses: IWorkingDayCourse[]) =>
          this.workingDayCourseService.addWorkingDayCourseToCollectionIfMissing<IWorkingDayCourse>(
            workingDayCourses,
            this.course?.workingDayCourse,
          ),
        ),
      )
      .subscribe((workingDayCourses: IWorkingDayCourse[]) => this.workingDayCoursesSharedCollection.set(workingDayCourses));

    this.trainingProgramService
      .query()
      .pipe(map((res: HttpResponse<ITrainingProgram[]>) => res.body ?? []))
      .pipe(
        map((trainingPrograms: ITrainingProgram[]) =>
          this.trainingProgramService.addTrainingProgramToCollectionIfMissing<ITrainingProgram>(
            trainingPrograms,
            this.course?.trainingProgram,
          ),
        ),
      )
      .subscribe((trainingPrograms: ITrainingProgram[]) => this.trainingProgramsSharedCollection.set(trainingPrograms));
  }
}
