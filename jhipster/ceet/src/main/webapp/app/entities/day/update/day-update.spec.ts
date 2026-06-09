import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { IDay } from '../day.model';
import { DayService } from '../service/day.service';

import { DayFormService } from './day-form.service';
import { DayUpdate } from './day-update';

describe('Day Management Update Component', () => {
  let comp: DayUpdate;
  let fixture: ComponentFixture<DayUpdate>;
  let activatedRoute: ActivatedRoute;
  let dayFormService: DayFormService;
  let dayService: DayService;

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

    fixture = TestBed.createComponent(DayUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    dayFormService = TestBed.inject(DayFormService);
    dayService = TestBed.inject(DayService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const day: IDay = { id: 'c3c5c445-4f79-4566-bfd4-47c60ed1bf8e' };

      activatedRoute.data = of({ day });
      comp.ngOnInit();

      expect(comp.day).toEqual(day);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IDay>();
      const day = { id: '712b4dd0-c635-4121-a9e3-1854687dde35' };
      vitest.spyOn(dayFormService, 'getDay').mockReturnValue(day);
      vitest.spyOn(dayService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ day });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(day);
      saveSubject.complete();

      // THEN
      expect(dayFormService.getDay).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(dayService.update).toHaveBeenCalledWith(expect.objectContaining(day));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IDay>();
      const day = { id: '712b4dd0-c635-4121-a9e3-1854687dde35' };
      vitest.spyOn(dayFormService, 'getDay').mockReturnValue({ id: null });
      vitest.spyOn(dayService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ day: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(day);
      saveSubject.complete();

      // THEN
      expect(dayFormService.getDay).toHaveBeenCalled();
      expect(dayService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IDay>();
      const day = { id: '712b4dd0-c635-4121-a9e3-1854687dde35' };
      vitest.spyOn(dayService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ day });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(dayService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
