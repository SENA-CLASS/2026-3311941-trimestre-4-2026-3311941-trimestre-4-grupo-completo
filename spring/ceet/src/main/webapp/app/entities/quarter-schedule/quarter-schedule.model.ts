import { ILearningResult } from 'app/entities/learning-result/learning-result.model';
import { IPlanning } from 'app/entities/planning/planning.model';
import { ITrimester } from 'app/entities/trimester/trimester.model';

export interface IQuarterSchedule {
  id: string;
  learningResult?: Pick<ILearningResult, 'id'> | null;
  planning?: Pick<IPlanning, 'id' | 'planningCode'> | null;
  trimester?: Pick<ITrimester, 'id'> | null;
}

export type NewQuarterSchedule = Omit<IQuarterSchedule, 'id'> & { id: null };
