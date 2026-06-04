import { IWorkingDayCourse, NewWorkingDayCourse } from './working-day-course.model';

export const sampleWithRequiredData: IWorkingDayCourse = {
  id: 'fb31dcf3-17c4-4b40-b5b6-494facc8fa0a',
  workingDayAcronym: 'yuppify sonata',
  workingDayName: 'sans',
  description: 'ouch with whose',
  stateWorkingDay: 'INACTIVE',
};

export const sampleWithPartialData: IWorkingDayCourse = {
  id: '6cbabbb2-9e9d-4304-9353-de13a15f4399',
  workingDayAcronym: 'greatly provided',
  workingDayName: 'dally',
  description: 'unbearably within yum',
  stateWorkingDay: 'INACTIVE',
};

export const sampleWithFullData: IWorkingDayCourse = {
  id: 'f79b8599-745e-49c9-abf9-f482c743b1af',
  workingDayAcronym: 'psst',
  workingDayName: 'halt amid woot',
  description: 'how',
  imageUrl: 'carboxyl',
  stateWorkingDay: 'ACTIVE',
};

export const sampleWithNewData: NewWorkingDayCourse = {
  workingDayAcronym: 'plus uh-huh without',
  workingDayName: 'only ick',
  description: 'obvious alienated',
  stateWorkingDay: 'ACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
