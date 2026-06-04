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
import { IPlanning } from '../planning.model';
import { PlanningService } from '../service/planning.service';

import { PlanningFormGroup, PlanningFormService } from './planning-form.service';

@Component({
  selector: 'ceet-planning-update',
  templateUrl: './planning-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class PlanningUpdate implements OnInit {
  readonly isSaving = signal(false);
  planning: IPlanning | null = null;
  stateValues = Object.keys(State);

  protected planningService = inject(PlanningService);
  protected planningFormService = inject(PlanningFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: PlanningFormGroup = this.planningFormService.createPlanningFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ planning }) => {
      this.planning = planning;
      if (planning) {
        this.updateForm(planning);
      }
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const planning = this.planningFormService.getPlanning(this.editForm);
    if (planning.id === null) {
      this.subscribeToSaveResponse(this.planningService.create(planning));
    } else {
      this.subscribeToSaveResponse(this.planningService.update(planning));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IPlanning | null>): void {
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

  protected updateForm(planning: IPlanning): void {
    this.planning = planning;
    this.planningFormService.resetForm(this.editForm, planning);
  }
}
