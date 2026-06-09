import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { IClassroom } from 'app/entities/classroom/classroom.model';
import { ClassroomService } from 'app/entities/classroom/service/classroom.service';
import { ICourseTrimester } from 'app/entities/course-trimester/course-trimester.model';
import { IDay } from 'app/entities/day/day.model';
import { DayService } from 'app/entities/day/service/day.service';
import { CourseTrimesterService } from 'app/entities/course-trimester/service/course-trimester.service';
import { IInstructor } from 'app/entities/instructor/instructor.model';
import { InstructorService } from 'app/entities/instructor/service/instructor.service';
import { IModality } from 'app/entities/modality/modality.model';
import { ModalityService } from 'app/entities/modality/service/modality.service';
import { IScheduleVersion } from 'app/entities/schedule-version/schedule-version.model';
import { ScheduleVersionService } from 'app/entities/schedule-version/service/schedule-version.service';
import { ISchedule } from '../schedule.model';
import { ScheduleService } from '../service/schedule.service';

import { ScheduleFormService } from './schedule-form.service';
import { ScheduleUpdate } from './schedule-update';

describe('Schedule Management Update Component', () => {
  let comp: ScheduleUpdate;
  let fixture: ComponentFixture<ScheduleUpdate>;
  let activatedRoute: ActivatedRoute;
  let scheduleFormService: ScheduleFormService;
  let scheduleService: ScheduleService;
  let scheduleVersionService: ScheduleVersionService;
  let modalityService: ModalityService;
  let dayService: DayService;
  let courseTrimesterService: CourseTrimesterService;
  let classroomService: ClassroomService;
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

    fixture = TestBed.createComponent(ScheduleUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    scheduleFormService = TestBed.inject(ScheduleFormService);
    scheduleService = TestBed.inject(ScheduleService);
    scheduleVersionService = TestBed.inject(ScheduleVersionService);
    modalityService = TestBed.inject(ModalityService);
    dayService = TestBed.inject(DayService);
    courseTrimesterService = TestBed.inject(CourseTrimesterService);
    classroomService = TestBed.inject(ClassroomService);
    instructorService = TestBed.inject(InstructorService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call ScheduleVersion query and add missing value', () => {
      const schedule: ISchedule = { id: '06daa4d3-a4db-40fe-8685-fc15320e015f' };
      const scheduleVersion: IScheduleVersion = { id: '92e0f35b-04d9-47d7-9946-bfa57a73f086' };
      schedule.scheduleVersion = scheduleVersion;

      const scheduleVersionCollection: IScheduleVersion[] = [{ id: '92e0f35b-04d9-47d7-9946-bfa57a73f086' }];
      vitest.spyOn(scheduleVersionService, 'query').mockReturnValue(of(new HttpResponse({ body: scheduleVersionCollection })));
      const additionalScheduleVersions = [scheduleVersion];
      const expectedCollection: IScheduleVersion[] = [...additionalScheduleVersions, ...scheduleVersionCollection];
      vitest.spyOn(scheduleVersionService, 'addScheduleVersionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ schedule });
      comp.ngOnInit();

      expect(scheduleVersionService.query).toHaveBeenCalled();
      expect(scheduleVersionService.addScheduleVersionToCollectionIfMissing).toHaveBeenCalledWith(
        scheduleVersionCollection,
        ...additionalScheduleVersions.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.scheduleVersionsSharedCollection()).toEqual(expectedCollection);
    });

    it('should call Modality query and add missing value', () => {
      const schedule: ISchedule = { id: '06daa4d3-a4db-40fe-8685-fc15320e015f' };
      const modality: IModality = { id: 'd35eac1f-455b-4c70-9249-9dc25997a012' };
      schedule.modality = modality;

      const modalityCollection: IModality[] = [{ id: 'd35eac1f-455b-4c70-9249-9dc25997a012' }];
      vitest.spyOn(modalityService, 'query').mockReturnValue(of(new HttpResponse({ body: modalityCollection })));
      const additionalModalities = [modality];
      const expectedCollection: IModality[] = [...additionalModalities, ...modalityCollection];
      vitest.spyOn(modalityService, 'addModalityToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ schedule });
      comp.ngOnInit();

      expect(modalityService.query).toHaveBeenCalled();
      expect(modalityService.addModalityToCollectionIfMissing).toHaveBeenCalledWith(
        modalityCollection,
        ...additionalModalities.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.modalitiesSharedCollection()).toEqual(expectedCollection);
    });

    it('should call Day query and add missing value', () => {
      const schedule: ISchedule = { id: '06daa4d3-a4db-40fe-8685-fc15320e015f' };
      const day: IDay = { id: '712b4dd0-c635-4121-a9e3-1854687dde35' };
      schedule.day = day;

      const dayCollection: IDay[] = [{ id: '712b4dd0-c635-4121-a9e3-1854687dde35' }];
      vitest.spyOn(dayService, 'query').mockReturnValue(of(new HttpResponse({ body: dayCollection })));
      const additionalDays = [day];
      const expectedCollection: IDay[] = [...additionalDays, ...dayCollection];
      vitest.spyOn(dayService, 'addDayToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ schedule });
      comp.ngOnInit();

      expect(dayService.query).toHaveBeenCalled();
      expect(dayService.addDayToCollectionIfMissing).toHaveBeenCalledWith(
        dayCollection,
        ...additionalDays.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.daysSharedCollection()).toEqual(expectedCollection);
    });

    it('should call CourseTrimester query and add missing value', () => {
      const schedule: ISchedule = { id: '06daa4d3-a4db-40fe-8685-fc15320e015f' };
      const courseTrimester: ICourseTrimester = { id: '87627c1c-a756-41da-8baf-2032937c03d7' };
      schedule.courseTrimester = courseTrimester;

      const courseTrimesterCollection: ICourseTrimester[] = [{ id: '87627c1c-a756-41da-8baf-2032937c03d7' }];
      vitest.spyOn(courseTrimesterService, 'query').mockReturnValue(of(new HttpResponse({ body: courseTrimesterCollection })));
      const additionalCourseTrimesters = [courseTrimester];
      const expectedCollection: ICourseTrimester[] = [...additionalCourseTrimesters, ...courseTrimesterCollection];
      vitest.spyOn(courseTrimesterService, 'addCourseTrimesterToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ schedule });
      comp.ngOnInit();

      expect(courseTrimesterService.query).toHaveBeenCalled();
      expect(courseTrimesterService.addCourseTrimesterToCollectionIfMissing).toHaveBeenCalledWith(
        courseTrimesterCollection,
        ...additionalCourseTrimesters.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.courseTrimestersSharedCollection()).toEqual(expectedCollection);
    });

    it('should call Classroom query and add missing value', () => {
      const schedule: ISchedule = { id: '06daa4d3-a4db-40fe-8685-fc15320e015f' };
      const classroom: IClassroom = { id: 'ef876767-91ce-4e28-b866-8ebdf1c26f6f' };
      schedule.classroom = classroom;

      const classroomCollection: IClassroom[] = [{ id: 'ef876767-91ce-4e28-b866-8ebdf1c26f6f' }];
      vitest.spyOn(classroomService, 'query').mockReturnValue(of(new HttpResponse({ body: classroomCollection })));
      const additionalClassrooms = [classroom];
      const expectedCollection: IClassroom[] = [...additionalClassrooms, ...classroomCollection];
      vitest.spyOn(classroomService, 'addClassroomToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ schedule });
      comp.ngOnInit();

      expect(classroomService.query).toHaveBeenCalled();
      expect(classroomService.addClassroomToCollectionIfMissing).toHaveBeenCalledWith(
        classroomCollection,
        ...additionalClassrooms.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.classroomsSharedCollection()).toEqual(expectedCollection);
    });

    it('should call Instructor query and add missing value', () => {
      const schedule: ISchedule = { id: '06daa4d3-a4db-40fe-8685-fc15320e015f' };
      const instructor: IInstructor = { id: '6fe9ece4-df13-40c8-9fc2-90d39fd11224' };
      schedule.instructor = instructor;

      const instructorCollection: IInstructor[] = [{ id: '6fe9ece4-df13-40c8-9fc2-90d39fd11224' }];
      vitest.spyOn(instructorService, 'query').mockReturnValue(of(new HttpResponse({ body: instructorCollection })));
      const additionalInstructors = [instructor];
      const expectedCollection: IInstructor[] = [...additionalInstructors, ...instructorCollection];
      vitest.spyOn(instructorService, 'addInstructorToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ schedule });
      comp.ngOnInit();

      expect(instructorService.query).toHaveBeenCalled();
      expect(instructorService.addInstructorToCollectionIfMissing).toHaveBeenCalledWith(
        instructorCollection,
        ...additionalInstructors.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.instructorsSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const schedule: ISchedule = { id: '06daa4d3-a4db-40fe-8685-fc15320e015f' };
      const scheduleVersion: IScheduleVersion = { id: '92e0f35b-04d9-47d7-9946-bfa57a73f086' };
      schedule.scheduleVersion = scheduleVersion;
      const modality: IModality = { id: 'd35eac1f-455b-4c70-9249-9dc25997a012' };
      schedule.modality = modality;
      const day: IDay = { id: '712b4dd0-c635-4121-a9e3-1854687dde35' };
      schedule.day = day;
      const courseTrimester: ICourseTrimester = { id: '87627c1c-a756-41da-8baf-2032937c03d7' };
      schedule.courseTrimester = courseTrimester;
      const classroom: IClassroom = { id: 'ef876767-91ce-4e28-b866-8ebdf1c26f6f' };
      schedule.classroom = classroom;
      const instructor: IInstructor = { id: '6fe9ece4-df13-40c8-9fc2-90d39fd11224' };
      schedule.instructor = instructor;

      activatedRoute.data = of({ schedule });
      comp.ngOnInit();

      expect(comp.scheduleVersionsSharedCollection()).toContainEqual(scheduleVersion);
      expect(comp.modalitiesSharedCollection()).toContainEqual(modality);
      expect(comp.daysSharedCollection()).toContainEqual(day);
      expect(comp.courseTrimestersSharedCollection()).toContainEqual(courseTrimester);
      expect(comp.classroomsSharedCollection()).toContainEqual(classroom);
      expect(comp.instructorsSharedCollection()).toContainEqual(instructor);
      expect(comp.schedule).toEqual(schedule);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<ISchedule>();
      const schedule = { id: '5c834510-7171-4d53-a4b0-b1d5e8245594' };
      vitest.spyOn(scheduleFormService, 'getSchedule').mockReturnValue(schedule);
      vitest.spyOn(scheduleService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ schedule });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(schedule);
      saveSubject.complete();

      // THEN
      expect(scheduleFormService.getSchedule).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(scheduleService.update).toHaveBeenCalledWith(expect.objectContaining(schedule));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<ISchedule>();
      const schedule = { id: '5c834510-7171-4d53-a4b0-b1d5e8245594' };
      vitest.spyOn(scheduleFormService, 'getSchedule').mockReturnValue({ id: null });
      vitest.spyOn(scheduleService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ schedule: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(schedule);
      saveSubject.complete();

      // THEN
      expect(scheduleFormService.getSchedule).toHaveBeenCalled();
      expect(scheduleService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<ISchedule>();
      const schedule = { id: '5c834510-7171-4d53-a4b0-b1d5e8245594' };
      vitest.spyOn(scheduleService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ schedule });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(scheduleService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareScheduleVersion', () => {
      it('should forward to scheduleVersionService', () => {
        const entity = { id: '92e0f35b-04d9-47d7-9946-bfa57a73f086' };
        const entity2 = { id: 'a7abaf4d-38ad-4254-b144-1421e43d3397' };
        vitest.spyOn(scheduleVersionService, 'compareScheduleVersion');
        comp.compareScheduleVersion(entity, entity2);
        expect(scheduleVersionService.compareScheduleVersion).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareModality', () => {
      it('should forward to modalityService', () => {
        const entity = { id: 'd35eac1f-455b-4c70-9249-9dc25997a012' };
        const entity2 = { id: '9fbb3b28-8dca-4aca-839a-b7d13b7197dc' };
        vitest.spyOn(modalityService, 'compareModality');
        comp.compareModality(entity, entity2);
        expect(modalityService.compareModality).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareDay', () => {
      it('should forward to dayService', () => {
        const entity = { id: '712b4dd0-c635-4121-a9e3-1854687dde35' };
        const entity2 = { id: 'c3c5c445-4f79-4566-bfd4-47c60ed1bf8e' };
        vitest.spyOn(dayService, 'compareDay');
        comp.compareDay(entity, entity2);
        expect(dayService.compareDay).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCourseTrimester', () => {
      it('should forward to courseTrimesterService', () => {
        const entity = { id: '87627c1c-a756-41da-8baf-2032937c03d7' };
        const entity2 = { id: '160fb1c3-2c69-4184-ab10-636c5d1d30b8' };
        vitest.spyOn(courseTrimesterService, 'compareCourseTrimester');
        comp.compareCourseTrimester(entity, entity2);
        expect(courseTrimesterService.compareCourseTrimester).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareClassroom', () => {
      it('should forward to classroomService', () => {
        const entity = { id: 'ef876767-91ce-4e28-b866-8ebdf1c26f6f' };
        const entity2 = { id: '8ce047e9-4e00-4822-b68d-4115c0d99bb4' };
        vitest.spyOn(classroomService, 'compareClassroom');
        comp.compareClassroom(entity, entity2);
        expect(classroomService.compareClassroom).toHaveBeenCalledWith(entity, entity2);
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
