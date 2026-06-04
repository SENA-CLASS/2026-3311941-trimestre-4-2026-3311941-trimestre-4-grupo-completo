import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { ICampus } from 'app/entities/campus/campus.model';
import { CampusService } from 'app/entities/campus/service/campus.service';
import { IClassroomType } from 'app/entities/classroom-type/classroom-type.model';
import { ClassroomTypeService } from 'app/entities/classroom-type/service/classroom-type.service';
import { IClassroom } from '../classroom.model';
import { ClassroomService } from '../service/classroom.service';

import { ClassroomFormService } from './classroom-form.service';
import { ClassroomUpdate } from './classroom-update';

describe('Classroom Management Update Component', () => {
  let comp: ClassroomUpdate;
  let fixture: ComponentFixture<ClassroomUpdate>;
  let activatedRoute: ActivatedRoute;
  let classroomFormService: ClassroomFormService;
  let classroomService: ClassroomService;
  let classroomTypeService: ClassroomTypeService;
  let campusService: CampusService;

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

    fixture = TestBed.createComponent(ClassroomUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    classroomFormService = TestBed.inject(ClassroomFormService);
    classroomService = TestBed.inject(ClassroomService);
    classroomTypeService = TestBed.inject(ClassroomTypeService);
    campusService = TestBed.inject(CampusService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call ClassroomType query and add missing value', () => {
      const classroom: IClassroom = { id: '8ce047e9-4e00-4822-b68d-4115c0d99bb4' };
      const classroomType: IClassroomType = { id: '78a499bc-a8ee-4f5e-beea-8694e07463a8' };
      classroom.classroomType = classroomType;

      const classroomTypeCollection: IClassroomType[] = [{ id: '78a499bc-a8ee-4f5e-beea-8694e07463a8' }];
      vitest.spyOn(classroomTypeService, 'query').mockReturnValue(of(new HttpResponse({ body: classroomTypeCollection })));
      const additionalClassroomTypes = [classroomType];
      const expectedCollection: IClassroomType[] = [...additionalClassroomTypes, ...classroomTypeCollection];
      vitest.spyOn(classroomTypeService, 'addClassroomTypeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ classroom });
      comp.ngOnInit();

      expect(classroomTypeService.query).toHaveBeenCalled();
      expect(classroomTypeService.addClassroomTypeToCollectionIfMissing).toHaveBeenCalledWith(
        classroomTypeCollection,
        ...additionalClassroomTypes.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.classroomTypesSharedCollection()).toEqual(expectedCollection);
    });

    it('should call Campus query and add missing value', () => {
      const classroom: IClassroom = { id: '8ce047e9-4e00-4822-b68d-4115c0d99bb4' };
      const campus: ICampus = { id: 'ef9c809c-3ee1-443a-82b3-b6747c4e5680' };
      classroom.campus = campus;

      const campusCollection: ICampus[] = [{ id: 'ef9c809c-3ee1-443a-82b3-b6747c4e5680' }];
      vitest.spyOn(campusService, 'query').mockReturnValue(of(new HttpResponse({ body: campusCollection })));
      const additionalCampuses = [campus];
      const expectedCollection: ICampus[] = [...additionalCampuses, ...campusCollection];
      vitest.spyOn(campusService, 'addCampusToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ classroom });
      comp.ngOnInit();

      expect(campusService.query).toHaveBeenCalled();
      expect(campusService.addCampusToCollectionIfMissing).toHaveBeenCalledWith(
        campusCollection,
        ...additionalCampuses.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.campusesSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const classroom: IClassroom = { id: '8ce047e9-4e00-4822-b68d-4115c0d99bb4' };
      const classroomType: IClassroomType = { id: '78a499bc-a8ee-4f5e-beea-8694e07463a8' };
      classroom.classroomType = classroomType;
      const campus: ICampus = { id: 'ef9c809c-3ee1-443a-82b3-b6747c4e5680' };
      classroom.campus = campus;

      activatedRoute.data = of({ classroom });
      comp.ngOnInit();

      expect(comp.classroomTypesSharedCollection()).toContainEqual(classroomType);
      expect(comp.campusesSharedCollection()).toContainEqual(campus);
      expect(comp.classroom).toEqual(classroom);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IClassroom>();
      const classroom = { id: 'ef876767-91ce-4e28-b866-8ebdf1c26f6f' };
      vitest.spyOn(classroomFormService, 'getClassroom').mockReturnValue(classroom);
      vitest.spyOn(classroomService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ classroom });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(classroom);
      saveSubject.complete();

      // THEN
      expect(classroomFormService.getClassroom).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(classroomService.update).toHaveBeenCalledWith(expect.objectContaining(classroom));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IClassroom>();
      const classroom = { id: 'ef876767-91ce-4e28-b866-8ebdf1c26f6f' };
      vitest.spyOn(classroomFormService, 'getClassroom').mockReturnValue({ id: null });
      vitest.spyOn(classroomService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ classroom: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(classroom);
      saveSubject.complete();

      // THEN
      expect(classroomFormService.getClassroom).toHaveBeenCalled();
      expect(classroomService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IClassroom>();
      const classroom = { id: 'ef876767-91ce-4e28-b866-8ebdf1c26f6f' };
      vitest.spyOn(classroomService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ classroom });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(classroomService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareClassroomType', () => {
      it('should forward to classroomTypeService', () => {
        const entity = { id: '78a499bc-a8ee-4f5e-beea-8694e07463a8' };
        const entity2 = { id: '8c6dd7a6-f30f-4c8b-a878-a36dc5aee7ae' };
        vitest.spyOn(classroomTypeService, 'compareClassroomType');
        comp.compareClassroomType(entity, entity2);
        expect(classroomTypeService.compareClassroomType).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCampus', () => {
      it('should forward to campusService', () => {
        const entity = { id: 'ef9c809c-3ee1-443a-82b3-b6747c4e5680' };
        const entity2 = { id: 'cb5eec4e-899a-4c15-b434-f00e711b5f5c' };
        vitest.spyOn(campusService, 'compareCampus');
        comp.compareCampus(entity, entity2);
        expect(campusService.compareCampus).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
