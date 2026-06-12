import { IDocumentType } from 'app/shared/model/document-type.model';
import { IUser } from 'app/shared/model/user.model';

export interface ICustomer {
  id?: string;
  documentNumber?: string;
  firstName?: string;
  secondName?: string | null;
  fisrtLastName?: string;
  secondLastName?: string | null;
  user?: IUser;
  documentType?: IDocumentType;
}

export const defaultValue: Readonly<ICustomer> = {};
