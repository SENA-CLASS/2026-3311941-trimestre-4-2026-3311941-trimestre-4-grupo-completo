import { ITrimester, NewTrimester } from './trimester.model';

export const sampleWithRequiredData: ITrimester = {
  id: '0b68927e-2c63-48d1-a1ba-cdc4a04c9387',
  trimesterName: 9105,
};

export const sampleWithPartialData: ITrimester = {
  id: 'c6d0c1f2-0d37-4160-86db-109363e03192',
  trimesterName: 1442,
  trimesterState: 'bah',
};

export const sampleWithFullData: ITrimester = {
  id: '038ce32a-a841-4e0b-bc2a-926a3d618373',
  trimesterName: 14846,
  trimesterState: 'which into',
};

export const sampleWithNewData: NewTrimester = {
  trimesterName: 23764,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
