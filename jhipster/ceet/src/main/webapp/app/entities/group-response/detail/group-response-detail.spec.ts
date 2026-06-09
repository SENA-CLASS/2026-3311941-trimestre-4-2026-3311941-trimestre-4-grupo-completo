import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { GroupResponseDetail } from './group-response-detail';

describe('GroupResponse Management Detail Component', () => {
  let comp: GroupResponseDetail;
  let fixture: ComponentFixture<GroupResponseDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./group-response-detail').then(m => m.GroupResponseDetail),
              resolve: { groupResponse: () => of({ id: '57b45d23-226e-48e7-93c6-046bd207c9c6' }) },
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
    fixture = TestBed.createComponent(GroupResponseDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load groupResponse on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', GroupResponseDetail);

      // THEN
      expect(instance.groupResponse()).toEqual(expect.objectContaining({ id: '57b45d23-226e-48e7-93c6-046bd207c9c6' }));
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
