import { ICheckList, NewCheckList } from './check-list.model';

export const sampleWithRequiredData: ICheckList = {
  id: 'e9b4de93-e57f-4ab5-bfdf-49f1bf63f84a',
  listName: 'wherever indeed splosh',
  listState: 'INACTIVE',
};

export const sampleWithPartialData: ICheckList = {
  id: '7dfdbda2-1ace-464c-afd0-8929887dfafe',
  listName: 'ha',
  listState: 'INACTIVE',
};

export const sampleWithFullData: ICheckList = {
  id: '8c82727c-d4ab-44d7-87eb-855d2098d4ba',
  listName: 'um crest sweatshop',
  listState: 'INACTIVE',
};

export const sampleWithNewData: NewCheckList = {
  listName: 'resort',
  listState: 'INACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
