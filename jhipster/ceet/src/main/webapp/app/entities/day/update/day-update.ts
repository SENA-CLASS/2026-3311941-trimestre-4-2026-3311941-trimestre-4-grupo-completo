import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, finalize } from 'rxjs';

import { State } from 'app/entities/enumerations/state.model';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IDay } from '../day.model';
import { DayService } from '../service/day.service';

import { DayFormGroup, DayFormService } from './day-form.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ceet-day-update',
  templateUrl: './day-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class DayUpdate implements OnInit {
  readonly isSaving = signal(false);
  day: IDay | null = null;
  stateValues = Object.keys(State);

  protected dayService = inject(DayService);
  protected dayFormService = inject(DayFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DayFormGroup = this.dayFormService.createDayFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ day }) => {
      this.day = day;
      if (day) {
        this.updateForm(day);
      }
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const day = this.dayFormService.getDay(this.editForm);
    if (day.id === null) {
      this.subscribeToSaveResponse(this.dayService.create(day));
    } else {
      this.subscribeToSaveResponse(this.dayService.update(day));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IDay | null>): void {
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

  protected updateForm(day: IDay): void {
    this.day = day;
    this.dayFormService.resetForm(this.editForm, day);
  }
}
