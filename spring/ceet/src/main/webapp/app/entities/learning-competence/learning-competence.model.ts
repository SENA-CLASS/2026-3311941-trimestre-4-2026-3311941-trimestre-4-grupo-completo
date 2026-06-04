import { ITrainingProgram } from 'app/entities/training-program/training-program.model';

export interface ILearningCompetence {
  id: string;
  competenceCode?: string | null;
  competitionDenomination?: string | null;
  trainingProgram?: Pick<ITrainingProgram, 'id'> | null;
}

export type NewLearningCompetence = Omit<ILearningCompetence, 'id'> & { id: null };
