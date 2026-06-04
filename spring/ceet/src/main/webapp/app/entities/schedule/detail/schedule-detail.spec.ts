import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { ScheduleDetail } from './schedule-detail';

describe('Schedule Management Detail Component', () => {
  let comp: ScheduleDetail;
  let fixture: ComponentFixture<ScheduleDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./schedule-detail').then(m => m.ScheduleDetail),
              resolve: { schedule: () => of({ id: '5c834510-7171-4d53-a4b0-b1d5e8245594' }) },
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
    fixture = TestBed.createComponent(ScheduleDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load schedule on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ScheduleDetail);

      // THEN
      expect(instance.schedule()).toEqual(expect.objectContaining({ id: '5c834510-7171-4d53-a4b0-b1d5e8245594' }));
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
