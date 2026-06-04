import dayjs from 'dayjs/esm';

import { IBondingInstructor, NewBondingInstructor } from './bonding-instructor.model';

export const sampleWithRequiredData: IBondingInstructor = {
  id: 'ad290bfa-715b-4d26-996d-377641055793',
  startTime: dayjs('2026-05-07'),
  endTime: dayjs('2026-05-07'),
};

export const sampleWithPartialData: IBondingInstructor = {
  id: 'b8a690d3-7d35-450e-a7dd-48641105cf7c',
  startTime: dayjs('2026-05-07'),
  endTime: dayjs('2026-05-07'),
};

export const sampleWithFullData: IBondingInstructor = {
  id: 'd5448866-1dc5-4910-873c-64bbe0a3764c',
  startTime: dayjs('2026-05-07'),
  endTime: dayjs('2026-05-08'),
};

export const sampleWithNewData: NewBondingInstructor = {
  startTime: dayjs('2026-05-07'),
  endTime: dayjs('2026-05-07'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
