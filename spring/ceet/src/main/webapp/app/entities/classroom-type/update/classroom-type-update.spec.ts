import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { IClassroomType } from '../classroom-type.model';
import { ClassroomTypeService } from '../service/classroom-type.service';

import { ClassroomTypeFormService } from './classroom-type-form.service';
import { ClassroomTypeUpdate } from './classroom-type-update';

describe('ClassroomType Management Update Component', () => {
  let comp: ClassroomTypeUpdate;
  let fixture: ComponentFixture<ClassroomTypeUpdate>;
  let activatedRoute: ActivatedRoute;
  let classroomTypeFormService: ClassroomTypeFormService;
  let classroomTypeService: ClassroomTypeService;

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

    fixture = TestBed.createComponent(ClassroomTypeUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    classroomTypeFormService = TestBed.inject(ClassroomTypeFormService);
    classroomTypeService = TestBed.inject(ClassroomTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const classroomType: IClassroomType = { id: '8c6dd7a6-f30f-4c8b-a878-a36dc5aee7ae' };

      activatedRoute.data = of({ classroomType });
      comp.ngOnInit();

      expect(comp.classroomType).toEqual(classroomType);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IClassroomType>();
      const classroomType = { id: '78a499bc-a8ee-4f5e-beea-8694e07463a8' };
      vitest.spyOn(classroomTypeFormService, 'getClassroomType').mockReturnValue(classroomType);
      vitest.spyOn(classroomTypeService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ classroomType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(classroomType);
      saveSubject.complete();

      // THEN
      expect(classroomTypeFormService.getClassroomType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(classroomTypeService.update).toHaveBeenCalledWith(expect.objectContaining(classroomType));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IClassroomType>();
      const classroomType = { id: '78a499bc-a8ee-4f5e-beea-8694e07463a8' };
      vitest.spyOn(classroomTypeFormService, 'getClassroomType').mockReturnValue({ id: null });
      vitest.spyOn(classroomTypeService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ classroomType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(classroomType);
      saveSubject.complete();

      // THEN
      expect(classroomTypeFormService.getClassroomType).toHaveBeenCalled();
      expect(classroomTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IClassroomType>();
      const classroomType = { id: '78a499bc-a8ee-4f5e-beea-8694e07463a8' };
      vitest.spyOn(classroomTypeService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ classroomType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(classroomTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
