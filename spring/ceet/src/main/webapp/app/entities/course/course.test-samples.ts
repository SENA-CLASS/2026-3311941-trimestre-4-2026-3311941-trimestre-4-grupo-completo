import dayjs from 'dayjs/esm';

import { ICourse, NewCourse } from './course.model';

export const sampleWithRequiredData: ICourse = {
  id: '4338577b-a082-4679-afc0-fa1424fca2ce',
  courseNumber: 'well-off pulverize',
  startDate: dayjs('2026-05-07'),
  endDate: dayjs('2026-05-07'),
  route: 'past gentle regarding',
};

export const sampleWithPartialData: ICourse = {
  id: '0199c01e-e4ef-436d-8588-431db5ec1e91',
  courseNumber: 'yuck miskey',
  startDate: dayjs('2026-05-07'),
  endDate: dayjs('2026-05-07'),
  route: 'litter alienated',
};

export const sampleWithFullData: ICourse = {
  id: 'f24c82f4-f51a-41d1-8dc9-2dbe9b6376f2',
  courseNumber: 'amidst scramble',
  startDate: dayjs('2026-05-07'),
  endDate: dayjs('2026-05-07'),
  route: 'down apostrophize swordfish',
};

export const sampleWithNewData: NewCourse = {
  courseNumber: 'unto',
  startDate: dayjs('2026-05-07'),
  endDate: dayjs('2026-05-07'),
  route: 'pry via tinted',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
