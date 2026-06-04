import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { IArea } from 'app/entities/area/area.model';
import { AreaService } from 'app/entities/area/service/area.service';
import { IInstructor } from 'app/entities/instructor/instructor.model';
import { InstructorService } from 'app/entities/instructor/service/instructor.service';
import { IAreaInstructor } from '../area-instructor.model';
import { AreaInstructorService } from '../service/area-instructor.service';

import { AreaInstructorFormService } from './area-instructor-form.service';
import { AreaInstructorUpdate } from './area-instructor-update';

describe('AreaInstructor Management Update Component', () => {
  let comp: AreaInstructorUpdate;
  let fixture: ComponentFixture<AreaInstructorUpdate>;
  let activatedRoute: ActivatedRoute;
  let areaInstructorFormService: AreaInstructorFormService;
  let areaInstructorService: AreaInstructorService;
  let areaService: AreaService;
  let instructorService: InstructorService;

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

    fixture = TestBed.createComponent(AreaInstructorUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    areaInstructorFormService = TestBed.inject(AreaInstructorFormService);
    areaInstructorService = TestBed.inject(AreaInstructorService);
    areaService = TestBed.inject(AreaService);
    instructorService = TestBed.inject(InstructorService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Area query and add missing value', () => {
      const areaInstructor: IAreaInstructor = { id: 'fb11d601-b709-4616-aaa1-0d126f7bd657' };
      const area: IArea = { id: '913d13dc-00df-4c1e-98a7-a89896aa2814' };
      areaInstructor.area = area;

      const areaCollection: IArea[] = [{ id: '913d13dc-00df-4c1e-98a7-a89896aa2814' }];
      vitest.spyOn(areaService, 'query').mockReturnValue(of(new HttpResponse({ body: areaCollection })));
      const additionalAreas = [area];
      const expectedCollection: IArea[] = [...additionalAreas, ...areaCollection];
      vitest.spyOn(areaService, 'addAreaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ areaInstructor });
      comp.ngOnInit();

      expect(areaService.query).toHaveBeenCalled();
      expect(areaService.addAreaToCollectionIfMissing).toHaveBeenCalledWith(
        areaCollection,
        ...additionalAreas.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.areasSharedCollection()).toEqual(expectedCollection);
    });

    it('should call Instructor query and add missing value', () => {
      const areaInstructor: IAreaInstructor = { id: 'fb11d601-b709-4616-aaa1-0d126f7bd657' };
      const instructor: IInstructor = { id: '6fe9ece4-df13-40c8-9fc2-90d39fd11224' };
      areaInstructor.instructor = instructor;

      const instructorCollection: IInstructor[] = [{ id: '6fe9ece4-df13-40c8-9fc2-90d39fd11224' }];
      vitest.spyOn(instructorService, 'query').mockReturnValue(of(new HttpResponse({ body: instructorCollection })));
      const additionalInstructors = [instructor];
      const expectedCollection: IInstructor[] = [...additionalInstructors, ...instructorCollection];
      vitest.spyOn(instructorService, 'addInstructorToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ areaInstructor });
      comp.ngOnInit();

      expect(instructorService.query).toHaveBeenCalled();
      expect(instructorService.addInstructorToCollectionIfMissing).toHaveBeenCalledWith(
        instructorCollection,
        ...additionalInstructors.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.instructorsSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const areaInstructor: IAreaInstructor = { id: 'fb11d601-b709-4616-aaa1-0d126f7bd657' };
      const area: IArea = { id: '913d13dc-00df-4c1e-98a7-a89896aa2814' };
      areaInstructor.area = area;
      const instructor: IInstructor = { id: '6fe9ece4-df13-40c8-9fc2-90d39fd11224' };
      areaInstructor.instructor = instructor;

      activatedRoute.data = of({ areaInstructor });
      comp.ngOnInit();

      expect(comp.areasSharedCollection()).toContainEqual(area);
      expect(comp.instructorsSharedCollection()).toContainEqual(instructor);
      expect(comp.areaInstructor).toEqual(areaInstructor);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IAreaInstructor>();
      const areaInstructor = { id: 'e0befa69-d67d-40bf-beb0-9493374d7174' };
      vitest.spyOn(areaInstructorFormService, 'getAreaInstructor').mockReturnValue(areaInstructor);
      vitest.spyOn(areaInstructorService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ areaInstructor });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(areaInstructor);
      saveSubject.complete();

      // THEN
      expect(areaInstructorFormService.getAreaInstructor).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(areaInstructorService.update).toHaveBeenCalledWith(expect.objectContaining(areaInstructor));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IAreaInstructor>();
      const areaInstructor = { id: 'e0befa69-d67d-40bf-beb0-9493374d7174' };
      vitest.spyOn(areaInstructorFormService, 'getAreaInstructor').mockReturnValue({ id: null });
      vitest.spyOn(areaInstructorService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ areaInstructor: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(areaInstructor);
      saveSubject.complete();

      // THEN
      expect(areaInstructorFormService.getAreaInstructor).toHaveBeenCalled();
      expect(areaInstructorService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IAreaInstructor>();
      const areaInstructor = { id: 'e0befa69-d67d-40bf-beb0-9493374d7174' };
      vitest.spyOn(areaInstructorService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ areaInstructor });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(areaInstructorService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareArea', () => {
      it('should forward to areaService', () => {
        const entity = { id: '913d13dc-00df-4c1e-98a7-a89896aa2814' };
        const entity2 = { id: '6b7f7f72-3379-424f-89a7-32b55dae7761' };
        vitest.spyOn(areaService, 'compareArea');
        comp.compareArea(entity, entity2);
        expect(areaService.compareArea).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareInstructor', () => {
      it('should forward to instructorService', () => {
        const entity = { id: '6fe9ece4-df13-40c8-9fc2-90d39fd11224' };
        const entity2 = { id: 'b05d1573-3a4f-4013-93d7-aa029ba1513f' };
        vitest.spyOn(instructorService, 'compareInstructor');
        comp.compareInstructor(entity, entity2);
        expect(instructorService.compareInstructor).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
