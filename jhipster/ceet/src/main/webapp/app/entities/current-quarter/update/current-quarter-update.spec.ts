import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { YearService } from 'app/entities/year/service/year.service';
import { IYear } from 'app/entities/year/year.model';
import { ICurrentQuarter } from '../current-quarter.model';
import { CurrentQuarterService } from '../service/current-quarter.service';

import { CurrentQuarterFormService } from './current-quarter-form.service';
import { CurrentQuarterUpdate } from './current-quarter-update';

describe('CurrentQuarter Management Update Component', () => {
  let comp: CurrentQuarterUpdate;
  let fixture: ComponentFixture<CurrentQuarterUpdate>;
  let activatedRoute: ActivatedRoute;
  let currentQuarterFormService: CurrentQuarterFormService;
  let currentQuarterService: CurrentQuarterService;
  let yearService: YearService;

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

    fixture = TestBed.createComponent(CurrentQuarterUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    currentQuarterFormService = TestBed.inject(CurrentQuarterFormService);
    currentQuarterService = TestBed.inject(CurrentQuarterService);
    yearService = TestBed.inject(YearService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Year query and add missing value', () => {
      const currentQuarter: ICurrentQuarter = { id: '4af0f48b-9729-4737-a11e-246ced312d2f' };
      const year: IYear = { id: '7d487a17-3974-4015-af9f-a5353d384918' };
      currentQuarter.year = year;

      const yearCollection: IYear[] = [{ id: '7d487a17-3974-4015-af9f-a5353d384918' }];
      vitest.spyOn(yearService, 'query').mockReturnValue(of(new HttpResponse({ body: yearCollection })));
      const additionalYears = [year];
      const expectedCollection: IYear[] = [...additionalYears, ...yearCollection];
      vitest.spyOn(yearService, 'addYearToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ currentQuarter });
      comp.ngOnInit();

      expect(yearService.query).toHaveBeenCalled();
      expect(yearService.addYearToCollectionIfMissing).toHaveBeenCalledWith(
        yearCollection,
        ...additionalYears.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.yearsSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const currentQuarter: ICurrentQuarter = { id: '4af0f48b-9729-4737-a11e-246ced312d2f' };
      const year: IYear = { id: '7d487a17-3974-4015-af9f-a5353d384918' };
      currentQuarter.year = year;

      activatedRoute.data = of({ currentQuarter });
      comp.ngOnInit();

      expect(comp.yearsSharedCollection()).toContainEqual(year);
      expect(comp.currentQuarter).toEqual(currentQuarter);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<ICurrentQuarter>();
      const currentQuarter = { id: '0ed02114-2749-41f7-9a38-0f3348269a95' };
      vitest.spyOn(currentQuarterFormService, 'getCurrentQuarter').mockReturnValue(currentQuarter);
      vitest.spyOn(currentQuarterService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ currentQuarter });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(currentQuarter);
      saveSubject.complete();

      // THEN
      expect(currentQuarterFormService.getCurrentQuarter).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(currentQuarterService.update).toHaveBeenCalledWith(expect.objectContaining(currentQuarter));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<ICurrentQuarter>();
      const currentQuarter = { id: '0ed02114-2749-41f7-9a38-0f3348269a95' };
      vitest.spyOn(currentQuarterFormService, 'getCurrentQuarter').mockReturnValue({ id: null });
      vitest.spyOn(currentQuarterService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ currentQuarter: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(currentQuarter);
      saveSubject.complete();

      // THEN
      expect(currentQuarterFormService.getCurrentQuarter).toHaveBeenCalled();
      expect(currentQuarterService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<ICurrentQuarter>();
      const currentQuarter = { id: '0ed02114-2749-41f7-9a38-0f3348269a95' };
      vitest.spyOn(currentQuarterService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ currentQuarter });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(currentQuarterService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareYear', () => {
      it('should forward to yearService', () => {
        const entity = { id: '7d487a17-3974-4015-af9f-a5353d384918' };
        const entity2 = { id: '70a58d86-c825-46c0-9c7b-bf2627e12900' };
        vitest.spyOn(yearService, 'compareYear');
        comp.compareYear(entity, entity2);
        expect(yearService.compareYear).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
