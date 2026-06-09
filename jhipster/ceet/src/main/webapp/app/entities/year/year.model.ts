import { State } from 'app/entities/enumerations/state.model';

export interface IYear {
  id: string;
  yearNumber?: number | null;
  yearState?: keyof typeof State | null;
}

export type NewYear = Omit<IYear, 'id'> & { id: null };
