import { IBoundingSchedule, NewBoundingSchedule } from './bounding-schedule.model';

export const sampleWithRequiredData: IBoundingSchedule = {
  id: '115aae7a-74de-4f07-bc3b-ef35eaa3a3a6',
};

export const sampleWithPartialData: IBoundingSchedule = {
  id: '4ecab13e-a187-41f1-a790-b4a85373049f',
};

export const sampleWithFullData: IBoundingSchedule = {
  id: '7b6725c4-1d25-43c4-b273-e236ef8dbbfe',
};

export const sampleWithNewData: NewBoundingSchedule = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
