import { StateProgram } from 'app/entities/enumerations/state-program.model';
import { ILevelEducation } from 'app/entities/level-education/level-education.model';

export interface ITrainingProgram {
  id: string;
  programCode?: string | null;
  programVersion?: string | null;
  programName?: string | null;
  programInitials?: string | null;
  programState?: keyof typeof StateProgram | null;
  levelEducation?: Pick<ILevelEducation, 'id' | 'levelName'> | null;
}

export type NewTrainingProgram = Omit<ITrainingProgram, 'id'> & { id: null };
