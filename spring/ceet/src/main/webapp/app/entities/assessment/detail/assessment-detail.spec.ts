import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { AssessmentDetail } from './assessment-detail';

describe('Assessment Management Detail Component', () => {
  let comp: AssessmentDetail;
  let fixture: ComponentFixture<AssessmentDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./assessment-detail').then(m => m.AssessmentDetail),
              resolve: { assessment: () => of({ id: 'bb314d01-ba25-4918-b045-cdb0e554b9e7' }) },
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
    fixture = TestBed.createComponent(AssessmentDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load assessment on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', AssessmentDetail);

      // THEN
      expect(instance.assessment()).toEqual(expect.objectContaining({ id: 'bb314d01-ba25-4918-b045-cdb0e554b9e7' }));
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
