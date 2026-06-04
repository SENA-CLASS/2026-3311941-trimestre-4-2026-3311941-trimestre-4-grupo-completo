import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { DocumentTypeDetail } from './document-type-detail';

describe('DocumentType Management Detail Component', () => {
  let comp: DocumentTypeDetail;
  let fixture: ComponentFixture<DocumentTypeDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./document-type-detail').then(m => m.DocumentTypeDetail),
              resolve: { documentType: () => of({ id: '4eea9f54-84fe-4142-b830-d89e8cb3c84a' }) },
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
    fixture = TestBed.createComponent(DocumentTypeDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load documentType on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DocumentTypeDetail);

      // THEN
      expect(instance.documentType()).toEqual(expect.objectContaining({ id: '4eea9f54-84fe-4142-b830-d89e8cb3c84a' }));
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
