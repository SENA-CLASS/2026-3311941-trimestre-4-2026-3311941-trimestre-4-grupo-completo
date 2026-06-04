import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { IModality } from '../modality.model';
import { ModalityService } from '../service/modality.service';

import { ModalityFormService } from './modality-form.service';
import { ModalityUpdate } from './modality-update';

describe('Modality Management Update Component', () => {
  let comp: ModalityUpdate;
  let fixture: ComponentFixture<ModalityUpdate>;
  let activatedRoute: ActivatedRoute;
  let modalityFormService: ModalityFormService;
  let modalityService: ModalityService;

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

    fixture = TestBed.createComponent(ModalityUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    modalityFormService = TestBed.inject(ModalityFormService);
    modalityService = TestBed.inject(ModalityService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const modality: IModality = { id: '9fbb3b28-8dca-4aca-839a-b7d13b7197dc' };

      activatedRoute.data = of({ modality });
      comp.ngOnInit();

      expect(comp.modality).toEqual(modality);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IModality>();
      const modality = { id: 'd35eac1f-455b-4c70-9249-9dc25997a012' };
      vitest.spyOn(modalityFormService, 'getModality').mockReturnValue(modality);
      vitest.spyOn(modalityService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ modality });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(modality);
      saveSubject.complete();

      // THEN
      expect(modalityFormService.getModality).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(modalityService.update).toHaveBeenCalledWith(expect.objectContaining(modality));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IModality>();
      const modality = { id: 'd35eac1f-455b-4c70-9249-9dc25997a012' };
      vitest.spyOn(modalityFormService, 'getModality').mockReturnValue({ id: null });
      vitest.spyOn(modalityService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ modality: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(modality);
      saveSubject.complete();

      // THEN
      expect(modalityFormService.getModality).toHaveBeenCalled();
      expect(modalityService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IModality>();
      const modality = { id: 'd35eac1f-455b-4c70-9249-9dc25997a012' };
      vitest.spyOn(modalityService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ modality });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(modalityService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
