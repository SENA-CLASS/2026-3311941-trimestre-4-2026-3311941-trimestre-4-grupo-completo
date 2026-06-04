import dayjs from 'dayjs/esm';

import { ICustomer } from 'app/entities/customer/customer.model';

export interface ILogAudit {
  id: string;
  levelAudit?: string | null;
  logName?: string | null;
  messageAudit?: string | null;
  dateAudit?: dayjs.Dayjs | null;
  customer?: Pick<ICustomer, 'id'> | null;
}

export type NewLogAudit = Omit<ILogAudit, 'id'> & { id: null };
