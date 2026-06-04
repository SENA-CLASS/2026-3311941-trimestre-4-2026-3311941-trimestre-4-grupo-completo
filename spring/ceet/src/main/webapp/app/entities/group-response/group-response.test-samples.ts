import dayjs from 'dayjs/esm';

import { IGroupResponse, NewGroupResponse } from './group-response.model';

export const sampleWithRequiredData: IGroupResponse = {
  id: 'f0c02de5-3fda-4296-b3ad-501f0f1f8ed6',
  evaluationDate: dayjs('2026-05-07T06:45'),
};

export const sampleWithPartialData: IGroupResponse = {
  id: 'e42cf143-e8e0-48a9-adbc-39c665bb2c6e',
  evaluationDate: dayjs('2026-05-07T09:02'),
};

export const sampleWithFullData: IGroupResponse = {
  id: '23e6afa3-4fd9-4421-b823-1308790592b7',
  evaluationDate: dayjs('2026-05-07T10:33'),
};

export const sampleWithNewData: NewGroupResponse = {
  evaluationDate: dayjs('2026-05-07T19:18'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
