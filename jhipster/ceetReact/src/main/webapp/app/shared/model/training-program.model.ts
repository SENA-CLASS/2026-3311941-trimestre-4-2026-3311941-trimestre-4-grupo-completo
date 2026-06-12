import { StateProgram } from 'app/shared/model/enumerations/state-program.model';
import { ILevelEducation } from 'app/shared/model/level-education.model';

export interface ITrainingProgram {
  id?: string;
  programCode?: string;
  programVersion?: string;
  programName?: string;
  programInitials?: string;
  programState?: keyof typeof StateProgram;
  levelEducation?: ILevelEducation;
}

export const defaultValue: Readonly<ITrainingProgram> = {};
