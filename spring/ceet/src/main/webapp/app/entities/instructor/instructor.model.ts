import { ICustomer } from 'app/entities/customer/customer.model';
import { State } from 'app/entities/enumerations/state.model';

export interface IInstructor {
  id: string;
  instructorState?: keyof typeof State | null;
  customer?: Pick<ICustomer, 'id'> | null;
}

export type NewInstructor = Omit<IInstructor, 'id'> & { id: null };
