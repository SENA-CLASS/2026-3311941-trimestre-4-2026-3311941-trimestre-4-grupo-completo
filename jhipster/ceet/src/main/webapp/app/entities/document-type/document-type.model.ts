import { State } from 'app/entities/enumerations/state.model';

export interface IDocumentType {
  id: string;
  initials?: string | null;
  documentName?: string | null;
  stateDocumentType?: keyof typeof State | null;
}

export type NewDocumentType = Omit<IDocumentType, 'id'> & { id: null };
