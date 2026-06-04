import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { TrimesterDetail } from './trimester-detail';

describe('Trimester Management Detail Component', () => {
  let comp: TrimesterDetail;
  let fixture: ComponentFixture<TrimesterDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./trimester-detail').then(m => m.TrimesterDetail),
              resolve: { trimester: () => of({ id: '23943bac-1112-4eec-a590-f244e6fcb60b' }) },
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
    fixture = TestBed.createComponent(TrimesterDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load trimester on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TrimesterDetail);

      // THEN
      expect(instance.trimester()).toEqual(expect.objectContaining({ id: '23943bac-1112-4eec-a590-f244e6fcb60b' }));
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
