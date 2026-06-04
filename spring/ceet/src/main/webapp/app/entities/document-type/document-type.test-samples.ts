import { IDocumentType, NewDocumentType } from './document-type.model';

export const sampleWithRequiredData: IDocumentType = {
  id: '15d52f11-9e50-4254-b551-1a728665aba4',
  initials: 'punctually',
  documentName: 'though uh-huh',
  stateDocumentType: 'INACTIVE',
};

export const sampleWithPartialData: IDocumentType = {
  id: '2474d537-b0e1-4348-be03-7831fe856837',
  initials: 'up roundab',
  documentName: 'within sheepishly',
  stateDocumentType: 'ACTIVE',
};

export const sampleWithFullData: IDocumentType = {
  id: '00bbd977-adab-4a2a-8031-4d77efdb1931',
  initials: 'rigidly wi',
  documentName: 'spirit qua',
  stateDocumentType: 'ACTIVE',
};

export const sampleWithNewData: NewDocumentType = {
  initials: 'grimy ugh',
  documentName: 'out',
  stateDocumentType: 'ACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
