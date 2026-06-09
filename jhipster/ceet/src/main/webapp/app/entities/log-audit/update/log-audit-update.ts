import { HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, finalize, map } from 'rxjs';

import { ICustomer } from 'app/entities/customer/customer.model';
import { CustomerService } from 'app/entities/customer/service/customer.service';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { ILogAudit } from '../log-audit.model';
import { LogAuditService } from '../service/log-audit.service';

import { LogAuditFormGroup, LogAuditFormService } from './log-audit-form.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ceet-log-audit-update',
  templateUrl: './log-audit-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class LogAuditUpdate implements OnInit {
  readonly isSaving = signal(false);
  logAudit: ILogAudit | null = null;

  customersSharedCollection = signal<ICustomer[]>([]);

  protected logAuditService = inject(LogAuditService);
  protected logAuditFormService = inject(LogAuditFormService);
  protected customerService = inject(CustomerService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: LogAuditFormGroup = this.logAuditFormService.createLogAuditFormGroup();

  compareCustomer = (o1: ICustomer | null, o2: ICustomer | null): boolean => this.customerService.compareCustomer(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ logAudit }) => {
      this.logAudit = logAudit;
      if (logAudit) {
        this.updateForm(logAudit);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const logAudit = this.logAuditFormService.getLogAudit(this.editForm);
    if (logAudit.id === null) {
      this.subscribeToSaveResponse(this.logAuditService.create(logAudit));
    } else {
      this.subscribeToSaveResponse(this.logAuditService.update(logAudit));
    }
  }

  protected subscribeToSaveResponse(result: Observable<ILogAudit | null>): void {
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

  protected updateForm(logAudit: ILogAudit): void {
    this.logAudit = logAudit;
    this.logAuditFormService.resetForm(this.editForm, logAudit);

    this.customersSharedCollection.update(customers =>
      this.customerService.addCustomerToCollectionIfMissing<ICustomer>(customers, logAudit.customer),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.customerService
      .query()
      .pipe(map((res: HttpResponse<ICustomer[]>) => res.body ?? []))
      .pipe(
        map((customers: ICustomer[]) =>
          this.customerService.addCustomerToCollectionIfMissing<ICustomer>(customers, this.logAudit?.customer),
        ),
      )
      .subscribe((customers: ICustomer[]) => this.customersSharedCollection.set(customers));
  }
}
