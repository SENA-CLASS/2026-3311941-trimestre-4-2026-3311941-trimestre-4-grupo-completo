import { ITrainingProgram } from 'app/shared/model/training-program.model';

export interface ILearningCompetence {
  id?: string;
  competenceCode?: string;
  competitionDenomination?: string;
  trainingProgram?: ITrainingProgram;
}

export const defaultValue: Readonly<ILearningCompetence> = {};
