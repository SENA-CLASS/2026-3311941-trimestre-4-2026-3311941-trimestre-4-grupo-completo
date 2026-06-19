import { State } from 'app/shared/model/enumerations/state.model';

export interface ICampus {
  id?: string;
  campusName?: string;
  campusAddress?: string;
  campusState?: keyof typeof State;
}

export const defaultValue: Readonly<ICampus> = {};
