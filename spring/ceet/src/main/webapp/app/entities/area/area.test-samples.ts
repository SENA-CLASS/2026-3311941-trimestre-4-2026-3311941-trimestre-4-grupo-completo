import { IArea, NewArea } from './area.model';

export const sampleWithRequiredData: IArea = {
  id: '53eaa7f0-2994-49df-8f0f-fcc099bab5da',
  areaName: 'circa',
  areaState: 'INACTIVE',
};

export const sampleWithPartialData: IArea = {
  id: '0ec5ddd8-d433-49ae-a4d2-7c16b1bd72f9',
  areaName: 'spirit tomorrow candid',
  areaState: 'ACTIVE',
};

export const sampleWithFullData: IArea = {
  id: '288f8502-256e-4473-9242-716aeb123d49',
  areaName: 'deeply until',
  urlLogo: 'calculus infamous',
  areaState: 'INACTIVE',
};

export const sampleWithNewData: NewArea = {
  areaName: 'since viability',
  areaState: 'ACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
