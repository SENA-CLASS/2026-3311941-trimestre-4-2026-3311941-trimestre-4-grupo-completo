import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { TrainingProgramDetail } from './training-program-detail';

describe('TrainingProgram Management Detail Component', () => {
  let comp: TrainingProgramDetail;
  let fixture: ComponentFixture<TrainingProgramDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./training-program-detail').then(m => m.TrainingProgramDetail),
              resolve: { trainingProgram: () => of({ id: 'e35ca12a-dfa0-4f9c-9ffb-b83e56d621c3' }) },
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
    fixture = TestBed.createComponent(TrainingProgramDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load trainingProgram on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TrainingProgramDetail);

      // THEN
      expect(instance.trainingProgram()).toEqual(expect.objectContaining({ id: 'e35ca12a-dfa0-4f9c-9ffb-b83e56d621c3' }));
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
