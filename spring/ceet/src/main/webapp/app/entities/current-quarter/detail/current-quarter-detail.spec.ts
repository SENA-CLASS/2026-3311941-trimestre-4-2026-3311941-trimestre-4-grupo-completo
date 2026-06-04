import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { CurrentQuarterDetail } from './current-quarter-detail';

describe('CurrentQuarter Management Detail Component', () => {
  let comp: CurrentQuarterDetail;
  let fixture: ComponentFixture<CurrentQuarterDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./current-quarter-detail').then(m => m.CurrentQuarterDetail),
              resolve: { currentQuarter: () => of({ id: '0ed02114-2749-41f7-9a38-0f3348269a95' }) },
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
    fixture = TestBed.createComponent(CurrentQuarterDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load currentQuarter on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CurrentQuarterDetail);

      // THEN
      expect(instance.currentQuarter()).toEqual(expect.objectContaining({ id: '0ed02114-2749-41f7-9a38-0f3348269a95' }));
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
