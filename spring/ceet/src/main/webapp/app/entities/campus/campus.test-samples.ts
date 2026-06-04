import { ICampus, NewCampus } from './campus.model';

export const sampleWithRequiredData: ICampus = {
  id: '4bcfcbb3-5d34-4e14-8316-b67c8c2b285c',
  campusName: 'gah',
  campusAddress: 'an too',
  campusState: 'INACTIVE',
};

export const sampleWithPartialData: ICampus = {
  id: '7f4ee3a1-b431-4450-a3b9-2cb70852df5f',
  campusName: 'cautiously finally gulp',
  campusAddress: 'sleepily provision ramp',
  campusState: 'INACTIVE',
};

export const sampleWithFullData: ICampus = {
  id: 'f4de4d75-0203-46ef-95de-e0c8585a9b04',
  campusName: 'warp redound reassuringly',
  campusAddress: 'gloom outside anti',
  campusState: 'ACTIVE',
};

export const sampleWithNewData: NewCampus = {
  campusName: 'vice dispense during',
  campusAddress: 'vice rim restfully',
  campusState: 'INACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
