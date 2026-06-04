import { State } from 'app/entities/enumerations/state.model';

export interface IModality {
  id: string;
  modalityName?: string | null;
  modalityColor?: string | null;
  modalityState?: keyof typeof State | null;
}

export type NewModality = Omit<IModality, 'id'> & { id: null };
