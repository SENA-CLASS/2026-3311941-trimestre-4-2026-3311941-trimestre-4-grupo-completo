import { State } from 'app/entities/enumerations/state.model';

export interface IClassroomType {
  id: string;
  typeClassroom?: string | null;
  classroomDescription?: string | null;
  classroomState?: keyof typeof State | null;
}

export type NewClassroomType = Omit<IClassroomType, 'id'> & { id: null };
