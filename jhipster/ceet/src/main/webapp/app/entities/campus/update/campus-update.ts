import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, finalize } from 'rxjs';

import { State } from 'app/entities/enumerations/state.model';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { ICampus } from '../campus.model';
import { CampusService } from '../service/campus.service';

import { CampusFormGroup, CampusFormService } from './campus-form.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ceet-campus-update',
  templateUrl: './campus-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class CampusUpdate implements OnInit {
  readonly isSaving = signal(false);
  campus: ICampus | null = null;
  stateValues = Object.keys(State);

  protected campusService = inject(CampusService);
  protected campusFormService = inject(CampusFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CampusFormGroup = this.campusFormService.createCampusFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ campus }) => {
      this.campus = campus;
      if (campus) {
        this.updateForm(campus);
      }
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const campus = this.campusFormService.getCampus(this.editForm);
    if (campus.id === null) {
      this.subscribeToSaveResponse(this.campusService.create(campus));
    } else {
      this.subscribeToSaveResponse(this.campusService.update(campus));
    }
  }

  protected subscribeToSaveResponse(result: Observable<ICampus | null>): void {
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

  protected updateForm(campus: ICampus): void {
    this.campus = campus;
    this.campusFormService.resetForm(this.editForm, campus);
  }
}
