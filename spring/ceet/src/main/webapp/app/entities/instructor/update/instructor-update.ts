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
import { State } from 'app/entities/enumerations/state.model';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IInstructor } from '../instructor.model';
import { InstructorService } from '../service/instructor.service';

import { InstructorFormGroup, InstructorFormService } from './instructor-form.service';

@Component({
  selector: 'ceet-instructor-update',
  templateUrl: './instructor-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class InstructorUpdate implements OnInit {
  readonly isSaving = signal(false);
  instructor: IInstructor | null = null;
  stateValues = Object.keys(State);

  customersSharedCollection = signal<ICustomer[]>([]);

  protected instructorService = inject(InstructorService);
  protected instructorFormService = inject(InstructorFormService);
  protected customerService = inject(CustomerService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: InstructorFormGroup = this.instructorFormService.createInstructorFormGroup();

  compareCustomer = (o1: ICustomer | null, o2: ICustomer | null): boolean => this.customerService.compareCustomer(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ instructor }) => {
      this.instructor = instructor;
      if (instructor) {
        this.updateForm(instructor);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const instructor = this.instructorFormService.getInstructor(this.editForm);
    if (instructor.id === null) {
      this.subscribeToSaveResponse(this.instructorService.create(instructor));
    } else {
      this.subscribeToSaveResponse(this.instructorService.update(instructor));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IInstructor | null>): void {
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

  protected updateForm(instructor: IInstructor): void {
    this.instructor = instructor;
    this.instructorFormService.resetForm(this.editForm, instructor);

    this.customersSharedCollection.update(customers =>
      this.customerService.addCustomerToCollectionIfMissing<ICustomer>(customers, instructor.customer),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.customerService
      .query()
      .pipe(map((res: HttpResponse<ICustomer[]>) => res.body ?? []))
      .pipe(
        map((customers: ICustomer[]) =>
          this.customerService.addCustomerToCollectionIfMissing<ICustomer>(customers, this.instructor?.customer),
        ),
      )
      .subscribe((customers: ICustomer[]) => this.customersSharedCollection.set(customers));
  }
}
