import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { BondingCompetenceDetail } from './bonding-competence-detail';

describe('BondingCompetence Management Detail Component', () => {
  let comp: BondingCompetenceDetail;
  let fixture: ComponentFixture<BondingCompetenceDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./bonding-competence-detail').then(m => m.BondingCompetenceDetail),
              resolve: { bondingCompetence: () => of({ id: '5edac464-b367-4167-9068-576bd03056c9' }) },
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
    fixture = TestBed.createComponent(BondingCompetenceDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load bondingCompetence on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', BondingCompetenceDetail);

      // THEN
      expect(instance.bondingCompetence()).toEqual(expect.objectContaining({ id: '5edac464-b367-4167-9068-576bd03056c9' }));
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
