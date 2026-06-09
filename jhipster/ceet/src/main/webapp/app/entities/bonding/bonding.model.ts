import { State } from 'app/entities/enumerations/state.model';

export interface IBonding {
  id: string;
  bondingType?: string | null;
  workingHours?: number | null;
  bondingState?: keyof typeof State | null;
}

export type NewBonding = Omit<IBonding, 'id'> & { id: null };
