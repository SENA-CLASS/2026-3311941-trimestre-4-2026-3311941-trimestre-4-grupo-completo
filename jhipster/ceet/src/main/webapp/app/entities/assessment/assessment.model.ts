import { State } from 'app/entities/enumerations/state.model';

export interface IAssessment {
  id: string;
  assessmentType?: string | null;
  assessmentState?: keyof typeof State | null;
}

export type NewAssessment = Omit<IAssessment, 'id'> & { id: null };
