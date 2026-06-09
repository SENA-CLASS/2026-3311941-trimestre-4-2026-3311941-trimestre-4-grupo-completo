import { IItemList, NewItemList } from './item-list.model';

export const sampleWithRequiredData: IItemList = {
  id: '0df3b4b1-85d6-46f9-836c-099dcd3d864d',
  itemNumber: 1974,
  question: 'anenst',
};

export const sampleWithPartialData: IItemList = {
  id: '896b888b-1392-4de1-8e32-51efeac1266d',
  itemNumber: 22887,
  question: 'trick biodegradable excitedly',
};

export const sampleWithFullData: IItemList = {
  id: '317920ad-2dd6-40ab-878e-0ed7e4afa54b',
  itemNumber: 6432,
  question: 'duh',
};

export const sampleWithNewData: NewItemList = {
  itemNumber: 24459,
  question: 'materialise unimpressively what',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
