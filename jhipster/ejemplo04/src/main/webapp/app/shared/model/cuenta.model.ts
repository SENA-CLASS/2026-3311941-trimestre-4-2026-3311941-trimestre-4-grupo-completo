import { ITipoDocumento } from 'app/shared/model/tipo-documento.model';
import { IUser } from 'app/shared/model/user.model';

export interface ICuenta {
  id?: string;
  numeroDocumento?: string;
  primerNombre?: string;
  segundoNombre?: string | null;
  primerApellido?: string;
  segundoApellido?: string | null;
  user?: IUser;
  tipoDocumento?: ITipoDocumento;
}

export const defaultValue: Readonly<ICuenta> = {};
