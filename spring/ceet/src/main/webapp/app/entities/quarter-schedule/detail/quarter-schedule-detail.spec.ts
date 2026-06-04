import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { QuarterScheduleDetail } from './quarter-schedule-detail';

describe('QuarterSchedule Management Detail Component', () => {
  let comp: QuarterScheduleDetail;
  let fixture: ComponentFixture<QuarterScheduleDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./quarter-schedule-detail').then(m => m.QuarterScheduleDetail),
              resolve: { quarterSchedule: () => of({ id: 'cb8a58fb-ddc6-4c56-9542-9f8e60b8e090' }) },
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
    fixture = TestBed.createComponent(QuarterScheduleDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load quarterSchedule on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', QuarterScheduleDetail);

      // THEN
      expect(instance.quarterSchedule()).toEqual(expect.objectContaining({ id: 'cb8a58fb-ddc6-4c56-9542-9f8e60b8e090' }));
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
