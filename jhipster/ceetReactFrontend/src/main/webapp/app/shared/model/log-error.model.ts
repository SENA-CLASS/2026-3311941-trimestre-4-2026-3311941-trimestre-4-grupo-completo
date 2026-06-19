import dayjs from 'dayjs';

import { ICustomer } from 'app/shared/model/customer.model';

export interface ILogError {
  id?: string;
  levelError?: string;
  logName?: string;
  messageError?: string;
  dateError?: dayjs.Dayjs;
  customer?: ICustomer;
}

export const defaultValue: Readonly<ILogError> = {};
