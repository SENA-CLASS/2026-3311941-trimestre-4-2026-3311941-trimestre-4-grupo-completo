import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IDocumentType } from 'app/entities/document-type/document-type.model';
import { DocumentTypeService } from 'app/entities/document-type/service/document-type.service';
import { UserService } from 'app/entities/user/service/user.service';
import { IUser } from 'app/entities/user/user.model';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { ICustomer } from '../customer.model';
import { CustomerService } from '../service/customer.service';

import { CustomerFormGroup, CustomerFormService } from './customer-form.service';

@Component({
  selector: 'ceet-customer-update',
  templateUrl: './customer-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class CustomerUpdate implements OnInit {
  readonly isSaving = signal(false);
  customer: ICustomer | null = null;

  usersSharedCollection = signal<IUser[]>([]);
  documentTypesSharedCollection = signal<IDocumentType[]>([]);

  protected customerService = inject(CustomerService);
  protected customerFormService = inject(CustomerFormService);
  protected userService = inject(UserService);
  protected documentTypeService = inject(DocumentTypeService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CustomerFormGroup = this.customerFormService.createCustomerFormGroup();

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  compareDocumentType = (o1: IDocumentType | null, o2: IDocumentType | null): boolean =>
    this.documentTypeService.compareDocumentType(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customer }) => {
      this.customer = customer;
      if (customer) {
        this.updateForm(customer);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const customer = this.customerFormService.getCustomer(this.editForm);
    if (customer.id === null) {
      this.subscribeToSaveResponse(this.customerService.create(customer));
    } else {
      this.subscribeToSaveResponse(this.customerService.update(customer));
    }
  }

  protected subscribeToSaveResponse(result: Observable<ICustomer | null>): void {
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

  protected updateForm(customer: ICustomer): void {
    this.customer = customer;
    this.customerFormService.resetForm(this.editForm, customer);

    this.usersSharedCollection.update(users => this.userService.addUserToCollectionIfMissing<IUser>(users, customer.user));
    this.documentTypesSharedCollection.update(documentTypes =>
      this.documentTypeService.addDocumentTypeToCollectionIfMissing<IDocumentType>(documentTypes, customer.documentType),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.customer?.user)))
      .subscribe((users: IUser[]) => this.usersSharedCollection.set(users));

    this.documentTypeService
      .query()
      .pipe(map((res: HttpResponse<IDocumentType[]>) => res.body ?? []))
      .pipe(
        map((documentTypes: IDocumentType[]) =>
          this.documentTypeService.addDocumentTypeToCollectionIfMissing<IDocumentType>(documentTypes, this.customer?.documentType),
        ),
      )
      .subscribe((documentTypes: IDocumentType[]) => this.documentTypesSharedCollection.set(documentTypes));
  }
}
