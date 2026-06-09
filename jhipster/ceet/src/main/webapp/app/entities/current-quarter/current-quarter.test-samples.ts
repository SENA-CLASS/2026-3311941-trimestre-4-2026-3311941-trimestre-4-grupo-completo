import dayjs from 'dayjs/esm';

import { ICurrentQuarter, NewCurrentQuarter } from './current-quarter.model';

export const sampleWithRequiredData: ICurrentQuarter = {
  id: '482e0d0b-f224-473d-ab0f-c7d510577f44',
  scheduledQuarter: 25440,
  startQuarter: dayjs('2026-06-09'),
  endQuarter: dayjs('2026-06-09'),
  currentQuarterState: 'ACTIVE',
};

export const sampleWithPartialData: ICurrentQuarter = {
  id: '7c088623-98b2-4308-961f-7eba8a673703',
  scheduledQuarter: 14140,
  startQuarter: dayjs('2026-06-09'),
  endQuarter: dayjs('2026-06-09'),
  currentQuarterState: 'INACTIVE',
};

export const sampleWithFullData: ICurrentQuarter = {
  id: 'a579412c-bca2-4e3e-95c5-32e44a2627c6',
  scheduledQuarter: 27007,
  startQuarter: dayjs('2026-06-10'),
  endQuarter: dayjs('2026-06-09'),
  currentQuarterState: 'INACTIVE',
};

export const sampleWithNewData: NewCurrentQuarter = {
  scheduledQuarter: 22625,
  startQuarter: dayjs('2026-06-09'),
  endQuarter: dayjs('2026-06-09'),
  currentQuarterState: 'INACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
