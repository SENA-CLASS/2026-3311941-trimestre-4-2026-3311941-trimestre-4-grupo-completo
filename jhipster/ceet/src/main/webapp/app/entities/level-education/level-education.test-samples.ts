import { ILevelEducation, NewLevelEducation } from './level-education.model';

export const sampleWithRequiredData: ILevelEducation = {
  id: '0b62c36a-037a-4cbe-b078-49820c63ce5f',
  levelName: 'throughout',
  stateLevelEducation: 'INACTIVE',
};

export const sampleWithPartialData: ILevelEducation = {
  id: 'c365010d-b06c-4343-b7c5-8156291d50b5',
  levelName: 'progress',
  stateLevelEducation: 'ACTIVE',
};

export const sampleWithFullData: ILevelEducation = {
  id: 'de1731c4-2866-440a-b9d7-ab9ee89db01b',
  levelName: 'eek',
  stateLevelEducation: 'ACTIVE',
};

export const sampleWithNewData: NewLevelEducation = {
  levelName: 'yum muddy shout',
  stateLevelEducation: 'ACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
