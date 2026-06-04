import { IDocumentType } from 'app/entities/document-type/document-type.model';
import { IUser } from 'app/entities/user/user.model';

export interface ICustomer {
  id: string;
  documentNumber?: string | null;
  firstName?: string | null;
  secondName?: string | null;
  fisrtLastName?: string | null;
  secondLastName?: string | null;
  user?: Pick<IUser, 'id' | 'login'> | null;
  documentType?: Pick<IDocumentType, 'id' | 'documentName'> | null;
}

export type NewCustomer = Omit<ICustomer, 'id'> & { id: null };
