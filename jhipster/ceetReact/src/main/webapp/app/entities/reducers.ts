import apprentice from 'app/entities/apprentice/apprentice.reducer';
import levelEducation from 'app/entities/level-education/level-education.reducer';
import trainingProgram from 'app/entities/training-program/training-program.reducer';
import trimester from 'app/entities/trimester/trimester.reducer';
import courseTrimester from 'app/entities/course-trimester/course-trimester.reducer';
import viewedResult from 'app/entities/viewed-result/viewed-result.reducer';
import coursePlanning from 'app/entities/course-planning/course-planning.reducer';
import learningCompetence from 'app/entities/learning-competence/learning-competence.reducer';
import learningResult from 'app/entities/learning-result/learning-result.reducer';
import planningActivity from 'app/entities/planning-activity/planning-activity.reducer';
import project from 'app/entities/project/project.reducer';
import projectPhase from 'app/entities/project-phase/project-phase.reducer';
import projectActivity from 'app/entities/project-activity/project-activity.reducer';
import classroomType from 'app/entities/classroom-type/classroom-type.reducer';
import campus from 'app/entities/campus/campus.reducer';
import classroom from 'app/entities/classroom/classroom.reducer';
import classroomLimitation from 'app/entities/classroom-limitation/classroom-limitation.reducer';
import day from 'app/entities/day/day.reducer';
import modality from 'app/entities/modality/modality.reducer';
import currentQuarter from 'app/entities/current-quarter/current-quarter.reducer';
import scheduleVersion from 'app/entities/schedule-version/schedule-version.reducer';
import schedule from 'app/entities/schedule/schedule.reducer';
import projectGroup from 'app/entities/project-group/project-group.reducer';
import assessment from 'app/entities/assessment/assessment.reducer';
import checkList from 'app/entities/check-list/check-list.reducer';
import generalObservation from 'app/entities/general-observation/general-observation.reducer';
import memberGroup from 'app/entities/member-group/member-group.reducer';
import checkListCourse from 'app/entities/check-list-course/check-list-course.reducer';
import itemList from 'app/entities/item-list/item-list.reducer';
import groupResponse from 'app/entities/group-response/group-response.reducer';
import observationResponse from 'app/entities/observation-response/observation-response.reducer';
import year from 'app/entities/year/year.reducer';
import area from 'app/entities/area/area.reducer';
import bonding from 'app/entities/bonding/bonding.reducer';
import instructor from 'app/entities/instructor/instructor.reducer';
import instructorWorkingDay from 'app/entities/instructor-working-day/instructor-working-day.reducer';
import areaInstructor from 'app/entities/area-instructor/area-instructor.reducer';
import bondingInstructor from 'app/entities/bonding-instructor/bonding-instructor.reducer';
import boundingSchedule from 'app/entities/bounding-schedule/bounding-schedule.reducer';
import bondingCompetence from 'app/entities/bonding-competence/bonding-competence.reducer';
import course from 'app/entities/course/course.reducer';
import courseStatus from 'app/entities/course-status/course-status.reducer';
import customer from 'app/entities/customer/customer.reducer';
import documentType from 'app/entities/document-type/document-type.reducer';
import logAudit from 'app/entities/log-audit/log-audit.reducer';
import logError from 'app/entities/log-error/log-error.reducer';
import planning from 'app/entities/planning/planning.reducer';
import quarterSchedule from 'app/entities/quarter-schedule/quarter-schedule.reducer';
import trainingStatus from 'app/entities/training-status/training-status.reducer';
import workingDay from 'app/entities/working-day/working-day.reducer';
import workingDayCourse from 'app/entities/working-day-course/working-day-course.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  documentType,
  customer,
  trainingStatus,
  courseStatus,
  workingDayCourse,
  course,
  apprentice,
  logError,
  logAudit,
  planning,
  quarterSchedule,
  levelEducation,
  trainingProgram,
  trimester,
  courseTrimester,
  viewedResult,
  coursePlanning,
  learningCompetence,
  learningResult,
  planningActivity,
  project,
  projectPhase,
  projectActivity,
  classroomType,
  campus,
  classroom,
  classroomLimitation,
  day,
  modality,
  currentQuarter,
  scheduleVersion,
  schedule,
  projectGroup,
  assessment,
  checkList,
  generalObservation,
  memberGroup,
  checkListCourse,
  itemList,
  groupResponse,
  observationResponse,
  year,
  area,
  bonding,
  instructor,
  instructorWorkingDay,
  areaInstructor,
  bondingInstructor,
  boundingSchedule,
  bondingCompetence,
  workingDay,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
