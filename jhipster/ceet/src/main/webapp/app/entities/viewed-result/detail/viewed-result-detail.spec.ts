import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { ViewedResultDetail } from './viewed-result-detail';

describe('ViewedResult Management Detail Component', () => {
  let comp: ViewedResultDetail;
  let fixture: ComponentFixture<ViewedResultDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./viewed-result-detail').then(m => m.ViewedResultDetail),
              resolve: { viewedResult: () => of({ id: 'dceb3c65-7ad5-4d2c-adee-22240c1d2286' }) },
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
    fixture = TestBed.createComponent(ViewedResultDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load viewedResult on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ViewedResultDetail);

      // THEN
      expect(instance.viewedResult()).toEqual(expect.objectContaining({ id: 'dceb3c65-7ad5-4d2c-adee-22240c1d2286' }));
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
