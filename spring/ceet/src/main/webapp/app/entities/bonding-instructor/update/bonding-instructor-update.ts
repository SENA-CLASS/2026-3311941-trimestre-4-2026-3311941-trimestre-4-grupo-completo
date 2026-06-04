import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap/datepicker';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IBonding } from 'app/entities/bonding/bonding.model';
import { BondingService } from 'app/entities/bonding/service/bonding.service';
import { IInstructor } from 'app/entities/instructor/instructor.model';
import { YearService } from 'app/entities/year/service/year.service';
import { IYear } from 'app/entities/year/year.model';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';

import { IBondingInstructor } from '../bonding-instructor.model';
import { BondingInstructorService } from '../service/bonding-instructor.service';

import { BondingInstructorFormGroup, BondingInstructorFormService } from './bonding-instructor-form.service';
import { InstructorService } from 'app/entities/instructor/service/instructor.service';

@Component({
  selector: 'ceet-bonding-instructor-update',
  templateUrl: './bonding-instructor-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule, NgbInputDatepicker],
})
export class BondingInstructorUpdate implements OnInit {
  readonly isSaving = signal(false);
  bondingInstructor: IBondingInstructor | null = null;

  yearsSharedCollection = signal<IYear[]>([]);
  instructorsSharedCollection = signal<IInstructor[]>([]);
  bondingsSharedCollection = signal<IBonding[]>([]);

  protected bondingInstructorService = inject(BondingInstructorService);
  protected bondingInstructorFormService = inject(BondingInstructorFormService);
  protected yearService = inject(YearService);
  protected instructorService = inject(InstructorService);
  protected bondingService = inject(BondingService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: BondingInstructorFormGroup = this.bondingInstructorFormService.createBondingInstructorFormGroup();

  compareYear = (o1: IYear | null, o2: IYear | null): boolean => this.yearService.compareYear(o1, o2);

  compareInstructor = (o1: IInstructor | null, o2: IInstructor | null): boolean => this.instructorService.compareInstructor(o1, o2);

  compareBonding = (o1: IBonding | null, o2: IBonding | null): boolean => this.bondingService.compareBonding(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bondingInstructor }) => {
      this.bondingInstructor = bondingInstructor;
      if (bondingInstructor) {
        this.updateForm(bondingInstructor);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const bondingInstructor = this.bondingInstructorFormService.getBondingInstructor(this.editForm);
    if (bondingInstructor.id === null) {
      this.subscribeToSaveResponse(this.bondingInstructorService.create(bondingInstructor));
    } else {
      this.subscribeToSaveResponse(this.bondingInstructorService.update(bondingInstructor));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IBondingInstructor | null>): void {
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

  protected updateForm(bondingInstructor: IBondingInstructor): void {
    this.bondingInstructor = bondingInstructor;
    this.bondingInstructorFormService.resetForm(this.editForm, bondingInstructor);

    this.yearsSharedCollection.update(years => this.yearService.addYearToCollectionIfMissing<IYear>(years, bondingInstructor.year));
    this.instructorsSharedCollection.update(instructors =>
      this.instructorService.addInstructorToCollectionIfMissing<IInstructor>(instructors, bondingInstructor.instructor),
    );
    this.bondingsSharedCollection.update(bondings =>
      this.bondingService.addBondingToCollectionIfMissing<IBonding>(bondings, bondingInstructor.bonding),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.yearService
      .query()
      .pipe(map((res: HttpResponse<IYear[]>) => res.body ?? []))
      .pipe(map((years: IYear[]) => this.yearService.addYearToCollectionIfMissing<IYear>(years, this.bondingInstructor?.year)))
      .subscribe((years: IYear[]) => this.yearsSharedCollection.set(years));

    this.instructorService
      .query()
      .pipe(map((res: HttpResponse<IInstructor[]>) => res.body ?? []))
      .pipe(
        map((instructors: IInstructor[]) =>
          this.instructorService.addInstructorToCollectionIfMissing<IInstructor>(instructors, this.bondingInstructor?.instructor),
        ),
      )
      .subscribe((instructors: IInstructor[]) => this.instructorsSharedCollection.set(instructors));

    this.bondingService
      .query()
      .pipe(map((res: HttpResponse<IBonding[]>) => res.body ?? []))
      .pipe(
        map((bondings: IBonding[]) =>
          this.bondingService.addBondingToCollectionIfMissing<IBonding>(bondings, this.bondingInstructor?.bonding),
        ),
      )
      .subscribe((bondings: IBonding[]) => this.bondingsSharedCollection.set(bondings));
  }
}
