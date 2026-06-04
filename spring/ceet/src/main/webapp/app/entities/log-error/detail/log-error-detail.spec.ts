import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { LogErrorDetail } from './log-error-detail';

describe('LogError Management Detail Component', () => {
  let comp: LogErrorDetail;
  let fixture: ComponentFixture<LogErrorDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./log-error-detail').then(m => m.LogErrorDetail),
              resolve: { logError: () => of({ id: '86ed6f82-2f50-4460-81da-2d13f2ad36ef' }) },
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
    fixture = TestBed.createComponent(LogErrorDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load logError on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', LogErrorDetail);

      // THEN
      expect(instance.logError()).toEqual(expect.objectContaining({ id: '86ed6f82-2f50-4460-81da-2d13f2ad36ef' }));
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
