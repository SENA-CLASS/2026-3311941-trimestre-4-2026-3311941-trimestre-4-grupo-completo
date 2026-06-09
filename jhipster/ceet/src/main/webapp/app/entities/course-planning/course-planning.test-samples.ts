import { ICoursePlanning, NewCoursePlanning } from './course-planning.model';

export const sampleWithRequiredData: ICoursePlanning = {
  id: '86c0d7e6-2ab4-4809-88f4-2c2d4a3eb2c4',
  stateCoursePlanning: 'ACTIVE',
};

export const sampleWithPartialData: ICoursePlanning = {
  id: '95183086-65c6-452b-beca-3edc0d179491',
  stateCoursePlanning: 'INACTIVE',
};

export const sampleWithFullData: ICoursePlanning = {
  id: '190c36e6-697e-4f10-9394-185c4e96f4f1',
  stateCoursePlanning: 'ACTIVE',
};

export const sampleWithNewData: NewCoursePlanning = {
  stateCoursePlanning: 'INACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
