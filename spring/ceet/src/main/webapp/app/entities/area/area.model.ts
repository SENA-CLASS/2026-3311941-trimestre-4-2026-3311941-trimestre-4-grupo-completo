import { State } from 'app/entities/enumerations/state.model';

export interface IArea {
  id: string;
  areaName?: string | null;
  urlLogo?: string | null;
  areaState?: keyof typeof State | null;
}

export type NewArea = Omit<IArea, 'id'> & { id: null };
