import { ITrainingStatus, NewTrainingStatus } from './training-status.model';

export const sampleWithRequiredData: ITrainingStatus = {
  id: 'af13887c-029f-4ad8-acad-564ecc52c34b',
  statusName: 'rudely into assured',
  stateTraining: 'INACTIVE',
};

export const sampleWithPartialData: ITrainingStatus = {
  id: 'a99f673f-017f-4541-9583-0420c406e455',
  statusName: 'cautiously cram aw',
  stateTraining: 'ACTIVE',
};

export const sampleWithFullData: ITrainingStatus = {
  id: 'bf05d3c6-6179-4477-a524-6e6d59114267',
  statusName: 'dreamily',
  stateTraining: 'INACTIVE',
};

export const sampleWithNewData: NewTrainingStatus = {
  statusName: 'misspend yieldingly unused',
  stateTraining: 'INACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
