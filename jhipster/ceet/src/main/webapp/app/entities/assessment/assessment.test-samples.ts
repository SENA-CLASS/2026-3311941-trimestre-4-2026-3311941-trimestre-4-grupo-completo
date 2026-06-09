import { IAssessment, NewAssessment } from './assessment.model';

export const sampleWithRequiredData: IAssessment = {
  id: '13424142-e640-49be-b72a-a11ba3444282',
  assessmentType: 'propound before',
  assessmentState: 'ACTIVE',
};

export const sampleWithPartialData: IAssessment = {
  id: '5eb76ed4-bfcc-49d0-b4bc-7c6f75424694',
  assessmentType: 'courageously',
  assessmentState: 'INACTIVE',
};

export const sampleWithFullData: IAssessment = {
  id: '020647b2-db46-4301-8d50-1d26f1243311',
  assessmentType: 'besides than',
  assessmentState: 'INACTIVE',
};

export const sampleWithNewData: NewAssessment = {
  assessmentType: 'impure pave although',
  assessmentState: 'ACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
