import { IDay, NewDay } from './day.model';

export const sampleWithRequiredData: IDay = {
  id: '227ce3ee-7899-4540-a4fa-5cb01abfaedc',
  dayName: 'though',
  dayState: 'ACTIVE',
};

export const sampleWithPartialData: IDay = {
  id: '972773de-1122-4fb5-be18-ebaeedeeb44d',
  dayName: 'paltry',
  dayState: 'INACTIVE',
};

export const sampleWithFullData: IDay = {
  id: '78e031ba-49c8-4870-b577-8df89e407e8a',
  dayName: 'now svelte',
  dayState: 'INACTIVE',
};

export const sampleWithNewData: NewDay = {
  dayName: 'ew beneath wonderfully',
  dayState: 'ACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
