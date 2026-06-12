import { State } from 'app/shared/model/enumerations/state.model';

export interface IDocumentType {
  id?: string;
  initials?: string;
  documentName?: string;
  stateDocumentType?: keyof typeof State;
}

export const defaultValue: Readonly<IDocumentType> = {};
