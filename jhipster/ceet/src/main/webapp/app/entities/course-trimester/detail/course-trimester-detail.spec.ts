import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { CourseTrimesterDetail } from './course-trimester-detail';

describe('CourseTrimester Management Detail Component', () => {
  let comp: CourseTrimesterDetail;
  let fixture: ComponentFixture<CourseTrimesterDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./course-trimester-detail').then(m => m.CourseTrimesterDetail),
              resolve: { courseTrimester: () => of({ id: '87627c1c-a756-41da-8baf-2032937c03d7' }) },
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
    fixture = TestBed.createComponent(CourseTrimesterDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load courseTrimester on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CourseTrimesterDetail);

      // THEN
      expect(instance.courseTrimester()).toEqual(expect.objectContaining({ id: '87627c1c-a756-41da-8baf-2032937c03d7' }));
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
