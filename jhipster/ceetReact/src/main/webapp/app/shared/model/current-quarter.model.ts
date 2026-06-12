import dayjs from 'dayjs';

import { State } from 'app/shared/model/enumerations/state.model';
import { IYear } from 'app/shared/model/year.model';

export interface ICurrentQuarter {
  id?: string;
  scheduledQuarter?: number;
  startQuarter?: dayjs.Dayjs;
  endQuarter?: dayjs.Dayjs;
  currentQuarterState?: keyof typeof State;
  year?: IYear;
}

export const defaultValue: Readonly<ICurrentQuarter> = {};
