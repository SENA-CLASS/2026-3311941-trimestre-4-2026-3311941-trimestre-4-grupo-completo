import { ICheckList } from 'app/shared/model/check-list.model';
import { ICourse } from 'app/shared/model/course.model';
import { State } from 'app/shared/model/enumerations/state.model';

export interface ICheckListCourse {
  id?: string;
  checkListState?: keyof typeof State;
  course?: ICourse;
  checkList?: ICheckList;
}

export const defaultValue: Readonly<ICheckListCourse> = {};
