import dayjs from 'dayjs/esm';

import { IPlanning, NewPlanning } from './planning.model';

export const sampleWithRequiredData: IPlanning = {
  id: '9a8b422b-a43b-4460-9fca-5c64e358f182',
  planningCode: 'till graft schematise',
  planningDate: dayjs('2026-05-07T14:51'),
  planningState: 'INACTIVE',
};

export const sampleWithPartialData: IPlanning = {
  id: 'a54d5eca-3419-4e2a-82fa-e805276645b2',
  planningCode: 'yesterday politely',
  planningDate: dayjs('2026-05-07T07:30'),
  planningState: 'ACTIVE',
};

export const sampleWithFullData: IPlanning = {
  id: '79f23089-81e8-4719-9d19-dba6b0b7cfc1',
  planningCode: 'swelter',
  planningDate: dayjs('2026-05-07T15:07'),
  planningState: 'ACTIVE',
};

export const sampleWithNewData: NewPlanning = {
  planningCode: 'after',
  planningDate: dayjs('2026-05-07T16:04'),
  planningState: 'ACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
