import { IWorkingDay, NewWorkingDay } from './working-day.model';

export const sampleWithRequiredData: IWorkingDay = {
  id: 'ded88bee-717e-4163-827a-c2e25d894f2d',
  startTime: '10127',
  endTime: '14003',
};

export const sampleWithPartialData: IWorkingDay = {
  id: '30be9814-a988-439b-a60c-dc3a2dfcc121',
  startTime: '8080',
  endTime: '12037',
};

export const sampleWithFullData: IWorkingDay = {
  id: 'adfe0f3f-257c-4db5-8886-d840feab90db',
  startTime: '24889',
  endTime: '1306',
};

export const sampleWithNewData: NewWorkingDay = {
  startTime: '31068',
  endTime: '2585',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
