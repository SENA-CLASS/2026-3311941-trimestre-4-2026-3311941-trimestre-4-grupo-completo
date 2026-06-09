import { ILearningResult, NewLearningResult } from './learning-result.model';

export const sampleWithRequiredData: ILearningResult = {
  id: 'd75b64fc-29ec-4443-8132-e5d8bf626342',
  resultCode: 'carefree silently uh-huh',
  denomination: 'whose gadzooks huzzah',
};

export const sampleWithPartialData: ILearningResult = {
  id: 'fa03fe24-1c59-493f-bb1a-7def5d05785a',
  resultCode: 'ew and what',
  denomination: 'sunbeam',
};

export const sampleWithFullData: ILearningResult = {
  id: '7f5b1461-2d0e-45bb-ac6f-817d76c13bc6',
  resultCode: 'in numeric upside-down',
  denomination: 'pulverize',
};

export const sampleWithNewData: NewLearningResult = {
  resultCode: 'indeed',
  denomination: 'hmph mysteriously psst',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
