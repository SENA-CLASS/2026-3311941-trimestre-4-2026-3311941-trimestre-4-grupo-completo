import { IProjectActivity, NewProjectActivity } from './project-activity.model';

export const sampleWithRequiredData: IProjectActivity = {
  id: '49fccf46-ea6d-49e3-b22f-7d09717b6268',
  activityNumber: 15161,
  activityDescription: 'secrecy if',
  projectActivityState: 'aha',
};

export const sampleWithPartialData: IProjectActivity = {
  id: '796ba84a-fcb7-40e2-81b9-871f66cece8c',
  activityNumber: 1365,
  activityDescription: 'hoick',
  projectActivityState: 'since save',
};

export const sampleWithFullData: IProjectActivity = {
  id: '964e67aa-326e-4683-be5d-6d9f93d82d80',
  activityNumber: 23246,
  activityDescription: 'putrid hyena yet',
  projectActivityState: 'enlightened dead',
};

export const sampleWithNewData: NewProjectActivity = {
  activityNumber: 12143,
  activityDescription: 'archive dress',
  projectActivityState: 'similar squid since',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
