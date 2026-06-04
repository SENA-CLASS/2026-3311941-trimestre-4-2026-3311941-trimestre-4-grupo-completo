import { IScheduleVersion, NewScheduleVersion } from './schedule-version.model';

export const sampleWithRequiredData: IScheduleVersion = {
  id: 'f70dacf2-9331-4900-a669-15364046f79e',
  versionNumber: 'chromakey',
  versionState: 'ACTIVE',
};

export const sampleWithPartialData: IScheduleVersion = {
  id: '7f662b0e-0daa-4c12-8094-74c4860257fc',
  versionNumber: 'geez junior',
  versionState: 'INACTIVE',
};

export const sampleWithFullData: IScheduleVersion = {
  id: '5d7063b3-7da0-4af7-af14-83c72febb2be',
  versionNumber: 'gadzooks wisely blah',
  versionState: 'ACTIVE',
};

export const sampleWithNewData: NewScheduleVersion = {
  versionNumber: 'eventually',
  versionState: 'INACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
