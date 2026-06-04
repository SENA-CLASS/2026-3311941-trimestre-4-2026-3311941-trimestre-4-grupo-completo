import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IArea } from 'app/entities/area/area.model';
import { AreaService } from 'app/entities/area/service/area.service';
import { State } from 'app/entities/enumerations/state.model';
import { IInstructor } from 'app/entities/instructor/instructor.model';
import { InstructorService } from 'app/entities/instructor/service/instructor.service';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IAreaInstructor } from '../area-instructor.model';
import { AreaInstructorService } from '../service/area-instructor.service';

import { AreaInstructorFormGroup, AreaInstructorFormService } from './area-instructor-form.service';

@Component({
  selector: 'ceet-area-instructor-update',
  templateUrl: './area-instructor-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class AreaInstructorUpdate implements OnInit {
  readonly isSaving = signal(false);
  areaInstructor: IAreaInstructor | null = null;
  stateValues = Object.keys(State);

  areasSharedCollection = signal<IArea[]>([]);
  instructorsSharedCollection = signal<IInstructor[]>([]);

  protected areaInstructorService = inject(AreaInstructorService);
  protected areaInstructorFormService = inject(AreaInstructorFormService);
  protected areaService = inject(AreaService);
  protected instructorService = inject(InstructorService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: AreaInstructorFormGroup = this.areaInstructorFormService.createAreaInstructorFormGroup();

  compareArea = (o1: IArea | null, o2: IArea | null): boolean => this.areaService.compareArea(o1, o2);

  compareInstructor = (o1: IInstructor | null, o2: IInstructor | null): boolean => this.instructorService.compareInstructor(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ areaInstructor }) => {
      this.areaInstructor = areaInstructor;
      if (areaInstructor) {
        this.updateForm(areaInstructor);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const areaInstructor = this.areaInstructorFormService.getAreaInstructor(this.editForm);
    if (areaInstructor.id === null) {
      this.subscribeToSaveResponse(this.areaInstructorService.create(areaInstructor));
    } else {
      this.subscribeToSaveResponse(this.areaInstructorService.update(areaInstructor));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IAreaInstructor | null>): void {
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

  protected updateForm(areaInstructor: IAreaInstructor): void {
    this.areaInstructor = areaInstructor;
    this.areaInstructorFormService.resetForm(this.editForm, areaInstructor);

    this.areasSharedCollection.update(areas => this.areaService.addAreaToCollectionIfMissing<IArea>(areas, areaInstructor.area));
    this.instructorsSharedCollection.update(instructors =>
      this.instructorService.addInstructorToCollectionIfMissing<IInstructor>(instructors, areaInstructor.instructor),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.areaService
      .query()
      .pipe(map((res: HttpResponse<IArea[]>) => res.body ?? []))
      .pipe(map((areas: IArea[]) => this.areaService.addAreaToCollectionIfMissing<IArea>(areas, this.areaInstructor?.area)))
      .subscribe((areas: IArea[]) => this.areasSharedCollection.set(areas));

    this.instructorService
      .query()
      .pipe(map((res: HttpResponse<IInstructor[]>) => res.body ?? []))
      .pipe(
        map((instructors: IInstructor[]) =>
          this.instructorService.addInstructorToCollectionIfMissing<IInstructor>(instructors, this.areaInstructor?.instructor),
        ),
      )
      .subscribe((instructors: IInstructor[]) => this.instructorsSharedCollection.set(instructors));
  }
}
