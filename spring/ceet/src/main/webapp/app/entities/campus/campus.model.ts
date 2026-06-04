import { State } from 'app/entities/enumerations/state.model';

export interface ICampus {
  id: string;
  campusName?: string | null;
  campusAddress?: string | null;
  campusState?: keyof typeof State | null;
}

export type NewCampus = Omit<ICampus, 'id'> & { id: null };
