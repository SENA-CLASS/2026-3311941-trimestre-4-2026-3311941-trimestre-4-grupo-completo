import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { WorkingDayCourseDetail } from './working-day-course-detail';

describe('WorkingDayCourse Management Detail Component', () => {
  let comp: WorkingDayCourseDetail;
  let fixture: ComponentFixture<WorkingDayCourseDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./working-day-course-detail').then(m => m.WorkingDayCourseDetail),
              resolve: { workingDayCourse: () => of({ id: '3317990a-8fb1-4654-821f-70185269b7b0' }) },
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
    fixture = TestBed.createComponent(WorkingDayCourseDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load workingDayCourse on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', WorkingDayCourseDetail);

      // THEN
      expect(instance.workingDayCourse()).toEqual(expect.objectContaining({ id: '3317990a-8fb1-4654-821f-70185269b7b0' }));
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
