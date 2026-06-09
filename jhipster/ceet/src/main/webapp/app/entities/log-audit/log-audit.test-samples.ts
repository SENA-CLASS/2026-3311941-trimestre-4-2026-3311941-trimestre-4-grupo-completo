import dayjs from 'dayjs/esm';

import { ILogAudit, NewLogAudit } from './log-audit.model';

export const sampleWithRequiredData: ILogAudit = {
  id: '1d7af480-c914-43c0-b710-4d2221a61b2b',
  levelAudit: 'wash',
  logName: 'savour',
  messageAudit: 'utterly',
  dateAudit: dayjs('2026-06-09T13:19'),
};

export const sampleWithPartialData: ILogAudit = {
  id: '2f76ec91-d236-4955-b7bb-1ed35d902b61',
  levelAudit: 'rubric gadzooks atop',
  logName: 'apropos pfft unlike',
  messageAudit: 'impractical glider gadzooks',
  dateAudit: dayjs('2026-06-09T10:45'),
};

export const sampleWithFullData: ILogAudit = {
  id: '7c8334e9-baa9-422f-8b20-cfd3e9dbc3d6',
  levelAudit: 'um',
  logName: 'doodle',
  messageAudit: 'mostly',
  dateAudit: dayjs('2026-06-09T14:51'),
};

export const sampleWithNewData: NewLogAudit = {
  levelAudit: 'unto ah',
  logName: 'likable huzzah',
  messageAudit: 'overcooked positively overload',
  dateAudit: dayjs('2026-06-09T17:11'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
