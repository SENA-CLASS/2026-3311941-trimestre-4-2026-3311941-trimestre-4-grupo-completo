import { IProjectGroup, NewProjectGroup } from './project-group.model';

export const sampleWithRequiredData: IProjectGroup = {
  id: '59019601-11be-4a33-b845-83362ad5447b',
  groupNumber: 19793,
  projectName: 'if',
  projectGroupState: 'ACTIVE',
};

export const sampleWithPartialData: IProjectGroup = {
  id: '00390fdb-1234-4c44-8549-c065b22f7d69',
  groupNumber: 10873,
  projectName: 'total',
  projectGroupState: 'INACTIVE',
};

export const sampleWithFullData: IProjectGroup = {
  id: '68e928e0-8f59-4720-b752-2c76b87b29c0',
  groupNumber: 16341,
  projectName: 'excluding angrily',
  projectGroupState: 'ACTIVE',
};

export const sampleWithNewData: NewProjectGroup = {
  groupNumber: 7853,
  projectName: 'pfft fuel',
  projectGroupState: 'ACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
