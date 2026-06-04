import { IProjectPhase, NewProjectPhase } from './project-phase.model';

export const sampleWithRequiredData: IProjectPhase = {
  id: '6f1f0e0a-42dc-4926-b299-28876ccf4432',
  projectPhaseCode: 'upward',
  projectPhaseState: 'outset against',
};

export const sampleWithPartialData: IProjectPhase = {
  id: '6616ceef-6242-41c0-8ff6-4b54001ac1a0',
  projectPhaseCode: 'mid off',
  projectPhaseState: 'but',
};

export const sampleWithFullData: IProjectPhase = {
  id: '44a7d563-4d91-46eb-8e7c-3f4d2a713d30',
  projectPhaseCode: 'in at',
  projectPhaseState: 'parallel',
};

export const sampleWithNewData: NewProjectPhase = {
  projectPhaseCode: 'abaft fashion',
  projectPhaseState: 'or qua writ',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
