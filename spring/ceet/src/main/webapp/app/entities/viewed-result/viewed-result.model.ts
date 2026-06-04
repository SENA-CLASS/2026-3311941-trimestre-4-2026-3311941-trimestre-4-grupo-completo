import { ICourseTrimester } from 'app/entities/course-trimester/course-trimester.model';
import { ILearningResult } from 'app/entities/learning-result/learning-result.model';
import { IPlanning } from 'app/entities/planning/planning.model';

export interface IViewedResult {
  id: string;
  courseTrimester?: Pick<ICourseTrimester, 'id'> | null;
  planning?: Pick<IPlanning, 'id' | 'planningCode'> | null;
  learningResult?: Pick<ILearningResult, 'id'> | null;
}

export type NewViewedResult = Omit<IViewedResult, 'id'> & { id: null };
