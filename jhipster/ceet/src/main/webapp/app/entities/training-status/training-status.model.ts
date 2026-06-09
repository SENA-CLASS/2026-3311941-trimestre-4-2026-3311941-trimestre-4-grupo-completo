import { State } from 'app/entities/enumerations/state.model';

export interface ITrainingStatus {
  id: string;
  statusName?: string | null;
  stateTraining?: keyof typeof State | null;
}

export type NewTrainingStatus = Omit<ITrainingStatus, 'id'> & { id: null };
