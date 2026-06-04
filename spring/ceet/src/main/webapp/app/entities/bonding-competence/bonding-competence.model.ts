import { IBondingInstructor } from 'app/entities/bonding-instructor/bonding-instructor.model';
import { ILearningCompetence } from 'app/entities/learning-competence/learning-competence.model';

export interface IBondingCompetence {
  id: string;
  bondingInstructor?: Pick<IBondingInstructor, 'id'> | null;
  learningCompetence?: Pick<ILearningCompetence, 'id'> | null;
}

export type NewBondingCompetence = Omit<IBondingCompetence, 'id'> & { id: null };
