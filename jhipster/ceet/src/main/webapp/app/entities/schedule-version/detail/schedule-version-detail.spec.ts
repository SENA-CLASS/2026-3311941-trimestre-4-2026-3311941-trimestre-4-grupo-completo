import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { ScheduleVersionDetail } from './schedule-version-detail';

describe('ScheduleVersion Management Detail Component', () => {
  let comp: ScheduleVersionDetail;
  let fixture: ComponentFixture<ScheduleVersionDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./schedule-version-detail').then(m => m.ScheduleVersionDetail),
              resolve: { scheduleVersion: () => of({ id: '92e0f35b-04d9-47d7-9946-bfa57a73f086' }) },
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
    fixture = TestBed.createComponent(ScheduleVersionDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load scheduleVersion on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ScheduleVersionDetail);

      // THEN
      expect(instance.scheduleVersion()).toEqual(expect.objectContaining({ id: '92e0f35b-04d9-47d7-9946-bfa57a73f086' }));
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
