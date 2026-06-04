import { IYear, NewYear } from './year.model';

export const sampleWithRequiredData: IYear = {
  id: '765a00d7-5aa7-4d2d-a944-0272e95cb1da',
  yearNumber: 12756,
  yearState: 'ACTIVE',
};

export const sampleWithPartialData: IYear = {
  id: '52ccdb1d-6c59-4873-800b-980da43a61b1',
  yearNumber: 29919,
  yearState: 'ACTIVE',
};

export const sampleWithFullData: IYear = {
  id: '8952af5e-fa6f-4e0d-8e28-8069bee1d348',
  yearNumber: 3331,
  yearState: 'ACTIVE',
};

export const sampleWithNewData: NewYear = {
  yearNumber: 1664,
  yearState: 'INACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
