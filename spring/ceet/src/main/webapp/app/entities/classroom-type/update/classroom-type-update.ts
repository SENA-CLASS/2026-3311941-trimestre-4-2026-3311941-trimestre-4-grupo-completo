import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { State } from 'app/entities/enumerations/state.model';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IClassroomType } from '../classroom-type.model';
import { ClassroomTypeService } from '../service/classroom-type.service';

import { ClassroomTypeFormGroup, ClassroomTypeFormService } from './classroom-type-form.service';

@Component({
  selector: 'ceet-classroom-type-update',
  templateUrl: './classroom-type-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class ClassroomTypeUpdate implements OnInit {
  readonly isSaving = signal(false);
  classroomType: IClassroomType | null = null;
  stateValues = Object.keys(State);

  protected classroomTypeService = inject(ClassroomTypeService);
  protected classroomTypeFormService = inject(ClassroomTypeFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ClassroomTypeFormGroup = this.classroomTypeFormService.createClassroomTypeFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ classroomType }) => {
      this.classroomType = classroomType;
      if (classroomType) {
        this.updateForm(classroomType);
      }
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const classroomType = this.classroomTypeFormService.getClassroomType(this.editForm);
    if (classroomType.id === null) {
      this.subscribeToSaveResponse(this.classroomTypeService.create(classroomType));
    } else {
      this.subscribeToSaveResponse(this.classroomTypeService.update(classroomType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IClassroomType | null>): void {
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

  protected updateForm(classroomType: IClassroomType): void {
    this.classroomType = classroomType;
    this.classroomTypeFormService.resetForm(this.editForm, classroomType);
  }
}
