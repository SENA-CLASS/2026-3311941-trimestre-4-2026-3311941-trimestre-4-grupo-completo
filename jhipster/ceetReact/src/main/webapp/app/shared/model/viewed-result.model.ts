import { ICourseTrimester } from 'app/shared/model/course-trimester.model';
import { ILearningResult } from 'app/shared/model/learning-result.model';
import { IPlanning } from 'app/shared/model/planning.model';

export interface IViewedResult {
  id?: string;
  courseTrimester?: ICourseTrimester;
  planning?: IPlanning;
  learningResult?: ILearningResult;
}

export const defaultValue: Readonly<IViewedResult> = {};
