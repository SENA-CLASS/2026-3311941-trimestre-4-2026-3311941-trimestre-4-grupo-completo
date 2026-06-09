import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { CourseStatusDetail } from './course-status-detail';

describe('CourseStatus Management Detail Component', () => {
  let comp: CourseStatusDetail;
  let fixture: ComponentFixture<CourseStatusDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./course-status-detail').then(m => m.CourseStatusDetail),
              resolve: { courseStatus: () => of({ id: '10d644f6-f194-440a-bbab-b099a4c4d9fb' }) },
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
    fixture = TestBed.createComponent(CourseStatusDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load courseStatus on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CourseStatusDetail);

      // THEN
      expect(instance.courseStatus()).toEqual(expect.objectContaining({ id: '10d644f6-f194-440a-bbab-b099a4c4d9fb' }));
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
