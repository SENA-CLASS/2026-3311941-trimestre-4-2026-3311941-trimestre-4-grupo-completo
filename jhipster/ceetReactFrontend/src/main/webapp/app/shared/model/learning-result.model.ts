import { ILearningCompetence } from 'app/shared/model/learning-competence.model';

export interface ILearningResult {
  id?: string;
  resultCode?: string;
  denomination?: string;
  learningCompetence?: ILearningCompetence;
}

export const defaultValue: Readonly<ILearningResult> = {};
