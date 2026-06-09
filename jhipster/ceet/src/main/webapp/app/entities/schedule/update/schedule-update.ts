import { HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, finalize, map } from 'rxjs';

import { ICourseTrimester } from 'app/entities/course-trimester/course-trimester.model';
import { IDay } from 'app/entities/day/day.model';
import { DayService } from 'app/entities/day/service/day.service';
import { CourseTrimesterService } from 'app/entities/course-trimester/service/course-trimester.service';
import { IClassroom } from 'app/entities/classroom/classroom.model';
import { ClassroomService } from 'app/entities/classroom/service/classroom.service';
import { IInstructor } from 'app/entities/instructor/instructor.model';
import { InstructorService } from 'app/entities/instructor/service/instructor.service';
import { IModality } from 'app/entities/modality/modality.model';
import { ModalityService } from 'app/entities/modality/service/modality.service';
import { IScheduleVersion } from 'app/entities/schedule-version/schedule-version.model';
import { ScheduleVersionService } from 'app/entities/schedule-version/service/schedule-version.service';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { ISchedule } from '../schedule.model';
import { ScheduleService } from '../service/schedule.service';

import { ScheduleFormGroup, ScheduleFormService } from './schedule-form.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ceet-schedule-update',
  templateUrl: './schedule-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class ScheduleUpdate implements OnInit {
  readonly isSaving = signal(false);
  schedule: ISchedule | null = null;

  scheduleVersionsSharedCollection = signal<IScheduleVersion[]>([]);
  modalitiesSharedCollection = signal<IModality[]>([]);
  daysSharedCollection = signal<IDay[]>([]);
  courseTrimestersSharedCollection = signal<ICourseTrimester[]>([]);
  classroomsSharedCollection = signal<IClassroom[]>([]);
  instructorsSharedCollection = signal<IInstructor[]>([]);

  protected scheduleService = inject(ScheduleService);
  protected scheduleFormService = inject(ScheduleFormService);
  protected scheduleVersionService = inject(ScheduleVersionService);
  protected modalityService = inject(ModalityService);
  protected dayService = inject(DayService);
  protected courseTrimesterService = inject(CourseTrimesterService);
  protected classroomService = inject(ClassroomService);
  protected instructorService = inject(InstructorService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ScheduleFormGroup = this.scheduleFormService.createScheduleFormGroup();

  compareScheduleVersion = (o1: IScheduleVersion | null, o2: IScheduleVersion | null): boolean =>
    this.scheduleVersionService.compareScheduleVersion(o1, o2);

  compareModality = (o1: IModality | null, o2: IModality | null): boolean => this.modalityService.compareModality(o1, o2);

  compareDay = (o1: IDay | null, o2: IDay | null): boolean => this.dayService.compareDay(o1, o2);

  compareCourseTrimester = (o1: ICourseTrimester | null, o2: ICourseTrimester | null): boolean =>
    this.courseTrimesterService.compareCourseTrimester(o1, o2);

  compareClassroom = (o1: IClassroom | null, o2: IClassroom | null): boolean => this.classroomService.compareClassroom(o1, o2);

  compareInstructor = (o1: IInstructor | null, o2: IInstructor | null): boolean => this.instructorService.compareInstructor(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ schedule }) => {
      this.schedule = schedule;
      if (schedule) {
        this.updateForm(schedule);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const schedule = this.scheduleFormService.getSchedule(this.editForm);
    if (schedule.id === null) {
      this.subscribeToSaveResponse(this.scheduleService.create(schedule));
    } else {
      this.subscribeToSaveResponse(this.scheduleService.update(schedule));
    }
  }

  protected subscribeToSaveResponse(result: Observable<ISchedule | null>): void {
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

  protected updateForm(schedule: ISchedule): void {
    this.schedule = schedule;
    this.scheduleFormService.resetForm(this.editForm, schedule);

    this.scheduleVersionsSharedCollection.update(scheduleVersions =>
      this.scheduleVersionService.addScheduleVersionToCollectionIfMissing<IScheduleVersion>(scheduleVersions, schedule.scheduleVersion),
    );
    this.modalitiesSharedCollection.update(modalities =>
      this.modalityService.addModalityToCollectionIfMissing<IModality>(modalities, schedule.modality),
    );
    this.daysSharedCollection.update(days => this.dayService.addDayToCollectionIfMissing<IDay>(days, schedule.day));
    this.courseTrimestersSharedCollection.update(courseTrimesters =>
      this.courseTrimesterService.addCourseTrimesterToCollectionIfMissing<ICourseTrimester>(courseTrimesters, schedule.courseTrimester),
    );
    this.classroomsSharedCollection.update(classrooms =>
      this.classroomService.addClassroomToCollectionIfMissing<IClassroom>(classrooms, schedule.classroom),
    );
    this.instructorsSharedCollection.update(instructors =>
      this.instructorService.addInstructorToCollectionIfMissing<IInstructor>(instructors, schedule.instructor),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.scheduleVersionService
      .query()
      .pipe(map((res: HttpResponse<IScheduleVersion[]>) => res.body ?? []))
      .pipe(
        map((scheduleVersions: IScheduleVersion[]) =>
          this.scheduleVersionService.addScheduleVersionToCollectionIfMissing<IScheduleVersion>(
            scheduleVersions,
            this.schedule?.scheduleVersion,
          ),
        ),
      )
      .subscribe((scheduleVersions: IScheduleVersion[]) => this.scheduleVersionsSharedCollection.set(scheduleVersions));

    this.modalityService
      .query()
      .pipe(map((res: HttpResponse<IModality[]>) => res.body ?? []))
      .pipe(
        map((modalities: IModality[]) =>
          this.modalityService.addModalityToCollectionIfMissing<IModality>(modalities, this.schedule?.modality),
        ),
      )
      .subscribe((modalities: IModality[]) => this.modalitiesSharedCollection.set(modalities));

    this.dayService
      .query()
      .pipe(map((res: HttpResponse<IDay[]>) => res.body ?? []))
      .pipe(map((days: IDay[]) => this.dayService.addDayToCollectionIfMissing<IDay>(days, this.schedule?.day)))
      .subscribe((days: IDay[]) => this.daysSharedCollection.set(days));

    this.courseTrimesterService
      .query()
      .pipe(map((res: HttpResponse<ICourseTrimester[]>) => res.body ?? []))
      .pipe(
        map((courseTrimesters: ICourseTrimester[]) =>
          this.courseTrimesterService.addCourseTrimesterToCollectionIfMissing<ICourseTrimester>(
            courseTrimesters,
            this.schedule?.courseTrimester,
          ),
        ),
      )
      .subscribe((courseTrimesters: ICourseTrimester[]) => this.courseTrimestersSharedCollection.set(courseTrimesters));

    this.classroomService
      .query()
      .pipe(map((res: HttpResponse<IClassroom[]>) => res.body ?? []))
      .pipe(
        map((classrooms: IClassroom[]) =>
          this.classroomService.addClassroomToCollectionIfMissing<IClassroom>(classrooms, this.schedule?.classroom),
        ),
      )
      .subscribe((classrooms: IClassroom[]) => this.classroomsSharedCollection.set(classrooms));

    this.instructorService
      .query()
      .pipe(map((res: HttpResponse<IInstructor[]>) => res.body ?? []))
      .pipe(
        map((instructors: IInstructor[]) =>
          this.instructorService.addInstructorToCollectionIfMissing<IInstructor>(instructors, this.schedule?.instructor),
        ),
      )
      .subscribe((instructors: IInstructor[]) => this.instructorsSharedCollection.set(instructors));
  }
}
