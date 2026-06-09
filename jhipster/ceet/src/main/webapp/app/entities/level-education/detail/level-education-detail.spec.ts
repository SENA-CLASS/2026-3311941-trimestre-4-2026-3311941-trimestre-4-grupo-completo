import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { LevelEducationDetail } from './level-education-detail';

describe('LevelEducation Management Detail Component', () => {
  let comp: LevelEducationDetail;
  let fixture: ComponentFixture<LevelEducationDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./level-education-detail').then(m => m.LevelEducationDetail),
              resolve: { levelEducation: () => of({ id: '815b1471-c41c-4cfe-a7d8-56ff13b64510' }) },
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
    fixture = TestBed.createComponent(LevelEducationDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load levelEducation on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', LevelEducationDetail);

      // THEN
      expect(instance.levelEducation()).toEqual(expect.objectContaining({ id: '815b1471-c41c-4cfe-a7d8-56ff13b64510' }));
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
