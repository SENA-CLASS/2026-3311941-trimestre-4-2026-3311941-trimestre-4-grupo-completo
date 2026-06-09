import { IApprentice, NewApprentice } from './apprentice.model';

export const sampleWithRequiredData: IApprentice = {
  id: 'e2144bfb-2e63-4bbc-b405-e86388380513',
};

export const sampleWithPartialData: IApprentice = {
  id: '1560b2c1-9d0d-4f38-b830-09765344b1c7',
};

export const sampleWithFullData: IApprentice = {
  id: '6106b77a-2eb3-4c59-8b94-009d3e317c3b',
};

export const sampleWithNewData: NewApprentice = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
