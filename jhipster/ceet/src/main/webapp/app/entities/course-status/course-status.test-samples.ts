import { ICourseStatus, NewCourseStatus } from './course-status.model';

export const sampleWithRequiredData: ICourseStatus = {
  id: '7dbfa421-7d7a-4ba1-be91-d17f7cf8783d',
  nameCourseStatus: 'quip',
  stateCourse: 'ACTIVE',
};

export const sampleWithPartialData: ICourseStatus = {
  id: 'fe6bd576-1b8e-45aa-84ff-6ae227eb1b78',
  nameCourseStatus: 'shoulder',
  stateCourse: 'INACTIVE',
};

export const sampleWithFullData: ICourseStatus = {
  id: '6fc8049e-5096-46e3-aa80-9e59e23e283e',
  nameCourseStatus: 'medium less',
  stateCourse: 'INACTIVE',
};

export const sampleWithNewData: NewCourseStatus = {
  nameCourseStatus: 'international',
  stateCourse: 'INACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
