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
import { TrainingStatusService } from '../service/training-status.service';
import { ITrainingStatus } from '../training-status.model';

import { TrainingStatusFormGroup, TrainingStatusFormService } from './training-status-form.service';

@Component({
  selector: 'ceet-training-status-update',
  templateUrl: './training-status-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class TrainingStatusUpdate implements OnInit {
  readonly isSaving = signal(false);
  trainingStatus: ITrainingStatus | null = null;
  stateValues = Object.keys(State);

  protected trainingStatusService = inject(TrainingStatusService);
  protected trainingStatusFormService = inject(TrainingStatusFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TrainingStatusFormGroup = this.trainingStatusFormService.createTrainingStatusFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ trainingStatus }) => {
      this.trainingStatus = trainingStatus;
      if (trainingStatus) {
        this.updateForm(trainingStatus);
      }
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const trainingStatus = this.trainingStatusFormService.getTrainingStatus(this.editForm);
    if (trainingStatus.id === null) {
      this.subscribeToSaveResponse(this.trainingStatusService.create(trainingStatus));
    } else {
      this.subscribeToSaveResponse(this.trainingStatusService.update(trainingStatus));
    }
  }

  protected subscribeToSaveResponse(result: Observable<ITrainingStatus | null>): void {
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

  protected updateForm(trainingStatus: ITrainingStatus): void {
    this.trainingStatus = trainingStatus;
    this.trainingStatusFormService.resetForm(this.editForm, trainingStatus);
  }
}
