import dayjs from 'dayjs';

import { IBonding } from 'app/shared/model/bonding.model';
import { IInstructor } from 'app/shared/model/instructor.model';
import { IYear } from 'app/shared/model/year.model';

export interface IBondingInstructor {
  id?: string;
  startTime?: dayjs.Dayjs;
  endTime?: dayjs.Dayjs;
  year?: IYear;
  instructor?: IInstructor;
  bonding?: IBonding;
}

export const defaultValue: Readonly<IBondingInstructor> = {};
