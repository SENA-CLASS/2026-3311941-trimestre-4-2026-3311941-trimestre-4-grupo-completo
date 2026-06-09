import dayjs from 'dayjs/esm';

import { ILogError, NewLogError } from './log-error.model';

export const sampleWithRequiredData: ILogError = {
  id: '80854684-1cd3-43e9-bb9f-f303accbc452',
  levelError: 'bruised',
  logName: 'um since',
  messageError: 'ugh',
  dateError: dayjs('2026-06-09T18:52'),
};

export const sampleWithPartialData: ILogError = {
  id: '432e6a54-a692-40ea-95fd-faba83f7b1ca',
  levelError: 'than over',
  logName: 'gah',
  messageError: 'stoop fidget',
  dateError: dayjs('2026-06-09T07:10'),
};

export const sampleWithFullData: ILogError = {
  id: '7670245f-0449-474d-b91c-e6c4b2cdd3bf',
  levelError: 'plain why',
  logName: 'oof',
  messageError: 'clueless drag kookily',
  dateError: dayjs('2026-06-09T13:33'),
};

export const sampleWithNewData: NewLogError = {
  levelError: 'anxiously blond',
  logName: 'roadway',
  messageError: 'but',
  dateError: dayjs('2026-06-09T05:56'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
