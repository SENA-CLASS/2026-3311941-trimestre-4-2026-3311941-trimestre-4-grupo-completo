import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { WorkingDayDetail } from './working-day-detail';

describe('WorkingDay Management Detail Component', () => {
  let comp: WorkingDayDetail;
  let fixture: ComponentFixture<WorkingDayDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./working-day-detail').then(m => m.WorkingDayDetail),
              resolve: { workingDay: () => of({ id: 'a0aff8e9-f539-4c17-817e-bbf8dfab13f4' }) },
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
    fixture = TestBed.createComponent(WorkingDayDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load workingDay on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', WorkingDayDetail);

      // THEN
      expect(instance.workingDay()).toEqual(expect.objectContaining({ id: 'a0aff8e9-f539-4c17-817e-bbf8dfab13f4' }));
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
