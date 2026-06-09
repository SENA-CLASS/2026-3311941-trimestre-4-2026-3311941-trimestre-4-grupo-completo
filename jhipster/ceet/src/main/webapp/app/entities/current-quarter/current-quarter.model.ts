import dayjs from 'dayjs/esm';

import { State } from 'app/entities/enumerations/state.model';
import { IYear } from 'app/entities/year/year.model';

export interface ICurrentQuarter {
  id: string;
  scheduledQuarter?: number | null;
  startQuarter?: dayjs.Dayjs | null;
  endQuarter?: dayjs.Dayjs | null;
  currentQuarterState?: keyof typeof State | null;
  year?: Pick<IYear, 'id' | 'yearNumber'> | null;
}

export type NewCurrentQuarter = Omit<ICurrentQuarter, 'id'> & { id: null };
