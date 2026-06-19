import { ILearningResult } from 'app/shared/model/learning-result.model';
import { IPlanning } from 'app/shared/model/planning.model';
import { ITrimester } from 'app/shared/model/trimester.model';

export interface IQuarterSchedule {
  id?: string;
  learningResult?: ILearningResult;
  planning?: IPlanning;
  trimester?: ITrimester;
}

export const defaultValue: Readonly<IQuarterSchedule> = {};
