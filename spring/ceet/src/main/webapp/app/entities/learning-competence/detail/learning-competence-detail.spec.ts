import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { LearningCompetenceDetail } from './learning-competence-detail';

describe('LearningCompetence Management Detail Component', () => {
  let comp: LearningCompetenceDetail;
  let fixture: ComponentFixture<LearningCompetenceDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./learning-competence-detail').then(m => m.LearningCompetenceDetail),
              resolve: { learningCompetence: () => of({ id: '67a3ee40-7a88-4800-b512-8818586690b5' }) },
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
    fixture = TestBed.createComponent(LearningCompetenceDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load learningCompetence on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', LearningCompetenceDetail);

      // THEN
      expect(instance.learningCompetence()).toEqual(expect.objectContaining({ id: '67a3ee40-7a88-4800-b512-8818586690b5' }));
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
