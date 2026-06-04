import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IClassroom } from 'app/entities/classroom/classroom.model';
import { ClassroomService } from 'app/entities/classroom/service/classroom.service';
import { ILearningResult } from 'app/entities/learning-result/learning-result.model';
import { LearningResultService } from 'app/entities/learning-result/service/learning-result.service';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IClassroomLimitation } from '../classroom-limitation.model';
import { ClassroomLimitationService } from '../service/classroom-limitation.service';

import { ClassroomLimitationFormGroup, ClassroomLimitationFormService } from './classroom-limitation-form.service';

@Component({
  selector: 'ceet-classroom-limitation-update',
  templateUrl: './classroom-limitation-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class ClassroomLimitationUpdate implements OnInit {
  readonly isSaving = signal(false);
  classroomLimitation: IClassroomLimitation | null = null;

  classroomsSharedCollection = signal<IClassroom[]>([]);
  learningResultsSharedCollection = signal<ILearningResult[]>([]);

  protected classroomLimitationService = inject(ClassroomLimitationService);
  protected classroomLimitationFormService = inject(ClassroomLimitationFormService);
  protected classroomService = inject(ClassroomService);
  protected learningResultService = inject(LearningResultService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ClassroomLimitationFormGroup = this.classroomLimitationFormService.createClassroomLimitationFormGroup();

  compareClassroom = (o1: IClassroom | null, o2: IClassroom | null): boolean => this.classroomService.compareClassroom(o1, o2);

  compareLearningResult = (o1: ILearningResult | null, o2: ILearningResult | null): boolean =>
    this.learningResultService.compareLearningResult(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ classroomLimitation }) => {
      this.classroomLimitation = classroomLimitation;
      if (classroomLimitation) {
        this.updateForm(classroomLimitation);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const classroomLimitation = this.classroomLimitationFormService.getClassroomLimitation(this.editForm);
    if (classroomLimitation.id === null) {
      this.subscribeToSaveResponse(this.classroomLimitationService.create(classroomLimitation));
    } else {
      this.subscribeToSaveResponse(this.classroomLimitationService.update(classroomLimitation));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IClassroomLimitation | null>): void {
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

  protected updateForm(classroomLimitation: IClassroomLimitation): void {
    this.classroomLimitation = classroomLimitation;
    this.classroomLimitationFormService.resetForm(this.editForm, classroomLimitation);

    this.classroomsSharedCollection.update(classrooms =>
      this.classroomService.addClassroomToCollectionIfMissing<IClassroom>(classrooms, classroomLimitation.classroom),
    );
    this.learningResultsSharedCollection.update(learningResults =>
      this.learningResultService.addLearningResultToCollectionIfMissing<ILearningResult>(
        learningResults,
        classroomLimitation.learningResult,
      ),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.classroomService
      .query()
      .pipe(map((res: HttpResponse<IClassroom[]>) => res.body ?? []))
      .pipe(
        map((classrooms: IClassroom[]) =>
          this.classroomService.addClassroomToCollectionIfMissing<IClassroom>(classrooms, this.classroomLimitation?.classroom),
        ),
      )
      .subscribe((classrooms: IClassroom[]) => this.classroomsSharedCollection.set(classrooms));

    this.learningResultService
      .query()
      .pipe(map((res: HttpResponse<ILearningResult[]>) => res.body ?? []))
      .pipe(
        map((learningResults: ILearningResult[]) =>
          this.learningResultService.addLearningResultToCollectionIfMissing<ILearningResult>(
            learningResults,
            this.classroomLimitation?.learningResult,
          ),
        ),
      )
      .subscribe((learningResults: ILearningResult[]) => this.learningResultsSharedCollection.set(learningResults));
  }
}
