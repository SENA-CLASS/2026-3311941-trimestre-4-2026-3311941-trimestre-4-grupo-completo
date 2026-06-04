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
import { IAssessment } from '../assessment.model';
import { AssessmentService } from '../service/assessment.service';

import { AssessmentFormGroup, AssessmentFormService } from './assessment-form.service';

@Component({
  selector: 'ceet-assessment-update',
  templateUrl: './assessment-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class AssessmentUpdate implements OnInit {
  readonly isSaving = signal(false);
  assessment: IAssessment | null = null;
  stateValues = Object.keys(State);

  protected assessmentService = inject(AssessmentService);
  protected assessmentFormService = inject(AssessmentFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: AssessmentFormGroup = this.assessmentFormService.createAssessmentFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ assessment }) => {
      this.assessment = assessment;
      if (assessment) {
        this.updateForm(assessment);
      }
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const assessment = this.assessmentFormService.getAssessment(this.editForm);
    if (assessment.id === null) {
      this.subscribeToSaveResponse(this.assessmentService.create(assessment));
    } else {
      this.subscribeToSaveResponse(this.assessmentService.update(assessment));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IAssessment | null>): void {
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

  protected updateForm(assessment: IAssessment): void {
    this.assessment = assessment;
    this.assessmentFormService.resetForm(this.editForm, assessment);
  }
}
