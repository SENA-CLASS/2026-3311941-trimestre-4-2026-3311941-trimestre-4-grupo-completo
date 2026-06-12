import { ICurrentQuarter } from 'app/shared/model/current-quarter.model';
import { State } from 'app/shared/model/enumerations/state.model';

export interface IScheduleVersion {
  id?: string;
  versionNumber?: string;
  versionState?: keyof typeof State;
  currentQuarter?: ICurrentQuarter;
}

export const defaultValue: Readonly<IScheduleVersion> = {};
