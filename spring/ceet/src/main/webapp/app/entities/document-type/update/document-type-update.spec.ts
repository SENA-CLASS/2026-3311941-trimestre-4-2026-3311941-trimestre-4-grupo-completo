import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { IDocumentType } from '../document-type.model';
import { DocumentTypeService } from '../service/document-type.service';

import { DocumentTypeFormService } from './document-type-form.service';
import { DocumentTypeUpdate } from './document-type-update';

describe('DocumentType Management Update Component', () => {
  let comp: DocumentTypeUpdate;
  let fixture: ComponentFixture<DocumentTypeUpdate>;
  let activatedRoute: ActivatedRoute;
  let documentTypeFormService: DocumentTypeFormService;
  let documentTypeService: DocumentTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    });

    fixture = TestBed.createComponent(DocumentTypeUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    documentTypeFormService = TestBed.inject(DocumentTypeFormService);
    documentTypeService = TestBed.inject(DocumentTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const documentType: IDocumentType = { id: 'a48cd438-d713-4570-9fe4-76d70a3682bd' };

      activatedRoute.data = of({ documentType });
      comp.ngOnInit();

      expect(comp.documentType).toEqual(documentType);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IDocumentType>();
      const documentType = { id: '4eea9f54-84fe-4142-b830-d89e8cb3c84a' };
      vitest.spyOn(documentTypeFormService, 'getDocumentType').mockReturnValue(documentType);
      vitest.spyOn(documentTypeService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ documentType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(documentType);
      saveSubject.complete();

      // THEN
      expect(documentTypeFormService.getDocumentType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(documentTypeService.update).toHaveBeenCalledWith(expect.objectContaining(documentType));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IDocumentType>();
      const documentType = { id: '4eea9f54-84fe-4142-b830-d89e8cb3c84a' };
      vitest.spyOn(documentTypeFormService, 'getDocumentType').mockReturnValue({ id: null });
      vitest.spyOn(documentTypeService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ documentType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(documentType);
      saveSubject.complete();

      // THEN
      expect(documentTypeFormService.getDocumentType).toHaveBeenCalled();
      expect(documentTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IDocumentType>();
      const documentType = { id: '4eea9f54-84fe-4142-b830-d89e8cb3c84a' };
      vitest.spyOn(documentTypeService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ documentType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(documentTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
