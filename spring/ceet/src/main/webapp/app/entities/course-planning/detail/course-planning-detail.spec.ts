import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { CoursePlanningDetail } from './course-planning-detail';

describe('CoursePlanning Management Detail Component', () => {
  let comp: CoursePlanningDetail;
  let fixture: ComponentFixture<CoursePlanningDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./course-planning-detail').then(m => m.CoursePlanningDetail),
              resolve: { coursePlanning: () => of({ id: '4b803aa8-fa56-47c2-883b-22da200d8885' }) },
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
    fixture = TestBed.createComponent(CoursePlanningDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load coursePlanning on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CoursePlanningDetail);

      // THEN
      expect(instance.coursePlanning()).toEqual(expect.objectContaining({ id: '4b803aa8-fa56-47c2-883b-22da200d8885' }));
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
