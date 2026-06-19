import { IClassroom } from 'app/shared/model/classroom.model';
import { ILearningResult } from 'app/shared/model/learning-result.model';

export interface IClassroomLimitation {
  id?: string;
  classroom?: IClassroom;
  learningResult?: ILearningResult;
}

export const defaultValue: Readonly<IClassroomLimitation> = {};
