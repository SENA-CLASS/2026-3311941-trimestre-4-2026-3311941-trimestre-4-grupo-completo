import { IInstructor, NewInstructor } from './instructor.model';

export const sampleWithRequiredData: IInstructor = {
  id: '3db1a25c-9190-40a7-aa74-5df7965deeda',
  instructorState: 'ACTIVE',
};

export const sampleWithPartialData: IInstructor = {
  id: '6a1badc9-d304-4b8b-97c7-e3eaa4a4903b',
  instructorState: 'ACTIVE',
};

export const sampleWithFullData: IInstructor = {
  id: '57081dac-cc89-49b8-a2ff-9c81764448e6',
  instructorState: 'ACTIVE',
};

export const sampleWithNewData: NewInstructor = {
  instructorState: 'INACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
