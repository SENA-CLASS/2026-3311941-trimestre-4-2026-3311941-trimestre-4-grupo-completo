import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { ILevelEducation } from 'app/entities/level-education/level-education.model';
import { LevelEducationService } from 'app/entities/level-education/service/level-education.service';
import { WorkingDayCourseService } from 'app/entities/working-day-course/service/working-day-course.service';
import { IWorkingDayCourse } from 'app/entities/working-day-course/working-day-course.model';
import { TrimesterService } from '../service/trimester.service';
import { ITrimester } from '../trimester.model';

import { TrimesterFormService } from './trimester-form.service';
import { TrimesterUpdate } from './trimester-update';

describe('Trimester Management Update Component', () => {
  let comp: TrimesterUpdate;
  let fixture: ComponentFixture<TrimesterUpdate>;
  let activatedRoute: ActivatedRoute;
  let trimesterFormService: TrimesterFormService;
  let trimesterService: TrimesterService;
  let workingDayCourseService: WorkingDayCourseService;
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

    fixture = TestBed.createComponent(TrimesterUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    trimesterFormService = TestBed.inject(TrimesterFormService);
    trimesterService = TestBed.inject(TrimesterService);
    workingDayCourseService = TestBed.inject(WorkingDayCourseService);
    levelEducationService = TestBed.inject(LevelEducationService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call WorkingDayCourse query and add missing value', () => {
      const trimester: ITrimester = { id: 'fc8f5153-f1b8-4ede-b817-9b6c218e886f' };
      const workingDayCourse: IWorkingDayCourse = { id: '3317990a-8fb1-4654-821f-70185269b7b0' };
      trimester.workingDayCourse = workingDayCourse;

      const workingDayCourseCollection: IWorkingDayCourse[] = [{ id: '3317990a-8fb1-4654-821f-70185269b7b0' }];
      vitest.spyOn(workingDayCourseService, 'query').mockReturnValue(of(new HttpResponse({ body: workingDayCourseCollection })));
      const additionalWorkingDayCourses = [workingDayCourse];
      const expectedCollection: IWorkingDayCourse[] = [...additionalWorkingDayCourses, ...workingDayCourseCollection];
      vitest.spyOn(workingDayCourseService, 'addWorkingDayCourseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ trimester });
      comp.ngOnInit();

      expect(workingDayCourseService.query).toHaveBeenCalled();
      expect(workingDayCourseService.addWorkingDayCourseToCollectionIfMissing).toHaveBeenCalledWith(
        workingDayCourseCollection,
        ...additionalWorkingDayCourses.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.workingDayCoursesSharedCollection()).toEqual(expectedCollection);
    });

    it('should call LevelEducation query and add missing value', () => {
      const trimester: ITrimester = { id: 'fc8f5153-f1b8-4ede-b817-9b6c218e886f' };
      const levelEducations: ILevelEducation = { id: '815b1471-c41c-4cfe-a7d8-56ff13b64510' };
      trimester.levelEducations = levelEducations;

      const levelEducationCollection: ILevelEducation[] = [{ id: '815b1471-c41c-4cfe-a7d8-56ff13b64510' }];
      vitest.spyOn(levelEducationService, 'query').mockReturnValue(of(new HttpResponse({ body: levelEducationCollection })));
      const additionalLevelEducations = [levelEducations];
      const expectedCollection: ILevelEducation[] = [...additionalLevelEducations, ...levelEducationCollection];
      vitest.spyOn(levelEducationService, 'addLevelEducationToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ trimester });
      comp.ngOnInit();

      expect(levelEducationService.query).toHaveBeenCalled();
      expect(levelEducationService.addLevelEducationToCollectionIfMissing).toHaveBeenCalledWith(
        levelEducationCollection,
        ...additionalLevelEducations.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.levelEducationsSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const trimester: ITrimester = { id: 'fc8f5153-f1b8-4ede-b817-9b6c218e886f' };
      const workingDayCourse: IWorkingDayCourse = { id: '3317990a-8fb1-4654-821f-70185269b7b0' };
      trimester.workingDayCourse = workingDayCourse;
      const levelEducations: ILevelEducation = { id: '815b1471-c41c-4cfe-a7d8-56ff13b64510' };
      trimester.levelEducations = levelEducations;

      activatedRoute.data = of({ trimester });
      comp.ngOnInit();

      expect(comp.workingDayCoursesSharedCollection()).toContainEqual(workingDayCourse);
      expect(comp.levelEducationsSharedCollection()).toContainEqual(levelEducations);
      expect(comp.trimester).toEqual(trimester);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<ITrimester>();
      const trimester = { id: '23943bac-1112-4eec-a590-f244e6fcb60b' };
      vitest.spyOn(trimesterFormService, 'getTrimester').mockReturnValue(trimester);
      vitest.spyOn(trimesterService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ trimester });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(trimester);
      saveSubject.complete();

      // THEN
      expect(trimesterFormService.getTrimester).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(trimesterService.update).toHaveBeenCalledWith(expect.objectContaining(trimester));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<ITrimester>();
      const trimester = { id: '23943bac-1112-4eec-a590-f244e6fcb60b' };
      vitest.spyOn(trimesterFormService, 'getTrimester').mockReturnValue({ id: null });
      vitest.spyOn(trimesterService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ trimester: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(trimester);
      saveSubject.complete();

      // THEN
      expect(trimesterFormService.getTrimester).toHaveBeenCalled();
      expect(trimesterService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<ITrimester>();
      const trimester = { id: '23943bac-1112-4eec-a590-f244e6fcb60b' };
      vitest.spyOn(trimesterService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ trimester });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(trimesterService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareWorkingDayCourse', () => {
      it('should forward to workingDayCourseService', () => {
        const entity = { id: '3317990a-8fb1-4654-821f-70185269b7b0' };
        const entity2 = { id: '647799fc-3023-41ef-914a-650d7703fb02' };
        vitest.spyOn(workingDayCourseService, 'compareWorkingDayCourse');
        comp.compareWorkingDayCourse(entity, entity2);
        expect(workingDayCourseService.compareWorkingDayCourse).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareLevelEducation', () => {
      it('should forward to levelEducationService', () => {
        const entity = { id: '815b1471-c41c-4cfe-a7d8-56ff13b64510' };
        const entity2 = { id: 'da387bdf-5e02-4940-8409-2be6a4f3a50c' };
        vitest.spyOn(levelEducationService, 'compareLevelEducation');
        comp.compareLevelEducation(entity, entity2);
        expect(levelEducationService.compareLevelEducation).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
