import { IAreaInstructor, NewAreaInstructor } from './area-instructor.model';

export const sampleWithRequiredData: IAreaInstructor = {
  id: '21c0e845-153b-4bc5-8598-baa89cbfe342',
  areaInstructorState: 'ACTIVE',
};

export const sampleWithPartialData: IAreaInstructor = {
  id: 'f6df1e83-4965-4294-9915-49324650b95f',
  areaInstructorState: 'INACTIVE',
};

export const sampleWithFullData: IAreaInstructor = {
  id: 'ff125ca2-749e-44a9-846f-e535f020cba6',
  areaInstructorState: 'ACTIVE',
};

export const sampleWithNewData: NewAreaInstructor = {
  areaInstructorState: 'INACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
