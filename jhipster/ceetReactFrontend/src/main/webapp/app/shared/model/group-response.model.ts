import dayjs from 'dayjs';

import { IAssessment } from 'app/shared/model/assessment.model';
import { IItemList } from 'app/shared/model/item-list.model';
import { IProjectGroup } from 'app/shared/model/project-group.model';

export interface IGroupResponse {
  id?: string;
  evaluationDate?: dayjs.Dayjs;
  projectGroup?: IProjectGroup;
  assessment?: IAssessment;
  itemList?: IItemList;
}

export const defaultValue: Readonly<IGroupResponse> = {};
