import dayjs from 'dayjs';

import { State } from 'app/shared/model/enumerations/state.model';

export interface IPlanning {
  id?: string;
  planningCode?: string;
  planningDate?: dayjs.Dayjs;
  planningState?: keyof typeof State;
}

export const defaultValue: Readonly<IPlanning> = {};
