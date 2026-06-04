import { ILearningCompetence } from 'app/entities/learning-competence/learning-competence.model';

export interface ILearningResult {
  id: string;
  resultCode?: string | null;
  denomination?: string | null;
  learningCompetence?: Pick<ILearningCompetence, 'id'> | null;
}

export type NewLearningResult = Omit<ILearningResult, 'id'> & { id: null };
