import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { LearningResultDetail } from './learning-result-detail';

describe('LearningResult Management Detail Component', () => {
  let comp: LearningResultDetail;
  let fixture: ComponentFixture<LearningResultDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./learning-result-detail').then(m => m.LearningResultDetail),
              resolve: { learningResult: () => of({ id: '3df09e7d-3257-43f7-9cef-54f68c48c0ac' }) },
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
    fixture = TestBed.createComponent(LearningResultDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load learningResult on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', LearningResultDetail);

      // THEN
      expect(instance.learningResult()).toEqual(expect.objectContaining({ id: '3df09e7d-3257-43f7-9cef-54f68c48c0ac' }));
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
