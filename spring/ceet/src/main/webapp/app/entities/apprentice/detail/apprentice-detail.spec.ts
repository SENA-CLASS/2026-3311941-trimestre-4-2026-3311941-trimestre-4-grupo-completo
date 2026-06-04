import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { ApprenticeDetail } from './apprentice-detail';

describe('Apprentice Management Detail Component', () => {
  let comp: ApprenticeDetail;
  let fixture: ComponentFixture<ApprenticeDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./apprentice-detail').then(m => m.ApprenticeDetail),
              resolve: { apprentice: () => of({ id: '8681ca6b-c1b7-4e43-96b8-c3fc96b48213' }) },
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
    fixture = TestBed.createComponent(ApprenticeDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load apprentice on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ApprenticeDetail);

      // THEN
      expect(instance.apprentice()).toEqual(expect.objectContaining({ id: '8681ca6b-c1b7-4e43-96b8-c3fc96b48213' }));
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
