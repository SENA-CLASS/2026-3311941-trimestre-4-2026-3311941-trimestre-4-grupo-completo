import { ICurrentQuarter } from 'app/entities/current-quarter/current-quarter.model';
import { State } from 'app/entities/enumerations/state.model';

export interface IScheduleVersion {
  id: string;
  versionNumber?: string | null;
  versionState?: keyof typeof State | null;
  currentQuarter?: Pick<ICurrentQuarter, 'id'> | null;
}

export type NewScheduleVersion = Omit<IScheduleVersion, 'id'> & { id: null };
