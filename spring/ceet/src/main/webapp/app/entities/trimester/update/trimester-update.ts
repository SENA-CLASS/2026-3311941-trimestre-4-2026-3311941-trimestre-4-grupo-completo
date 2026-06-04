import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ILevelEducation } from 'app/entities/level-education/level-education.model';
import { LevelEducationService } from 'app/entities/level-education/service/level-education.service';
import { WorkingDayCourseService } from 'app/entities/working-day-course/service/working-day-course.service';
import { IWorkingDayCourse } from 'app/entities/working-day-course/working-day-course.model';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { TrimesterService } from '../service/trimester.service';
import { ITrimester } from '../trimester.model';

import { TrimesterFormGroup, TrimesterFormService } from './trimester-form.service';

@Component({
  selector: 'ceet-trimester-update',
  templateUrl: './trimester-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class TrimesterUpdate implements OnInit {
  readonly isSaving = signal(false);
  trimester: ITrimester | null = null;

  workingDayCoursesSharedCollection = signal<IWorkingDayCourse[]>([]);
  levelEducationsSharedCollection = signal<ILevelEducation[]>([]);

  protected trimesterService = inject(TrimesterService);
  protected trimesterFormService = inject(TrimesterFormService);
  protected workingDayCourseService = inject(WorkingDayCourseService);
  protected levelEducationService = inject(LevelEducationService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TrimesterFormGroup = this.trimesterFormService.createTrimesterFormGroup();

  compareWorkingDayCourse = (o1: IWorkingDayCourse | null, o2: IWorkingDayCourse | null): boolean =>
    this.workingDayCourseService.compareWorkingDayCourse(o1, o2);

  compareLevelEducation = (o1: ILevelEducation | null, o2: ILevelEducation | null): boolean =>
    this.levelEducationService.compareLevelEducation(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ trimester }) => {
      this.trimester = trimester;
      if (trimester) {
        this.updateForm(trimester);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const trimester = this.trimesterFormService.getTrimester(this.editForm);
    if (trimester.id === null) {
      this.subscribeToSaveResponse(this.trimesterService.create(trimester));
    } else {
      this.subscribeToSaveResponse(this.trimesterService.update(trimester));
    }
  }

  protected subscribeToSaveResponse(result: Observable<ITrimester | null>): void {
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

  protected updateForm(trimester: ITrimester): void {
    this.trimester = trimester;
    this.trimesterFormService.resetForm(this.editForm, trimester);

    this.workingDayCoursesSharedCollection.update(workingDayCourses =>
      this.workingDayCourseService.addWorkingDayCourseToCollectionIfMissing<IWorkingDayCourse>(
        workingDayCourses,
        trimester.workingDayCourse,
      ),
    );
    this.levelEducationsSharedCollection.update(levelEducations =>
      this.levelEducationService.addLevelEducationToCollectionIfMissing<ILevelEducation>(levelEducations, trimester.levelEducations),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.workingDayCourseService
      .query()
      .pipe(map((res: HttpResponse<IWorkingDayCourse[]>) => res.body ?? []))
      .pipe(
        map((workingDayCourses: IWorkingDayCourse[]) =>
          this.workingDayCourseService.addWorkingDayCourseToCollectionIfMissing<IWorkingDayCourse>(
            workingDayCourses,
            this.trimester?.workingDayCourse,
          ),
        ),
      )
      .subscribe((workingDayCourses: IWorkingDayCourse[]) => this.workingDayCoursesSharedCollection.set(workingDayCourses));

    this.levelEducationService
      .query()
      .pipe(map((res: HttpResponse<ILevelEducation[]>) => res.body ?? []))
      .pipe(
        map((levelEducations: ILevelEducation[]) =>
          this.levelEducationService.addLevelEducationToCollectionIfMissing<ILevelEducation>(
            levelEducations,
            this.trimester?.levelEducations,
          ),
        ),
      )
      .subscribe((levelEducations: ILevelEducation[]) => this.levelEducationsSharedCollection.set(levelEducations));
  }
}
