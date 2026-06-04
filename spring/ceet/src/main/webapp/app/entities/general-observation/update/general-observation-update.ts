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
import { IProjectGroup } from 'app/entities/project-group/project-group.model';
import { ProjectGroupService } from 'app/entities/project-group/service/project-group.service';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IGeneralObservation } from '../general-observation.model';
import { GeneralObservationService } from '../service/general-observation.service';

import { GeneralObservationFormGroup, GeneralObservationFormService } from './general-observation-form.service';

@Component({
  selector: 'ceet-general-observation-update',
  templateUrl: './general-observation-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class GeneralObservationUpdate implements OnInit {
  readonly isSaving = signal(false);
  generalObservation: IGeneralObservation | null = null;

  projectGroupsSharedCollection = signal<IProjectGroup[]>([]);
  customersSharedCollection = signal<ICustomer[]>([]);

  protected generalObservationService = inject(GeneralObservationService);
  protected generalObservationFormService = inject(GeneralObservationFormService);
  protected projectGroupService = inject(ProjectGroupService);
  protected customerService = inject(CustomerService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: GeneralObservationFormGroup = this.generalObservationFormService.createGeneralObservationFormGroup();

  compareProjectGroup = (o1: IProjectGroup | null, o2: IProjectGroup | null): boolean =>
    this.projectGroupService.compareProjectGroup(o1, o2);

  compareCustomer = (o1: ICustomer | null, o2: ICustomer | null): boolean => this.customerService.compareCustomer(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ generalObservation }) => {
      this.generalObservation = generalObservation;
      if (generalObservation) {
        this.updateForm(generalObservation);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const generalObservation = this.generalObservationFormService.getGeneralObservation(this.editForm);
    if (generalObservation.id === null) {
      this.subscribeToSaveResponse(this.generalObservationService.create(generalObservation));
    } else {
      this.subscribeToSaveResponse(this.generalObservationService.update(generalObservation));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IGeneralObservation | null>): void {
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

  protected updateForm(generalObservation: IGeneralObservation): void {
    this.generalObservation = generalObservation;
    this.generalObservationFormService.resetForm(this.editForm, generalObservation);

    this.projectGroupsSharedCollection.update(projectGroups =>
      this.projectGroupService.addProjectGroupToCollectionIfMissing<IProjectGroup>(projectGroups, generalObservation.projectGroup),
    );
    this.customersSharedCollection.update(customers =>
      this.customerService.addCustomerToCollectionIfMissing<ICustomer>(customers, generalObservation.customer),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.projectGroupService
      .query()
      .pipe(map((res: HttpResponse<IProjectGroup[]>) => res.body ?? []))
      .pipe(
        map((projectGroups: IProjectGroup[]) =>
          this.projectGroupService.addProjectGroupToCollectionIfMissing<IProjectGroup>(
            projectGroups,
            this.generalObservation?.projectGroup,
          ),
        ),
      )
      .subscribe((projectGroups: IProjectGroup[]) => this.projectGroupsSharedCollection.set(projectGroups));

    this.customerService
      .query()
      .pipe(map((res: HttpResponse<ICustomer[]>) => res.body ?? []))
      .pipe(
        map((customers: ICustomer[]) =>
          this.customerService.addCustomerToCollectionIfMissing<ICustomer>(customers, this.generalObservation?.customer),
        ),
      )
      .subscribe((customers: ICustomer[]) => this.customersSharedCollection.set(customers));
  }
}
