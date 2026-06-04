import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICustomer } from 'app/entities/customer/customer.model';
import { CustomerService } from 'app/entities/customer/service/customer.service';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { ILogError } from '../log-error.model';
import { LogErrorService } from '../service/log-error.service';

import { LogErrorFormGroup, LogErrorFormService } from './log-error-form.service';

@Component({
  selector: 'ceet-log-error-update',
  templateUrl: './log-error-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class LogErrorUpdate implements OnInit {
  readonly isSaving = signal(false);
  logError: ILogError | null = null;

  customersSharedCollection = signal<ICustomer[]>([]);

  protected logErrorService = inject(LogErrorService);
  protected logErrorFormService = inject(LogErrorFormService);
  protected customerService = inject(CustomerService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: LogErrorFormGroup = this.logErrorFormService.createLogErrorFormGroup();

  compareCustomer = (o1: ICustomer | null, o2: ICustomer | null): boolean => this.customerService.compareCustomer(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ logError }) => {
      this.logError = logError;
      if (logError) {
        this.updateForm(logError);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const logError = this.logErrorFormService.getLogError(this.editForm);
    if (logError.id === null) {
      this.subscribeToSaveResponse(this.logErrorService.create(logError));
    } else {
      this.subscribeToSaveResponse(this.logErrorService.update(logError));
    }
  }

  protected subscribeToSaveResponse(result: Observable<ILogError | null>): void {
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

  protected updateForm(logError: ILogError): void {
    this.logError = logError;
    this.logErrorFormService.resetForm(this.editForm, logError);

    this.customersSharedCollection.update(customers =>
      this.customerService.addCustomerToCollectionIfMissing<ICustomer>(customers, logError.customer),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.customerService
      .query()
      .pipe(map((res: HttpResponse<ICustomer[]>) => res.body ?? []))
      .pipe(
        map((customers: ICustomer[]) =>
          this.customerService.addCustomerToCollectionIfMissing<ICustomer>(customers, this.logError?.customer),
        ),
      )
      .subscribe((customers: ICustomer[]) => this.customersSharedCollection.set(customers));
  }
}
