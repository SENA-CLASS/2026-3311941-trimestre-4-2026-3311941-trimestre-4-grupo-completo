import { IClassroomType, NewClassroomType } from './classroom-type.model';

export const sampleWithRequiredData: IClassroomType = {
  id: '50904a2a-b29b-4b9b-b27a-692511c1372b',
  typeClassroom: 'jazz',
  classroomDescription: 'roughly',
  classroomState: 'ACTIVE',
};

export const sampleWithPartialData: IClassroomType = {
  id: '1b76ac68-af50-4405-a34a-c5346583e569',
  typeClassroom: 'candid mythology meh',
  classroomDescription: 'far whoa',
  classroomState: 'INACTIVE',
};

export const sampleWithFullData: IClassroomType = {
  id: '34e5ca3d-d345-41c2-a30d-71e87ca5200e',
  typeClassroom: 'mild deliquesce perfectly',
  classroomDescription: 'provided',
  classroomState: 'INACTIVE',
};

export const sampleWithNewData: NewClassroomType = {
  typeClassroom: 'busily foolishly ew',
  classroomDescription: 'rarely',
  classroomState: 'ACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
