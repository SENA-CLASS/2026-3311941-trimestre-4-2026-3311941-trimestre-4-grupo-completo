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
import { IModality } from '../modality.model';
import { ModalityService } from '../service/modality.service';

import { ModalityFormGroup, ModalityFormService } from './modality-form.service';

@Component({
  selector: 'ceet-modality-update',
  templateUrl: './modality-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class ModalityUpdate implements OnInit {
  readonly isSaving = signal(false);
  modality: IModality | null = null;
  stateValues = Object.keys(State);

  protected modalityService = inject(ModalityService);
  protected modalityFormService = inject(ModalityFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ModalityFormGroup = this.modalityFormService.createModalityFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ modality }) => {
      this.modality = modality;
      if (modality) {
        this.updateForm(modality);
      }
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const modality = this.modalityFormService.getModality(this.editForm);
    if (modality.id === null) {
      this.subscribeToSaveResponse(this.modalityService.create(modality));
    } else {
      this.subscribeToSaveResponse(this.modalityService.update(modality));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IModality | null>): void {
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

  protected updateForm(modality: IModality): void {
    this.modality = modality;
    this.modalityFormService.resetForm(this.editForm, modality);
  }
}
