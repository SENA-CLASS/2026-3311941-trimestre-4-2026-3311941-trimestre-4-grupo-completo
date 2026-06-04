import { IQuarterSchedule, NewQuarterSchedule } from './quarter-schedule.model';

export const sampleWithRequiredData: IQuarterSchedule = {
  id: '08318263-c264-444a-af3c-e8a0b9d287e4',
};

export const sampleWithPartialData: IQuarterSchedule = {
  id: '3dcb12ba-b9fb-46fb-9523-de573e0489c5',
};

export const sampleWithFullData: IQuarterSchedule = {
  id: '96c97d85-8b11-4783-989b-d55925e16d4c',
};

export const sampleWithNewData: NewQuarterSchedule = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
