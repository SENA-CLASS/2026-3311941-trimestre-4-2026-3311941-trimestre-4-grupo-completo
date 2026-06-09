import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { GeneralObservationDetail } from './general-observation-detail';

describe('GeneralObservation Management Detail Component', () => {
  let comp: GeneralObservationDetail;
  let fixture: ComponentFixture<GeneralObservationDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./general-observation-detail').then(m => m.GeneralObservationDetail),
              resolve: { generalObservation: () => of({ id: '43fc97fc-e912-46cc-a597-4921483b760d' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    });
    const library = TestBed.inject(FaIconLibrary);
    library.addIcons(faArrowLeft);
    library.addIcons(faPencilAlt);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralObservationDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load generalObservation on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', GeneralObservationDetail);

      // THEN
      expect(instance.generalObservation()).toEqual(expect.objectContaining({ id: '43fc97fc-e912-46cc-a597-4921483b760d' }));
    });
  });

  describe('PreviousState', () => {
    it('should navigate to previous state', () => {
      vitest.spyOn(globalThis.history, 'back');
      comp.previousState();
      expect(globalThis.history.back).toHaveBeenCalled();
    });
  });
});
