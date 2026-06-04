import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { ProjectPhaseDetail } from './project-phase-detail';

describe('ProjectPhase Management Detail Component', () => {
  let comp: ProjectPhaseDetail;
  let fixture: ComponentFixture<ProjectPhaseDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./project-phase-detail').then(m => m.ProjectPhaseDetail),
              resolve: { projectPhase: () => of({ id: 'd6306830-4cd7-49d4-ae49-a650a81278f2' }) },
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
    fixture = TestBed.createComponent(ProjectPhaseDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load projectPhase on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ProjectPhaseDetail);

      // THEN
      expect(instance.projectPhase()).toEqual(expect.objectContaining({ id: 'd6306830-4cd7-49d4-ae49-a650a81278f2' }));
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
