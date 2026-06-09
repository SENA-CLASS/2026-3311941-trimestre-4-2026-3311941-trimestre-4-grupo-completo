import { IViewedResult, NewViewedResult } from './viewed-result.model';

export const sampleWithRequiredData: IViewedResult = {
  id: '61d26ee2-79e7-4bc6-8747-7b109394dbc0',
};

export const sampleWithPartialData: IViewedResult = {
  id: '04cccb8f-4b3a-4cdb-a4b1-b775b2f55f9e',
};

export const sampleWithFullData: IViewedResult = {
  id: '62d4e716-98c1-40c2-acde-6ba837645e0d',
};

export const sampleWithNewData: NewViewedResult = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
