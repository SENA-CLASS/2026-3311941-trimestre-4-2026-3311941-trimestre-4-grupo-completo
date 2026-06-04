import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { TrainingStatusDetail } from './training-status-detail';

describe('TrainingStatus Management Detail Component', () => {
  let comp: TrainingStatusDetail;
  let fixture: ComponentFixture<TrainingStatusDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./training-status-detail').then(m => m.TrainingStatusDetail),
              resolve: { trainingStatus: () => of({ id: '053bf031-a284-46fd-8586-1a656a154cf3' }) },
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
    fixture = TestBed.createComponent(TrainingStatusDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load trainingStatus on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TrainingStatusDetail);

      // THEN
      expect(instance.trainingStatus()).toEqual(expect.objectContaining({ id: '053bf031-a284-46fd-8586-1a656a154cf3' }));
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
