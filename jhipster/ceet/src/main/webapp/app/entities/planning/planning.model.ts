import dayjs from 'dayjs/esm';

import { State } from 'app/entities/enumerations/state.model';

export interface IPlanning {
  id: string;
  planningCode?: string | null;
  planningDate?: dayjs.Dayjs | null;
  planningState?: keyof typeof State | null;
}

export type NewPlanning = Omit<IPlanning, 'id'> & { id: null };
