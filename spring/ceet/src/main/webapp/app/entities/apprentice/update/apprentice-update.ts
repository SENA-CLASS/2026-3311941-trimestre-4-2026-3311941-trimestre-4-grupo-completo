import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { ICustomer } from 'app/entities/customer/customer.model';
import { CustomerService } from 'app/entities/customer/service/customer.service';
import { TrainingStatusService } from 'app/entities/training-status/service/training-status.service';
import { ITrainingStatus } from 'app/entities/training-status/training-status.model';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';

import { IApprentice } from '../apprentice.model';
import { ApprenticeService } from '../service/apprentice.service';

import { ApprenticeFormGroup, ApprenticeFormService } from './apprentice-form.service';

@Component({
  selector: 'ceet-apprentice-update',
  templateUrl: './apprentice-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class ApprenticeUpdate implements OnInit {
  readonly isSaving = signal(false);
  apprentice: IApprentice | null = null;

  customersSharedCollection = signal<ICustomer[]>([]);
  trainingStatusesSharedCollection = signal<ITrainingStatus[]>([]);
  coursesSharedCollection = signal<ICourse[]>([]);

  protected apprenticeService = inject(ApprenticeService);
  protected apprenticeFormService = inject(ApprenticeFormService);
  protected customerService = inject(CustomerService);
  protected trainingStatusService = inject(TrainingStatusService);
  protected courseService = inject(CourseService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ApprenticeFormGroup = this.apprenticeFormService.createApprenticeFormGroup();

  compareCustomer = (o1: ICustomer | null, o2: ICustomer | null): boolean => this.customerService.compareCustomer(o1, o2);

  compareTrainingStatus = (o1: ITrainingStatus | null, o2: ITrainingStatus | null): boolean =>
    this.trainingStatusService.compareTrainingStatus(o1, o2);

  compareCourse = (o1: ICourse | null, o2: ICourse | null): boolean => this.courseService.compareCourse(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ apprentice }) => {
      this.apprentice = apprentice;
      if (apprentice) {
        this.updateForm(apprentice);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const apprentice = this.apprenticeFormService.getApprentice(this.editForm);
    if (apprentice.id === null) {
      this.subscribeToSaveResponse(this.apprenticeService.create(apprentice));
    } else {
      this.subscribeToSaveResponse(this.apprenticeService.update(apprentice));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IApprentice | null>): void {
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

  protected updateForm(apprentice: IApprentice): void {
    this.apprentice = apprentice;
    this.apprenticeFormService.resetForm(this.editForm, apprentice);

    this.customersSharedCollection.update(customers =>
      this.customerService.addCustomerToCollectionIfMissing<ICustomer>(customers, apprentice.customer),
    );
    this.trainingStatusesSharedCollection.update(trainingStatuses =>
      this.trainingStatusService.addTrainingStatusToCollectionIfMissing<ITrainingStatus>(trainingStatuses, apprentice.trainingStatus),
    );
    this.coursesSharedCollection.update(courses => this.courseService.addCourseToCollectionIfMissing<ICourse>(courses, apprentice.course));
  }

  protected loadRelationshipsOptions(): void {
    this.customerService
      .query()
      .pipe(map((res: HttpResponse<ICustomer[]>) => res.body ?? []))
      .pipe(
        map((customers: ICustomer[]) =>
          this.customerService.addCustomerToCollectionIfMissing<ICustomer>(customers, this.apprentice?.customer),
        ),
      )
      .subscribe((customers: ICustomer[]) => this.customersSharedCollection.set(customers));

    this.trainingStatusService
      .query()
      .pipe(map((res: HttpResponse<ITrainingStatus[]>) => res.body ?? []))
      .pipe(
        map((trainingStatuses: ITrainingStatus[]) =>
          this.trainingStatusService.addTrainingStatusToCollectionIfMissing<ITrainingStatus>(
            trainingStatuses,
            this.apprentice?.trainingStatus,
          ),
        ),
      )
      .subscribe((trainingStatuses: ITrainingStatus[]) => this.trainingStatusesSharedCollection.set(trainingStatuses));

    this.courseService
      .query()
      .pipe(map((res: HttpResponse<ICourse[]>) => res.body ?? []))
      .pipe(map((courses: ICourse[]) => this.courseService.addCourseToCollectionIfMissing<ICourse>(courses, this.apprentice?.course)))
      .subscribe((courses: ICourse[]) => this.coursesSharedCollection.set(courses));
  }
}
