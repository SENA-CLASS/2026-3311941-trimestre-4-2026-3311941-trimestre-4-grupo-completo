import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { ILevelEducation } from '../level-education.model';
import { LevelEducationService } from '../service/level-education.service';

import { LevelEducationFormService } from './level-education-form.service';
import { LevelEducationUpdate } from './level-education-update';

describe('LevelEducation Management Update Component', () => {
  let comp: LevelEducationUpdate;
  let fixture: ComponentFixture<LevelEducationUpdate>;
  let activatedRoute: ActivatedRoute;
  let levelEducationFormService: LevelEducationFormService;
  let levelEducationService: LevelEducationService;

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

    fixture = TestBed.createComponent(LevelEducationUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    levelEducationFormService = TestBed.inject(LevelEducationFormService);
    levelEducationService = TestBed.inject(LevelEducationService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const levelEducation: ILevelEducation = { id: 'da387bdf-5e02-4940-8409-2be6a4f3a50c' };

      activatedRoute.data = of({ levelEducation });
      comp.ngOnInit();

      expect(comp.levelEducation).toEqual(levelEducation);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<ILevelEducation>();
      const levelEducation = { id: '815b1471-c41c-4cfe-a7d8-56ff13b64510' };
      vitest.spyOn(levelEducationFormService, 'getLevelEducation').mockReturnValue(levelEducation);
      vitest.spyOn(levelEducationService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ levelEducation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(levelEducation);
      saveSubject.complete();

      // THEN
      expect(levelEducationFormService.getLevelEducation).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(levelEducationService.update).toHaveBeenCalledWith(expect.objectContaining(levelEducation));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<ILevelEducation>();
      const levelEducation = { id: '815b1471-c41c-4cfe-a7d8-56ff13b64510' };
      vitest.spyOn(levelEducationFormService, 'getLevelEducation').mockReturnValue({ id: null });
      vitest.spyOn(levelEducationService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ levelEducation: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(levelEducation);
      saveSubject.complete();

      // THEN
      expect(levelEducationFormService.getLevelEducation).toHaveBeenCalled();
      expect(levelEducationService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<ILevelEducation>();
      const levelEducation = { id: '815b1471-c41c-4cfe-a7d8-56ff13b64510' };
      vitest.spyOn(levelEducationService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ levelEducation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(levelEducationService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
