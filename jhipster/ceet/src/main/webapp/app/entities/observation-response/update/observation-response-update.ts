import { HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, finalize, map } from 'rxjs';

import { ICustomer } from 'app/entities/customer/customer.model';
import { CustomerService } from 'app/entities/customer/service/customer.service';
import { IGroupResponse } from 'app/entities/group-response/group-response.model';
import { GroupResponseService } from 'app/entities/group-response/service/group-response.service';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IObservationResponse } from '../observation-response.model';
import { ObservationResponseService } from '../service/observation-response.service';

import { ObservationResponseFormGroup, ObservationResponseFormService } from './observation-response-form.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ceet-observation-response-update',
  templateUrl: './observation-response-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class ObservationResponseUpdate implements OnInit {
  readonly isSaving = signal(false);
  observationResponse: IObservationResponse | null = null;

  groupResponsesSharedCollection = signal<IGroupResponse[]>([]);
  customersSharedCollection = signal<ICustomer[]>([]);

  protected observationResponseService = inject(ObservationResponseService);
  protected observationResponseFormService = inject(ObservationResponseFormService);
  protected groupResponseService = inject(GroupResponseService);
  protected customerService = inject(CustomerService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ObservationResponseFormGroup = this.observationResponseFormService.createObservationResponseFormGroup();

  compareGroupResponse = (o1: IGroupResponse | null, o2: IGroupResponse | null): boolean =>
    this.groupResponseService.compareGroupResponse(o1, o2);

  compareCustomer = (o1: ICustomer | null, o2: ICustomer | null): boolean => this.customerService.compareCustomer(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ observationResponse }) => {
      this.observationResponse = observationResponse;
      if (observationResponse) {
        this.updateForm(observationResponse);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const observationResponse = this.observationResponseFormService.getObservationResponse(this.editForm);
    if (observationResponse.id === null) {
      this.subscribeToSaveResponse(this.observationResponseService.create(observationResponse));
    } else {
      this.subscribeToSaveResponse(this.observationResponseService.update(observationResponse));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IObservationResponse | null>): void {
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

  protected updateForm(observationResponse: IObservationResponse): void {
    this.observationResponse = observationResponse;
    this.observationResponseFormService.resetForm(this.editForm, observationResponse);

    this.groupResponsesSharedCollection.update(groupResponses =>
      this.groupResponseService.addGroupResponseToCollectionIfMissing<IGroupResponse>(groupResponses, observationResponse.groupResponse),
    );
    this.customersSharedCollection.update(customers =>
      this.customerService.addCustomerToCollectionIfMissing<ICustomer>(customers, observationResponse.customer),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.groupResponseService
      .query()
      .pipe(map((res: HttpResponse<IGroupResponse[]>) => res.body ?? []))
      .pipe(
        map((groupResponses: IGroupResponse[]) =>
          this.groupResponseService.addGroupResponseToCollectionIfMissing<IGroupResponse>(
            groupResponses,
            this.observationResponse?.groupResponse,
          ),
        ),
      )
      .subscribe((groupResponses: IGroupResponse[]) => this.groupResponsesSharedCollection.set(groupResponses));

    this.customerService
      .query()
      .pipe(map((res: HttpResponse<ICustomer[]>) => res.body ?? []))
      .pipe(
        map((customers: ICustomer[]) =>
          this.customerService.addCustomerToCollectionIfMissing<ICustomer>(customers, this.observationResponse?.customer),
        ),
      )
      .subscribe((customers: ICustomer[]) => this.customersSharedCollection.set(customers));
  }
}
