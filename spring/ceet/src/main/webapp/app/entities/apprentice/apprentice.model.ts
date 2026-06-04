import { ICourse } from 'app/entities/course/course.model';
import { ICustomer } from 'app/entities/customer/customer.model';
import { ITrainingStatus } from 'app/entities/training-status/training-status.model';

export interface IApprentice {
  id: string;
  customer?: Pick<ICustomer, 'id'> | null;
  trainingStatus?: Pick<ITrainingStatus, 'id' | 'statusName'> | null;
  course?: Pick<ICourse, 'id'> | null;
}

export type NewApprentice = Omit<IApprentice, 'id'> & { id: null };
