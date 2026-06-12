import { State } from 'app/shared/model/enumerations/state.model';

export interface IArea {
  id?: string;
  areaName?: string;
  urlLogo?: string | null;
  areaState?: keyof typeof State;
}

export const defaultValue: Readonly<IArea> = {};
