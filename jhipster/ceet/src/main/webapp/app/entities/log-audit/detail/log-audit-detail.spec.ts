import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { LogAuditDetail } from './log-audit-detail';

describe('LogAudit Management Detail Component', () => {
  let comp: LogAuditDetail;
  let fixture: ComponentFixture<LogAuditDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./log-audit-detail').then(m => m.LogAuditDetail),
              resolve: { logAudit: () => of({ id: '71eef2e7-cb01-4349-bad7-c9a369beb19a' }) },
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
    fixture = TestBed.createComponent(LogAuditDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load logAudit on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', LogAuditDetail);

      // THEN
      expect(instance.logAudit()).toEqual(expect.objectContaining({ id: '71eef2e7-cb01-4349-bad7-c9a369beb19a' }));
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
