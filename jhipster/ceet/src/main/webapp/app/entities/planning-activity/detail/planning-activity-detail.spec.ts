import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { PlanningActivityDetail } from './planning-activity-detail';

describe('PlanningActivity Management Detail Component', () => {
  let comp: PlanningActivityDetail;
  let fixture: ComponentFixture<PlanningActivityDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./planning-activity-detail').then(m => m.PlanningActivityDetail),
              resolve: { planningActivity: () => of({ id: 'e33c8a7c-2d1d-41a5-b595-8ae92ad792d5' }) },
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
    fixture = TestBed.createComponent(PlanningActivityDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load planningActivity on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', PlanningActivityDetail);

      // THEN
      expect(instance.planningActivity()).toEqual(expect.objectContaining({ id: 'e33c8a7c-2d1d-41a5-b595-8ae92ad792d5' }));
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
