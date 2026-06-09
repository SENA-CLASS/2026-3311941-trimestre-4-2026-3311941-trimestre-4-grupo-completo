import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, finalize } from 'rxjs';

import { State } from 'app/entities/enumerations/state.model';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IBonding } from '../bonding.model';
import { BondingService } from '../service/bonding.service';

import { BondingFormGroup, BondingFormService } from './bonding-form.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ceet-bonding-update',
  templateUrl: './bonding-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class BondingUpdate implements OnInit {
  readonly isSaving = signal(false);
  bonding: IBonding | null = null;
  stateValues = Object.keys(State);

  protected bondingService = inject(BondingService);
  protected bondingFormService = inject(BondingFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: BondingFormGroup = this.bondingFormService.createBondingFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bonding }) => {
      this.bonding = bonding;
      if (bonding) {
        this.updateForm(bonding);
      }
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const bonding = this.bondingFormService.getBonding(this.editForm);
    if (bonding.id === null) {
      this.subscribeToSaveResponse(this.bondingService.create(bonding));
    } else {
      this.subscribeToSaveResponse(this.bondingService.update(bonding));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IBonding | null>): void {
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

  protected updateForm(bonding: IBonding): void {
    this.bonding = bonding;
    this.bondingFormService.resetForm(this.editForm, bonding);
  }
}
