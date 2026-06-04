import { IProject, NewProject } from './project.model';

export const sampleWithRequiredData: IProject = {
  id: 'b4e8eb40-0b03-4aed-a566-952c1dc66c2d',
  projectCode: 'ouch forager',
  projectName: 'premise while since',
  projectState: 'ACTIVE',
};

export const sampleWithPartialData: IProject = {
  id: 'f78ca63f-3ef2-4861-83e5-21ad09f4f94d',
  projectCode: 'obesity sting',
  projectName: 'king austere',
  projectState: 'INACTIVE',
};

export const sampleWithFullData: IProject = {
  id: '0b1e2b78-e2b4-45ab-89c4-80867430b41c',
  projectCode: 'about',
  projectName: 'painfully supposing',
  projectState: 'INACTIVE',
};

export const sampleWithNewData: NewProject = {
  projectCode: 'zowie vice',
  projectName: 'ew to',
  projectState: 'INACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
