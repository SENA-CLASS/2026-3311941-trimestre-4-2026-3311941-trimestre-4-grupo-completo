import { ICheckListCourse, NewCheckListCourse } from './check-list-course.model';

export const sampleWithRequiredData: ICheckListCourse = {
  id: '4092bfbc-9a4c-4d35-a025-3829bd84829d',
  checkListState: 'INACTIVE',
};

export const sampleWithPartialData: ICheckListCourse = {
  id: '367c129d-c7c3-4dea-b2c9-9d1b806486eb',
  checkListState: 'INACTIVE',
};

export const sampleWithFullData: ICheckListCourse = {
  id: '8907e363-d712-43bb-8261-eb4c3f4fd1c1',
  checkListState: 'ACTIVE',
};

export const sampleWithNewData: NewCheckListCourse = {
  checkListState: 'ACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
