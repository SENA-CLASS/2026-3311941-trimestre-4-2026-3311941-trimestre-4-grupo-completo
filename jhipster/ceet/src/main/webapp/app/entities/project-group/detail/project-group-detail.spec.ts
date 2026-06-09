import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { ProjectGroupDetail } from './project-group-detail';

describe('ProjectGroup Management Detail Component', () => {
  let comp: ProjectGroupDetail;
  let fixture: ComponentFixture<ProjectGroupDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./project-group-detail').then(m => m.ProjectGroupDetail),
              resolve: { projectGroup: () => of({ id: '09699592-062b-40e5-aa51-6ed07e22b997' }) },
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
    fixture = TestBed.createComponent(ProjectGroupDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load projectGroup on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ProjectGroupDetail);

      // THEN
      expect(instance.projectGroup()).toEqual(expect.objectContaining({ id: '09699592-062b-40e5-aa51-6ed07e22b997' }));
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
