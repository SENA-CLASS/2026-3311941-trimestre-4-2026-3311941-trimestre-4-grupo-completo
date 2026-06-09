import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { ItemListDetail } from './item-list-detail';

describe('ItemList Management Detail Component', () => {
  let comp: ItemListDetail;
  let fixture: ComponentFixture<ItemListDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./item-list-detail').then(m => m.ItemListDetail),
              resolve: { itemList: () => of({ id: 'f5c01f94-408b-48fb-9301-893ca4de0dc0' }) },
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
    fixture = TestBed.createComponent(ItemListDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load itemList on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ItemListDetail);

      // THEN
      expect(instance.itemList()).toEqual(expect.objectContaining({ id: 'f5c01f94-408b-48fb-9301-893ca4de0dc0' }));
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
