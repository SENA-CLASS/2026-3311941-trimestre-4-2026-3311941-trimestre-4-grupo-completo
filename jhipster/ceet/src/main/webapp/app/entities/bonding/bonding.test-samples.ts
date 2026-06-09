import { IBonding, NewBonding } from './bonding.model';

export const sampleWithRequiredData: IBonding = {
  id: '3cab283a-8585-4823-bdae-a9869b6e3f67',
  bondingType: 'lanky scratch',
  workingHours: 10249,
  bondingState: 'ACTIVE',
};

export const sampleWithPartialData: IBonding = {
  id: 'bdf83a4e-7d7d-4ad7-8d29-f6f526abb1a9',
  bondingType: 'slowly preclude',
  workingHours: 32337,
  bondingState: 'INACTIVE',
};

export const sampleWithFullData: IBonding = {
  id: '5202cbc3-f2b1-4b57-a721-020f294b799e',
  bondingType: 'lowball yum yearly',
  workingHours: 16805,
  bondingState: 'ACTIVE',
};

export const sampleWithNewData: NewBonding = {
  bondingType: 'musty until needily',
  workingHours: 24029,
  bondingState: 'INACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
