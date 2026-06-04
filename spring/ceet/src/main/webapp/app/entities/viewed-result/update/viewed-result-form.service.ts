import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IViewedResult, NewViewedResult } from '../viewed-result.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IViewedResult for edit and NewViewedResultFormGroupInput for create.
 */
type ViewedResultFormGroupInput = IViewedResult | PartialWithRequiredKeyOf<NewViewedResult>;

type ViewedResultFormDefaults = Pick<NewViewedResult, 'id'>;

type ViewedResultFormGroupContent = {
  id: FormControl<IViewedResult['id'] | NewViewedResult['id']>;
  courseTrimester: FormControl<IViewedResult['courseTrimester']>;
  planning: FormControl<IViewedResult['planning']>;
  learningResult: FormControl<IViewedResult['learningResult']>;
};

export type ViewedResultFormGroup = FormGroup<ViewedResultFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ViewedResultFormService {
  createViewedResultFormGroup(viewedResult?: ViewedResultFormGroupInput): ViewedResultFormGroup {
    const viewedResultRawValue = {
      ...this.getFormDefaults(),
      ...(viewedResult ?? { id: null }),
    };
    return new FormGroup<ViewedResultFormGroupContent>({
      id: new FormControl(
        { value: viewedResultRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      courseTrimester: new FormControl(viewedResultRawValue.courseTrimester, {
        validators: [Validators.required],
      }),
      planning: new FormControl(viewedResultRawValue.planning, {
        validators: [Validators.required],
      }),
      learningResult: new FormControl(viewedResultRawValue.learningResult, {
        validators: [Validators.required],
      }),
    });
  }

  getViewedResult(form: ViewedResultFormGroup): IViewedResult | NewViewedResult {
    return form.getRawValue() as IViewedResult | NewViewedResult;
  }

  resetForm(form: ViewedResultFormGroup, viewedResult: ViewedResultFormGroupInput): void {
    const viewedResultRawValue = { ...this.getFormDefaults(), ...viewedResult };
    form.reset({
      ...viewedResultRawValue,
      id: { value: viewedResultRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): ViewedResultFormDefaults {
    return {
      id: null,
    };
  }
}
