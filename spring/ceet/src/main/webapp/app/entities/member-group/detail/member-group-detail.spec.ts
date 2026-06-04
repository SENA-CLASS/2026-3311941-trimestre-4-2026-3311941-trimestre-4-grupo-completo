import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { MemberGroupDetail } from './member-group-detail';

describe('MemberGroup Management Detail Component', () => {
  let comp: MemberGroupDetail;
  let fixture: ComponentFixture<MemberGroupDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./member-group-detail').then(m => m.MemberGroupDetail),
              resolve: { memberGroup: () => of({ id: 'aaafac9c-00f1-42dd-b0bb-5944cf56fc08' }) },
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
    fixture = TestBed.createComponent(MemberGroupDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load memberGroup on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', MemberGroupDetail);

      // THEN
      expect(instance.memberGroup()).toEqual(expect.objectContaining({ id: 'aaafac9c-00f1-42dd-b0bb-5944cf56fc08' }));
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
