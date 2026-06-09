import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { ClassroomTypeDetail } from './classroom-type-detail';

describe('ClassroomType Management Detail Component', () => {
  let comp: ClassroomTypeDetail;
  let fixture: ComponentFixture<ClassroomTypeDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./classroom-type-detail').then(m => m.ClassroomTypeDetail),
              resolve: { classroomType: () => of({ id: '78a499bc-a8ee-4f5e-beea-8694e07463a8' }) },
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
    fixture = TestBed.createComponent(ClassroomTypeDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load classroomType on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ClassroomTypeDetail);

      // THEN
      expect(instance.classroomType()).toEqual(expect.objectContaining({ id: '78a499bc-a8ee-4f5e-beea-8694e07463a8' }));
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
