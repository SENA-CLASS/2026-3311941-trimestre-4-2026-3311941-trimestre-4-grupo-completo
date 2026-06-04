import { IMemberGroup, NewMemberGroup } from './member-group.model';

export const sampleWithRequiredData: IMemberGroup = {
  id: 'ff77902d-252b-460a-ba9f-9cea887e4d07',
};

export const sampleWithPartialData: IMemberGroup = {
  id: '6446812b-d629-4509-b282-5050811afc60',
};

export const sampleWithFullData: IMemberGroup = {
  id: '3290bfdb-3528-429f-9073-c29cb95d9d5d',
};

export const sampleWithNewData: NewMemberGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
