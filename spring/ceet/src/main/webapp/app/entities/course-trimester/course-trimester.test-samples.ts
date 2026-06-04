import { ICourseTrimester, NewCourseTrimester } from './course-trimester.model';

export const sampleWithRequiredData: ICourseTrimester = {
  id: 'eb690d81-f7ca-4e76-89aa-3008e186a87f',
};

export const sampleWithPartialData: ICourseTrimester = {
  id: '8e687de3-9723-4a78-b643-9646b08ee711',
};

export const sampleWithFullData: ICourseTrimester = {
  id: 'dfaba03e-023a-47f7-98c4-bffbd3ef3871',
};

export const sampleWithNewData: NewCourseTrimester = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
