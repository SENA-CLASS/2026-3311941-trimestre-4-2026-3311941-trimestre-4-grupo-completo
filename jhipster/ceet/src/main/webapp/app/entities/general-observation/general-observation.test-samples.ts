import dayjs from 'dayjs/esm';

import { IGeneralObservation, NewGeneralObservation } from './general-observation.model';

export const sampleWithRequiredData: IGeneralObservation = {
  id: '8b3f5198-b531-4381-8262-7f4f41738d11',
  number: 9031,
  observationGeneral: 'amid duffel',
  jury: 'inasmuch ick',
  dateAudit: dayjs('2026-06-09T04:55'),
};

export const sampleWithPartialData: IGeneralObservation = {
  id: '8c9e7c21-572d-498c-8b86-2de094e6e136',
  number: 16479,
  observationGeneral: 'barring eternity within',
  jury: 'parody',
  dateAudit: dayjs('2026-06-09T18:45'),
};

export const sampleWithFullData: IGeneralObservation = {
  id: 'cae831cc-45e5-4275-b3c0-6fb395a5692e',
  number: 30896,
  observationGeneral: 'achieve yet',
  jury: 'furthermore than kindly',
  dateAudit: dayjs('2026-06-09T12:32'),
};

export const sampleWithNewData: NewGeneralObservation = {
  number: 9814,
  observationGeneral: 'midst',
  jury: 'aged mediocre',
  dateAudit: dayjs('2026-06-09T00:49'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
