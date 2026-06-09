import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { InstructorWorkingDayDetail } from './instructor-working-day-detail';

describe('InstructorWorkingDay Management Detail Component', () => {
  let comp: InstructorWorkingDayDetail;
  let fixture: ComponentFixture<InstructorWorkingDayDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./instructor-working-day-detail').then(m => m.InstructorWorkingDayDetail),
              resolve: { instructorWorkingDay: () => of({ id: 'a6718508-6ea5-4a16-8155-bfbc48acf256' }) },
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
    fixture = TestBed.createComponent(InstructorWorkingDayDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load instructorWorkingDay on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', InstructorWorkingDayDetail);

      // THEN
      expect(instance.instructorWorkingDay()).toEqual(expect.objectContaining({ id: 'a6718508-6ea5-4a16-8155-bfbc48acf256' }));
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
