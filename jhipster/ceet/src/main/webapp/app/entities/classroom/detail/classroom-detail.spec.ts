import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { ClassroomDetail } from './classroom-detail';

describe('Classroom Management Detail Component', () => {
  let comp: ClassroomDetail;
  let fixture: ComponentFixture<ClassroomDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./classroom-detail').then(m => m.ClassroomDetail),
              resolve: { classroom: () => of({ id: 'ef876767-91ce-4e28-b866-8ebdf1c26f6f' }) },
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
    fixture = TestBed.createComponent(ClassroomDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load classroom on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ClassroomDetail);

      // THEN
      expect(instance.classroom()).toEqual(expect.objectContaining({ id: 'ef876767-91ce-4e28-b866-8ebdf1c26f6f' }));
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
