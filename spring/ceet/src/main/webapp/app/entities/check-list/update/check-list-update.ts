import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { State } from 'app/entities/enumerations/state.model';
import { TrainingProgramService } from 'app/entities/training-program/service/training-program.service';
import { ITrainingProgram } from 'app/entities/training-program/training-program.model';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { ICheckList } from '../check-list.model';
import { CheckListService } from '../service/check-list.service';

import { CheckListFormGroup, CheckListFormService } from './check-list-form.service';

@Component({
  selector: 'ceet-check-list-update',
  templateUrl: './check-list-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class CheckListUpdate implements OnInit {
  readonly isSaving = signal(false);
  checkList: ICheckList | null = null;
  stateValues = Object.keys(State);

  trainingProgramsSharedCollection = signal<ITrainingProgram[]>([]);

  protected checkListService = inject(CheckListService);
  protected checkListFormService = inject(CheckListFormService);
  protected trainingProgramService = inject(TrainingProgramService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CheckListFormGroup = this.checkListFormService.createCheckListFormGroup();

  compareTrainingProgram = (o1: ITrainingProgram | null, o2: ITrainingProgram | null): boolean =>
    this.trainingProgramService.compareTrainingProgram(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ checkList }) => {
      this.checkList = checkList;
      if (checkList) {
        this.updateForm(checkList);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const checkList = this.checkListFormService.getCheckList(this.editForm);
    if (checkList.id === null) {
      this.subscribeToSaveResponse(this.checkListService.create(checkList));
    } else {
      this.subscribeToSaveResponse(this.checkListService.update(checkList));
    }
  }

  protected subscribeToSaveResponse(result: Observable<ICheckList | null>): void {
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

  protected updateForm(checkList: ICheckList): void {
    this.checkList = checkList;
    this.checkListFormService.resetForm(this.editForm, checkList);

    this.trainingProgramsSharedCollection.update(trainingPrograms =>
      this.trainingProgramService.addTrainingProgramToCollectionIfMissing<ITrainingProgram>(trainingPrograms, checkList.trainingProgram),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.trainingProgramService
      .query()
      .pipe(map((res: HttpResponse<ITrainingProgram[]>) => res.body ?? []))
      .pipe(
        map((trainingPrograms: ITrainingProgram[]) =>
          this.trainingProgramService.addTrainingProgramToCollectionIfMissing<ITrainingProgram>(
            trainingPrograms,
            this.checkList?.trainingProgram,
          ),
        ),
      )
      .subscribe((trainingPrograms: ITrainingProgram[]) => this.trainingProgramsSharedCollection.set(trainingPrograms));
  }
}
