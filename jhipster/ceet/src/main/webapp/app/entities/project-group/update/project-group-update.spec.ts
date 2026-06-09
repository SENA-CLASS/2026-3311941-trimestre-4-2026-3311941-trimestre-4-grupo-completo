import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { IProjectGroup } from '../project-group.model';
import { ProjectGroupService } from '../service/project-group.service';

import { ProjectGroupFormService } from './project-group-form.service';
import { ProjectGroupUpdate } from './project-group-update';

describe('ProjectGroup Management Update Component', () => {
  let comp: ProjectGroupUpdate;
  let fixture: ComponentFixture<ProjectGroupUpdate>;
  let activatedRoute: ActivatedRoute;
  let projectGroupFormService: ProjectGroupFormService;
  let projectGroupService: ProjectGroupService;
  let courseService: CourseService;

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

    fixture = TestBed.createComponent(ProjectGroupUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    projectGroupFormService = TestBed.inject(ProjectGroupFormService);
    projectGroupService = TestBed.inject(ProjectGroupService);
    courseService = TestBed.inject(CourseService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Course query and add missing value', () => {
      const projectGroup: IProjectGroup = { id: 'e32c8573-0365-4601-97ff-335f74d06785' };
      const course: ICourse = { id: '111fabe5-d417-4bae-ac6e-f3e3a988982f' };
      projectGroup.course = course;

      const courseCollection: ICourse[] = [{ id: '111fabe5-d417-4bae-ac6e-f3e3a988982f' }];
      vitest.spyOn(courseService, 'query').mockReturnValue(of(new HttpResponse({ body: courseCollection })));
      const additionalCourses = [course];
      const expectedCollection: ICourse[] = [...additionalCourses, ...courseCollection];
      vitest.spyOn(courseService, 'addCourseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ projectGroup });
      comp.ngOnInit();

      expect(courseService.query).toHaveBeenCalled();
      expect(courseService.addCourseToCollectionIfMissing).toHaveBeenCalledWith(
        courseCollection,
        ...additionalCourses.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.coursesSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const projectGroup: IProjectGroup = { id: 'e32c8573-0365-4601-97ff-335f74d06785' };
      const course: ICourse = { id: '111fabe5-d417-4bae-ac6e-f3e3a988982f' };
      projectGroup.course = course;

      activatedRoute.data = of({ projectGroup });
      comp.ngOnInit();

      expect(comp.coursesSharedCollection()).toContainEqual(course);
      expect(comp.projectGroup).toEqual(projectGroup);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IProjectGroup>();
      const projectGroup = { id: '09699592-062b-40e5-aa51-6ed07e22b997' };
      vitest.spyOn(projectGroupFormService, 'getProjectGroup').mockReturnValue(projectGroup);
      vitest.spyOn(projectGroupService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ projectGroup });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(projectGroup);
      saveSubject.complete();

      // THEN
      expect(projectGroupFormService.getProjectGroup).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(projectGroupService.update).toHaveBeenCalledWith(expect.objectContaining(projectGroup));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IProjectGroup>();
      const projectGroup = { id: '09699592-062b-40e5-aa51-6ed07e22b997' };
      vitest.spyOn(projectGroupFormService, 'getProjectGroup').mockReturnValue({ id: null });
      vitest.spyOn(projectGroupService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ projectGroup: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(projectGroup);
      saveSubject.complete();

      // THEN
      expect(projectGroupFormService.getProjectGroup).toHaveBeenCalled();
      expect(projectGroupService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IProjectGroup>();
      const projectGroup = { id: '09699592-062b-40e5-aa51-6ed07e22b997' };
      vitest.spyOn(projectGroupService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ projectGroup });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(projectGroupService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCourse', () => {
      it('should forward to courseService', () => {
        const entity = { id: '111fabe5-d417-4bae-ac6e-f3e3a988982f' };
        const entity2 = { id: '85e942c3-e3e8-4da2-bd51-1e7f78f98fe6' };
        vitest.spyOn(courseService, 'compareCourse');
        comp.compareCourse(entity, entity2);
        expect(courseService.compareCourse).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
