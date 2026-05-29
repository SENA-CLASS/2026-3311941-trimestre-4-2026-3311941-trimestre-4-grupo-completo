import { Estado } from 'app/shared/model/enumerations/estado.model';

export interface ITipoDocumento {
  id?: string;
  sigla?: string;
  nombreDocumento?: string;
  estado?: keyof typeof Estado;
}

export const defaultValue: Readonly<ITipoDocumento> = {};
