import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { CheckListCourseDetail } from './check-list-course-detail';

describe('CheckListCourse Management Detail Component', () => {
  let comp: CheckListCourseDetail;
  let fixture: ComponentFixture<CheckListCourseDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./check-list-course-detail').then(m => m.CheckListCourseDetail),
              resolve: { checkListCourse: () => of({ id: 'fe0e76c2-b0cd-455f-82aa-49d4fdb3fd1e' }) },
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
    fixture = TestBed.createComponent(CheckListCourseDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load checkListCourse on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CheckListCourseDetail);

      // THEN
      expect(instance.checkListCourse()).toEqual(expect.objectContaining({ id: 'fe0e76c2-b0cd-455f-82aa-49d4fdb3fd1e' }));
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
