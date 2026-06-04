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
import { YearService } from '../service/year.service';
import { IYear } from '../year.model';

import { YearFormGroup, YearFormService } from './year-form.service';

@Component({
  selector: 'ceet-year-update',
  templateUrl: './year-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class YearUpdate implements OnInit {
  readonly isSaving = signal(false);
  year: IYear | null = null;
  stateValues = Object.keys(State);

  protected yearService = inject(YearService);
  protected yearFormService = inject(YearFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: YearFormGroup = this.yearFormService.createYearFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ year }) => {
      this.year = year;
      if (year) {
        this.updateForm(year);
      }
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const year = this.yearFormService.getYear(this.editForm);
    if (year.id === null) {
      this.subscribeToSaveResponse(this.yearService.create(year));
    } else {
      this.subscribeToSaveResponse(this.yearService.update(year));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IYear | null>): void {
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

  protected updateForm(year: IYear): void {
    this.year = year;
    this.yearFormService.resetForm(this.editForm, year);
  }
}
