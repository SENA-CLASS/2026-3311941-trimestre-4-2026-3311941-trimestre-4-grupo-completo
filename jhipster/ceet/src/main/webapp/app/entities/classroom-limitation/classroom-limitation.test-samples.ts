import { IClassroomLimitation, NewClassroomLimitation } from './classroom-limitation.model';

export const sampleWithRequiredData: IClassroomLimitation = {
  id: '5ef5fbb2-3656-45f0-a062-8942cfd6b0fa',
};

export const sampleWithPartialData: IClassroomLimitation = {
  id: 'e5493b70-8ee4-4096-9f3d-ba070e3af0cd',
};

export const sampleWithFullData: IClassroomLimitation = {
  id: '12fc5bd2-a0fb-4e82-9719-d541a93b9e80',
};

export const sampleWithNewData: NewClassroomLimitation = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
