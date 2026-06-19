import { State } from 'app/shared/model/enumerations/state.model';

export interface IModality {
  id?: string;
  modalityName?: string;
  modalityColor?: string;
  modalityState?: keyof typeof State;
}

export const defaultValue: Readonly<IModality> = {};
