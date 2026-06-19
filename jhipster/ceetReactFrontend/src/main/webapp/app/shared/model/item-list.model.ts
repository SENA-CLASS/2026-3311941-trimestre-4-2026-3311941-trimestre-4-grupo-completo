import { ICheckList } from 'app/shared/model/check-list.model';
import { ILearningResult } from 'app/shared/model/learning-result.model';

export interface IItemList {
  id?: string;
  itemNumber?: number;
  question?: string;
  checkList?: ICheckList;
  learningResult?: ILearningResult;
}

export const defaultValue: Readonly<IItemList> = {};
