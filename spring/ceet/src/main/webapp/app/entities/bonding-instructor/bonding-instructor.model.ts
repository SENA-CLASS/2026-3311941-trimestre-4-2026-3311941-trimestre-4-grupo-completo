import dayjs from 'dayjs/esm';

import { IBonding } from 'app/entities/bonding/bonding.model';
import { IInstructor } from 'app/entities/instructor/instructor.model';
import { IYear } from 'app/entities/year/year.model';

export interface IBondingInstructor {
  id: string;
  startTime?: dayjs.Dayjs | null;
  endTime?: dayjs.Dayjs | null;
  year?: Pick<IYear, 'id' | 'yearNumber'> | null;
  instructor?: Pick<IInstructor, 'id'> | null;
  bonding?: Pick<IBonding, 'id' | 'bondingType'> | null;
}

export type NewBondingInstructor = Omit<IBondingInstructor, 'id'> & { id: null };
