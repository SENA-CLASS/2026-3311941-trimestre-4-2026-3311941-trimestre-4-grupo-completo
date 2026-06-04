import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { BondingInstructorDetail } from './bonding-instructor-detail';

describe('BondingInstructor Management Detail Component', () => {
  let comp: BondingInstructorDetail;
  let fixture: ComponentFixture<BondingInstructorDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./bonding-instructor-detail').then(m => m.BondingInstructorDetail),
              resolve: { bondingInstructor: () => of({ id: 'ab7b6017-edd4-4b72-a00c-30124d1b29e7' }) },
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
    fixture = TestBed.createComponent(BondingInstructorDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load bondingInstructor on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', BondingInstructorDetail);

      // THEN
      expect(instance.bondingInstructor()).toEqual(expect.objectContaining({ id: 'ab7b6017-edd4-4b72-a00c-30124d1b29e7' }));
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
