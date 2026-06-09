import { HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, finalize, map } from 'rxjs';

import { ICampus } from 'app/entities/campus/campus.model';
import { CampusService } from 'app/entities/campus/service/campus.service';
import { IClassroomType } from 'app/entities/classroom-type/classroom-type.model';
import { ClassroomTypeService } from 'app/entities/classroom-type/service/classroom-type.service';
import { Limitation } from 'app/entities/enumerations/limitation.model';
import { State } from 'app/entities/enumerations/state.model';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';

import { IClassroom } from '../classroom.model';
import { ClassroomService } from '../service/classroom.service';

import { ClassroomFormGroup, ClassroomFormService } from './classroom-form.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ceet-classroom-update',
  templateUrl: './classroom-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class ClassroomUpdate implements OnInit {
  readonly isSaving = signal(false);
  classroom: IClassroom | null = null;
  stateValues = Object.keys(State);
  limitationValues = Object.keys(Limitation);

  classroomTypesSharedCollection = signal<IClassroomType[]>([]);
  campusesSharedCollection = signal<ICampus[]>([]);

  protected classroomService = inject(ClassroomService);
  protected classroomFormService = inject(ClassroomFormService);
  protected classroomTypeService = inject(ClassroomTypeService);
  protected campusService = inject(CampusService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ClassroomFormGroup = this.classroomFormService.createClassroomFormGroup();

  compareClassroomType = (o1: IClassroomType | null, o2: IClassroomType | null): boolean =>
    this.classroomTypeService.compareClassroomType(o1, o2);

  compareCampus = (o1: ICampus | null, o2: ICampus | null): boolean => this.campusService.compareCampus(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ classroom }) => {
      this.classroom = classroom;
      if (classroom) {
        this.updateForm(classroom);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const classroom = this.classroomFormService.getClassroom(this.editForm);
    if (classroom.id === null) {
      this.subscribeToSaveResponse(this.classroomService.create(classroom));
    } else {
      this.subscribeToSaveResponse(this.classroomService.update(classroom));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IClassroom | null>): void {
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

  protected updateForm(classroom: IClassroom): void {
    this.classroom = classroom;
    this.classroomFormService.resetForm(this.editForm, classroom);

    this.classroomTypesSharedCollection.update(classroomTypes =>
      this.classroomTypeService.addClassroomTypeToCollectionIfMissing<IClassroomType>(classroomTypes, classroom.classroomType),
    );
    this.campusesSharedCollection.update(campuses =>
      this.campusService.addCampusToCollectionIfMissing<ICampus>(campuses, classroom.campus),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.classroomTypeService
      .query()
      .pipe(map((res: HttpResponse<IClassroomType[]>) => res.body ?? []))
      .pipe(
        map((classroomTypes: IClassroomType[]) =>
          this.classroomTypeService.addClassroomTypeToCollectionIfMissing<IClassroomType>(classroomTypes, this.classroom?.classroomType),
        ),
      )
      .subscribe((classroomTypes: IClassroomType[]) => this.classroomTypesSharedCollection.set(classroomTypes));

    this.campusService
      .query()
      .pipe(map((res: HttpResponse<ICampus[]>) => res.body ?? []))
      .pipe(map((campuses: ICampus[]) => this.campusService.addCampusToCollectionIfMissing<ICampus>(campuses, this.classroom?.campus)))
      .subscribe((campuses: ICampus[]) => this.campusesSharedCollection.set(campuses));
  }
}
