import { ISchedule, NewSchedule } from './schedule.model';

export const sampleWithRequiredData: ISchedule = {
  id: '64a7231d-35cf-456b-98ca-3f5cab909dc9',
  startTime: '5185',
  endTime: '29492',
};

export const sampleWithPartialData: ISchedule = {
  id: '64ccdbe0-1668-44f8-bba6-f90008ad05d9',
  startTime: '11756',
  endTime: '14413',
};

export const sampleWithFullData: ISchedule = {
  id: '5a565d23-7eec-4555-944c-e4838b9fa180',
  startTime: '16260',
  endTime: '27968',
};

export const sampleWithNewData: NewSchedule = {
  startTime: '8469',
  endTime: '15865',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
