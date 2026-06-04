import { IClassroom } from 'app/entities/classroom/classroom.model';
import { ILearningResult } from 'app/entities/learning-result/learning-result.model';

export interface IClassroomLimitation {
  id: string;
  classroom?: Pick<IClassroom, 'id'> | null;
  learningResult?: Pick<ILearningResult, 'id'> | null;
}

export type NewClassroomLimitation = Omit<IClassroomLimitation, 'id'> & { id: null };
