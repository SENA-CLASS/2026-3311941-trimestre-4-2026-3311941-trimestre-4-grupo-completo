import dayjs from 'dayjs/esm';

import { ICustomer } from 'app/entities/customer/customer.model';

export interface ILogError {
  id: string;
  levelError?: string | null;
  logName?: string | null;
  messageError?: string | null;
  dateError?: dayjs.Dayjs | null;
  customer?: Pick<ICustomer, 'id'> | null;
}

export type NewLogError = Omit<ILogError, 'id'> & { id: null };
