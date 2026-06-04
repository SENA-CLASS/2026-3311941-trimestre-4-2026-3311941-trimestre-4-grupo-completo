import { IPlanningActivity, NewPlanningActivity } from './planning-activity.model';

export const sampleWithRequiredData: IPlanningActivity = {
  id: '81e7b56d-2fe8-462b-9bc7-d39d63ed4e12',
};

export const sampleWithPartialData: IPlanningActivity = {
  id: '4f17a780-bce2-4d4c-984e-dec58e74d6da',
};

export const sampleWithFullData: IPlanningActivity = {
  id: '586b3d5d-2635-4e98-b092-6fe176c832b1',
};

export const sampleWithNewData: NewPlanningActivity = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
