import { State } from 'app/shared/model/enumerations/state.model';

export interface ITrainingStatus {
  id?: string;
  statusName?: string;
  stateTraining?: keyof typeof State;
}

export const defaultValue: Readonly<ITrainingStatus> = {};
