import { State } from 'app/shared/model/enumerations/state.model';

export interface IAssessment {
  id?: string;
  assessmentType?: string;
  assessmentState?: keyof typeof State;
}

export const defaultValue: Readonly<IAssessment> = {};
