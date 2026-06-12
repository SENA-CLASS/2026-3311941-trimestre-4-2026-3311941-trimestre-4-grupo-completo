import { IBondingInstructor } from 'app/shared/model/bonding-instructor.model';
import { ILearningCompetence } from 'app/shared/model/learning-competence.model';

export interface IBondingCompetence {
  id?: string;
  bondingInstructor?: IBondingInstructor;
  learningCompetence?: ILearningCompetence;
}

export const defaultValue: Readonly<IBondingCompetence> = {};
