import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { IArea } from '../area.model';
import { AreaService } from '../service/area.service';

import { AreaFormService } from './area-form.service';
import { AreaUpdate } from './area-update';

describe('Area Management Update Component', () => {
  let comp: AreaUpdate;
  let fixture: ComponentFixture<AreaUpdate>;
  let activatedRoute: ActivatedRoute;
  let areaFormService: AreaFormService;
  let areaService: AreaService;

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

    fixture = TestBed.createComponent(AreaUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    areaFormService = TestBed.inject(AreaFormService);
    areaService = TestBed.inject(AreaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const area: IArea = { id: '6b7f7f72-3379-424f-89a7-32b55dae7761' };

      activatedRoute.data = of({ area });
      comp.ngOnInit();

      expect(comp.area).toEqual(area);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IArea>();
      const area = { id: '913d13dc-00df-4c1e-98a7-a89896aa2814' };
      vitest.spyOn(areaFormService, 'getArea').mockReturnValue(area);
      vitest.spyOn(areaService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ area });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(area);
      saveSubject.complete();

      // THEN
      expect(areaFormService.getArea).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(areaService.update).toHaveBeenCalledWith(expect.objectContaining(area));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IArea>();
      const area = { id: '913d13dc-00df-4c1e-98a7-a89896aa2814' };
      vitest.spyOn(areaFormService, 'getArea').mockReturnValue({ id: null });
      vitest.spyOn(areaService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ area: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(area);
      saveSubject.complete();

      // THEN
      expect(areaFormService.getArea).toHaveBeenCalled();
      expect(areaService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IArea>();
      const area = { id: '913d13dc-00df-4c1e-98a7-a89896aa2814' };
      vitest.spyOn(areaService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ area });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(areaService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
