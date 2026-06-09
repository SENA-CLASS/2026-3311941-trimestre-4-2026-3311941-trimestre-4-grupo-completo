import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { AreaInstructorDetail } from './area-instructor-detail';

describe('AreaInstructor Management Detail Component', () => {
  let comp: AreaInstructorDetail;
  let fixture: ComponentFixture<AreaInstructorDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./area-instructor-detail').then(m => m.AreaInstructorDetail),
              resolve: { areaInstructor: () => of({ id: 'e0befa69-d67d-40bf-beb0-9493374d7174' }) },
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
    fixture = TestBed.createComponent(AreaInstructorDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load areaInstructor on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', AreaInstructorDetail);

      // THEN
      expect(instance.areaInstructor()).toEqual(expect.objectContaining({ id: 'e0befa69-d67d-40bf-beb0-9493374d7174' }));
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
