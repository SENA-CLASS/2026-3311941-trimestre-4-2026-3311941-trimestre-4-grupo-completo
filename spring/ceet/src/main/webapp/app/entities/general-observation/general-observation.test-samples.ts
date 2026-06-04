import dayjs from 'dayjs/esm';

import { IGeneralObservation, NewGeneralObservation } from './general-observation.model';

export const sampleWithRequiredData: IGeneralObservation = {
  id: '8b3f5198-b531-4381-8262-7f4f41738d11',
  number: 9031,
  observationGeneral: 'amid duffel',
  jury: 'inasmuch ick',
  dateAudit: dayjs('2026-05-07T05:55'),
};

export const sampleWithPartialData: IGeneralObservation = {
  id: '8c9e7c21-572d-498c-8b86-2de094e6e136',
  number: 16479,
  observationGeneral: 'barring eternity within',
  jury: 'parody',
  dateAudit: dayjs('2026-05-07T19:45'),
};

export const sampleWithFullData: IGeneralObservation = {
  id: 'cae831cc-45e5-4275-b3c0-6fb395a5692e',
  number: 30896,
  observationGeneral: 'achieve yet',
  jury: 'furthermore than kindly',
  dateAudit: dayjs('2026-05-07T13:31'),
};

export const sampleWithNewData: NewGeneralObservation = {
  number: 9814,
  observationGeneral: 'midst',
  jury: 'aged mediocre',
  dateAudit: dayjs('2026-05-07T01:49'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
