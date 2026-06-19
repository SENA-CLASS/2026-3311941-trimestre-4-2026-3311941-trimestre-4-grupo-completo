import { ICourse } from 'app/shared/model/course.model';
import { ICustomer } from 'app/shared/model/customer.model';
import { ITrainingStatus } from 'app/shared/model/training-status.model';

export interface IApprentice {
  id?: string;
  customer?: ICustomer;
  trainingStatus?: ITrainingStatus;
  course?: ICourse;
}

export const defaultValue: Readonly<IApprentice> = {};
