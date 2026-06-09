import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { ICampus } from '../campus.model';
import { CampusService } from '../service/campus.service';

import { CampusFormService } from './campus-form.service';
import { CampusUpdate } from './campus-update';

describe('Campus Management Update Component', () => {
  let comp: CampusUpdate;
  let fixture: ComponentFixture<CampusUpdate>;
  let activatedRoute: ActivatedRoute;
  let campusFormService: CampusFormService;
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

    fixture = TestBed.createComponent(CampusUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    campusFormService = TestBed.inject(CampusFormService);
    campusService = TestBed.inject(CampusService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const campus: ICampus = { id: 'cb5eec4e-899a-4c15-b434-f00e711b5f5c' };

      activatedRoute.data = of({ campus });
      comp.ngOnInit();

      expect(comp.campus).toEqual(campus);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<ICampus>();
      const campus = { id: 'ef9c809c-3ee1-443a-82b3-b6747c4e5680' };
      vitest.spyOn(campusFormService, 'getCampus').mockReturnValue(campus);
      vitest.spyOn(campusService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ campus });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(campus);
      saveSubject.complete();

      // THEN
      expect(campusFormService.getCampus).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(campusService.update).toHaveBeenCalledWith(expect.objectContaining(campus));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<ICampus>();
      const campus = { id: 'ef9c809c-3ee1-443a-82b3-b6747c4e5680' };
      vitest.spyOn(campusFormService, 'getCampus').mockReturnValue({ id: null });
      vitest.spyOn(campusService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ campus: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(campus);
      saveSubject.complete();

      // THEN
      expect(campusFormService.getCampus).toHaveBeenCalled();
      expect(campusService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<ICampus>();
      const campus = { id: 'ef9c809c-3ee1-443a-82b3-b6747c4e5680' };
      vitest.spyOn(campusService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ campus });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(campusService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
