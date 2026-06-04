import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { ProjectActivityDetail } from './project-activity-detail';

describe('ProjectActivity Management Detail Component', () => {
  let comp: ProjectActivityDetail;
  let fixture: ComponentFixture<ProjectActivityDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./project-activity-detail').then(m => m.ProjectActivityDetail),
              resolve: { projectActivity: () => of({ id: 'ce18f414-2724-443b-a81a-1f9d591eb13c' }) },
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
    fixture = TestBed.createComponent(ProjectActivityDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load projectActivity on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ProjectActivityDetail);

      // THEN
      expect(instance.projectActivity()).toEqual(expect.objectContaining({ id: 'ce18f414-2724-443b-a81a-1f9d591eb13c' }));
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
