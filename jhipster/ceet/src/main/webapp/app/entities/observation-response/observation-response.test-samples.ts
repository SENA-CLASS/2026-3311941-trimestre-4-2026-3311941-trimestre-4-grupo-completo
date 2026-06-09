import dayjs from 'dayjs/esm';

import { IObservationResponse, NewObservationResponse } from './observation-response.model';

export const sampleWithRequiredData: IObservationResponse = {
  id: 'a6490e8d-a8dd-4a16-9d30-e974deb54913',
  numberObservation: 359,
  obsevation: 'till',
  juries: 'within humor geez',
  dateObservation: dayjs('2026-06-09T05:37'),
};

export const sampleWithPartialData: IObservationResponse = {
  id: 'c9d71356-6a14-468b-9a81-cabe82c4dee9',
  numberObservation: 15263,
  obsevation: 'rural cannibalise upon',
  juries: 'needy greedy joint',
  dateObservation: dayjs('2026-06-09T02:09'),
};

export const sampleWithFullData: IObservationResponse = {
  id: '99eaf8b6-7f5d-4625-b83d-1dfbace5e8da',
  numberObservation: 13493,
  obsevation: 'onto portly now',
  juries: 'short-term mmm',
  dateObservation: dayjs('2026-06-09T08:18'),
};

export const sampleWithNewData: NewObservationResponse = {
  numberObservation: 1431,
  obsevation: 'indeed',
  juries: 'down not shoot',
  dateObservation: dayjs('2026-06-09T06:23'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
