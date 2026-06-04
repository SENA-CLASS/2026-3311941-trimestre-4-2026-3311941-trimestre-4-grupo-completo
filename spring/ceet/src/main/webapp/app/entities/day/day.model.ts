import { State } from 'app/entities/enumerations/state.model';

export interface IDay {
  id: string;
  dayName?: string | null;
  dayState?: keyof typeof State | null;
}

export type NewDay = Omit<IDay, 'id'> & { id: null };
