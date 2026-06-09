import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, finalize } from 'rxjs';

import { State } from 'app/entities/enumerations/state.model';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IArea } from '../area.model';
import { AreaService } from '../service/area.service';

import { AreaFormGroup, AreaFormService } from './area-form.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ceet-area-update',
  templateUrl: './area-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class AreaUpdate implements OnInit {
  readonly isSaving = signal(false);
  area: IArea | null = null;
  stateValues = Object.keys(State);

  protected areaService = inject(AreaService);
  protected areaFormService = inject(AreaFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: AreaFormGroup = this.areaFormService.createAreaFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ area }) => {
      this.area = area;
      if (area) {
        this.updateForm(area);
      }
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const area = this.areaFormService.getArea(this.editForm);
    if (area.id === null) {
      this.subscribeToSaveResponse(this.areaService.create(area));
    } else {
      this.subscribeToSaveResponse(this.areaService.update(area));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IArea | null>): void {
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

  protected updateForm(area: IArea): void {
    this.area = area;
    this.areaFormService.resetForm(this.editForm, area);
  }
}
