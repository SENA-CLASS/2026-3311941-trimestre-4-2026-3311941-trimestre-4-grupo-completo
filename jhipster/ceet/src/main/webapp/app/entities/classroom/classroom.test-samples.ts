import { IClassroom, NewClassroom } from './classroom.model';

export const sampleWithRequiredData: IClassroom = {
  id: '4e7e367a-2a30-41f9-9a09-0106d2b70d2a',
  classroomNumber: 'though um uselessly',
  classroomDescription: 'times',
  classroomState: 'ACTIVE',
  limitation: 'WITH_LIMITATION',
};

export const sampleWithPartialData: IClassroom = {
  id: '3795f2e9-2526-46f3-8ae4-22172155eab6',
  classroomNumber: 'what',
  classroomDescription: 'palate pile',
  classroomState: 'INACTIVE',
  limitation: 'WITHOUT_LIMITATION',
};

export const sampleWithFullData: IClassroom = {
  id: '86557c6a-d0d2-44c9-bdf3-7c263060fc98',
  classroomNumber: 'than sheepishly wherever',
  classroomDescription: 'carboxyl',
  classroomState: 'INACTIVE',
  limitation: 'WITHOUT_LIMITATION',
};

export const sampleWithNewData: NewClassroom = {
  classroomNumber: 'without',
  classroomDescription: 'and geez',
  classroomState: 'INACTIVE',
  limitation: 'WITHOUT_LIMITATION',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
