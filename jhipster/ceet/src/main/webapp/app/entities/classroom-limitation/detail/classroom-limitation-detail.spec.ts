import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { ClassroomLimitationDetail } from './classroom-limitation-detail';

describe('ClassroomLimitation Management Detail Component', () => {
  let comp: ClassroomLimitationDetail;
  let fixture: ComponentFixture<ClassroomLimitationDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./classroom-limitation-detail').then(m => m.ClassroomLimitationDetail),
              resolve: { classroomLimitation: () => of({ id: 'ba08a49b-1200-43e0-801b-3547f699926b' }) },
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
    fixture = TestBed.createComponent(ClassroomLimitationDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load classroomLimitation on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ClassroomLimitationDetail);

      // THEN
      expect(instance.classroomLimitation()).toEqual(expect.objectContaining({ id: 'ba08a49b-1200-43e0-801b-3547f699926b' }));
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
