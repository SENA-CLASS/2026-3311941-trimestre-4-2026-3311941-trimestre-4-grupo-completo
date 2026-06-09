import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { IBonding } from '../bonding.model';
import { BondingService } from '../service/bonding.service';

import { BondingFormService } from './bonding-form.service';
import { BondingUpdate } from './bonding-update';

describe('Bonding Management Update Component', () => {
  let comp: BondingUpdate;
  let fixture: ComponentFixture<BondingUpdate>;
  let activatedRoute: ActivatedRoute;
  let bondingFormService: BondingFormService;
  let bondingService: BondingService;

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

    fixture = TestBed.createComponent(BondingUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    bondingFormService = TestBed.inject(BondingFormService);
    bondingService = TestBed.inject(BondingService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const bonding: IBonding = { id: 'c7a8c508-c7aa-40be-9cbe-abb77ff018ba' };

      activatedRoute.data = of({ bonding });
      comp.ngOnInit();

      expect(comp.bonding).toEqual(bonding);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IBonding>();
      const bonding = { id: '57960bcc-d6df-4acc-bce6-afeba60dd2e4' };
      vitest.spyOn(bondingFormService, 'getBonding').mockReturnValue(bonding);
      vitest.spyOn(bondingService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bonding });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(bonding);
      saveSubject.complete();

      // THEN
      expect(bondingFormService.getBonding).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(bondingService.update).toHaveBeenCalledWith(expect.objectContaining(bonding));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IBonding>();
      const bonding = { id: '57960bcc-d6df-4acc-bce6-afeba60dd2e4' };
      vitest.spyOn(bondingFormService, 'getBonding').mockReturnValue({ id: null });
      vitest.spyOn(bondingService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bonding: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(bonding);
      saveSubject.complete();

      // THEN
      expect(bondingFormService.getBonding).toHaveBeenCalled();
      expect(bondingService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IBonding>();
      const bonding = { id: '57960bcc-d6df-4acc-bce6-afeba60dd2e4' };
      vitest.spyOn(bondingService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bonding });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(bondingService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
