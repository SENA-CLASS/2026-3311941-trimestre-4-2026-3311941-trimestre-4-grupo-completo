import { State } from 'app/shared/model/enumerations/state.model';

export interface IClassroomType {
  id?: string;
  typeClassroom?: string;
  classroomDescription?: string;
  classroomState?: keyof typeof State;
}

export const defaultValue: Readonly<IClassroomType> = {};
