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
import { ILevelEducation } from '../level-education.model';
import { LevelEducationService } from '../service/level-education.service';

import { LevelEducationFormGroup, LevelEducationFormService } from './level-education-form.service';

@Component({
  selector: 'ceet-level-education-update',
  templateUrl: './level-education-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class LevelEducationUpdate implements OnInit {
  readonly isSaving = signal(false);
  levelEducation: ILevelEducation | null = null;
  stateValues = Object.keys(State);

  protected levelEducationService = inject(LevelEducationService);
  protected levelEducationFormService = inject(LevelEducationFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: LevelEducationFormGroup = this.levelEducationFormService.createLevelEducationFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ levelEducation }) => {
      this.levelEducation = levelEducation;
      if (levelEducation) {
        this.updateForm(levelEducation);
      }
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const levelEducation = this.levelEducationFormService.getLevelEducation(this.editForm);
    if (levelEducation.id === null) {
      this.subscribeToSaveResponse(this.levelEducationService.create(levelEducation));
    } else {
      this.subscribeToSaveResponse(this.levelEducationService.update(levelEducation));
    }
  }

  protected subscribeToSaveResponse(result: Observable<ILevelEducation | null>): void {
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

  protected updateForm(levelEducation: ILevelEducation): void {
    this.levelEducation = levelEducation;
    this.levelEducationFormService.resetForm(this.editForm, levelEducation);
  }
}
