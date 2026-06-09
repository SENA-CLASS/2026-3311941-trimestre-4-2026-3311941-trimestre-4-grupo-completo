import { IInstructorWorkingDay, NewInstructorWorkingDay } from './instructor-working-day.model';

export const sampleWithRequiredData: IInstructorWorkingDay = {
  id: '9840e613-6dd4-4d04-a5a7-cadfff8838e1',
  nameWorkingDay: 'pushy',
  descriptionWorkingDay: 'responsible',
  workingDayState: 'INACTIVE',
};

export const sampleWithPartialData: IInstructorWorkingDay = {
  id: '75e6c509-88fc-4889-ad17-20b977be1706',
  nameWorkingDay: 'whereas sometimes hmph',
  descriptionWorkingDay: 'joshingly',
  workingDayState: 'ACTIVE',
};

export const sampleWithFullData: IInstructorWorkingDay = {
  id: 'ebd86408-8f98-4a6e-bbd4-e526f77718ba',
  nameWorkingDay: 'attribute',
  descriptionWorkingDay: 't-shirt',
  workingDayState: 'INACTIVE',
};

export const sampleWithNewData: NewInstructorWorkingDay = {
  nameWorkingDay: 'ack numeracy',
  descriptionWorkingDay: 'atop up happy',
  workingDayState: 'INACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
