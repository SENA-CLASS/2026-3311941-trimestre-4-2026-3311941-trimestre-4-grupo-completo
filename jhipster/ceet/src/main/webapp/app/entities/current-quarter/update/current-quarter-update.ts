import { HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap/datepicker';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, finalize, map } from 'rxjs';

import { State } from 'app/entities/enumerations/state.model';
import { YearService } from 'app/entities/year/service/year.service';
import { IYear } from 'app/entities/year/year.model';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { ICurrentQuarter } from '../current-quarter.model';
import { CurrentQuarterService } from '../service/current-quarter.service';

import { CurrentQuarterFormGroup, CurrentQuarterFormService } from './current-quarter-form.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ceet-current-quarter-update',
  templateUrl: './current-quarter-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule, NgbInputDatepicker],
})
export class CurrentQuarterUpdate implements OnInit {
  readonly isSaving = signal(false);
  currentQuarter: ICurrentQuarter | null = null;
  stateValues = Object.keys(State);

  yearsSharedCollection = signal<IYear[]>([]);

  protected currentQuarterService = inject(CurrentQuarterService);
  protected currentQuarterFormService = inject(CurrentQuarterFormService);
  protected yearService = inject(YearService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CurrentQuarterFormGroup = this.currentQuarterFormService.createCurrentQuarterFormGroup();

  compareYear = (o1: IYear | null, o2: IYear | null): boolean => this.yearService.compareYear(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ currentQuarter }) => {
      this.currentQuarter = currentQuarter;
      if (currentQuarter) {
        this.updateForm(currentQuarter);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const currentQuarter = this.currentQuarterFormService.getCurrentQuarter(this.editForm);
    if (currentQuarter.id === null) {
      this.subscribeToSaveResponse(this.currentQuarterService.create(currentQuarter));
    } else {
      this.subscribeToSaveResponse(this.currentQuarterService.update(currentQuarter));
    }
  }

  protected subscribeToSaveResponse(result: Observable<ICurrentQuarter | null>): void {
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

  protected updateForm(currentQuarter: ICurrentQuarter): void {
    this.currentQuarter = currentQuarter;
    this.currentQuarterFormService.resetForm(this.editForm, currentQuarter);

    this.yearsSharedCollection.update(years => this.yearService.addYearToCollectionIfMissing<IYear>(years, currentQuarter.year));
  }

  protected loadRelationshipsOptions(): void {
    this.yearService
      .query()
      .pipe(map((res: HttpResponse<IYear[]>) => res.body ?? []))
      .pipe(map((years: IYear[]) => this.yearService.addYearToCollectionIfMissing<IYear>(years, this.currentQuarter?.year)))
      .subscribe((years: IYear[]) => this.yearsSharedCollection.set(years));
  }
}
