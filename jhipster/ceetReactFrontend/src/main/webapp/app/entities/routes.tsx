import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Apprentice from './apprentice';
import LevelEducation from './level-education';
import TrainingProgram from './training-program';
import Trimester from './trimester';
import CourseTrimester from './course-trimester';
import ViewedResult from './viewed-result';
import CoursePlanning from './course-planning';
import LearningCompetence from './learning-competence';
import LearningResult from './learning-result';
import PlanningActivity from './planning-activity';
import Project from './project';
import ProjectPhase from './project-phase';
import ProjectActivity from './project-activity';
import ClassroomType from './classroom-type';
import Campus from './campus';
import Classroom from './classroom';
import ClassroomLimitation from './classroom-limitation';
import Day from './day';
import Modality from './modality';
import CurrentQuarter from './current-quarter';
import ScheduleVersion from './schedule-version';
import Schedule from './schedule';
import ProjectGroup from './project-group';
import Assessment from './assessment';
import CheckList from './check-list';
import GeneralObservation from './general-observation';
import MemberGroup from './member-group';
import CheckListCourse from './check-list-course';
import ItemList from './item-list';
import GroupResponse from './group-response';
import ObservationResponse from './observation-response';
import Year from './year';
import Area from './area';
import Bonding from './bonding';
import Instructor from './instructor';
import InstructorWorkingDay from './instructor-working-day';
import AreaInstructor from './area-instructor';
import BondingInstructor from './bonding-instructor';
import BoundingSchedule from './bounding-schedule';
import BondingCompetence from './bonding-competence';
import Course from './course';
import CourseStatus from './course-status';
import Customer from './customer';
import DocumentType from './document-type';
import LogAudit from './log-audit';
import LogError from './log-error';
import Planning from './planning';
import QuarterSchedule from './quarter-schedule';
import TrainingStatus from './training-status';
import WorkingDay from './working-day';
import WorkingDayCourse from './working-day-course';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="/document-type/*" element={<DocumentType />} />
        <Route path="/customer/*" element={<Customer />} />
        <Route path="/training-status/*" element={<TrainingStatus />} />
        <Route path="/course-status/*" element={<CourseStatus />} />
        <Route path="/working-day-course/*" element={<WorkingDayCourse />} />
        <Route path="/course/*" element={<Course />} />
        <Route path="/apprentice/*" element={<Apprentice />} />
        <Route path="/log-error/*" element={<LogError />} />
        <Route path="/log-audit/*" element={<LogAudit />} />
        <Route path="/planning/*" element={<Planning />} />
        <Route path="/quarter-schedule/*" element={<QuarterSchedule />} />
        <Route path="/level-education/*" element={<LevelEducation />} />
        <Route path="/training-program/*" element={<TrainingProgram />} />
        <Route path="/trimester/*" element={<Trimester />} />
        <Route path="/course-trimester/*" element={<CourseTrimester />} />
        <Route path="/viewed-result/*" element={<ViewedResult />} />
        <Route path="/course-planning/*" element={<CoursePlanning />} />
        <Route path="/learning-competence/*" element={<LearningCompetence />} />
        <Route path="/learning-result/*" element={<LearningResult />} />
        <Route path="/planning-activity/*" element={<PlanningActivity />} />
        <Route path="/project/*" element={<Project />} />
        <Route path="/project-phase/*" element={<ProjectPhase />} />
        <Route path="/project-activity/*" element={<ProjectActivity />} />
        <Route path="/classroom-type/*" element={<ClassroomType />} />
        <Route path="/campus/*" element={<Campus />} />
        <Route path="/classroom/*" element={<Classroom />} />
        <Route path="/classroom-limitation/*" element={<ClassroomLimitation />} />
        <Route path="/day/*" element={<Day />} />
        <Route path="/modality/*" element={<Modality />} />
        <Route path="/current-quarter/*" element={<CurrentQuarter />} />
        <Route path="/schedule-version/*" element={<ScheduleVersion />} />
        <Route path="/schedule/*" element={<Schedule />} />
        <Route path="/project-group/*" element={<ProjectGroup />} />
        <Route path="/assessment/*" element={<Assessment />} />
        <Route path="/check-list/*" element={<CheckList />} />
        <Route path="/general-observation/*" element={<GeneralObservation />} />
        <Route path="/member-group/*" element={<MemberGroup />} />
        <Route path="/check-list-course/*" element={<CheckListCourse />} />
        <Route path="/item-list/*" element={<ItemList />} />
        <Route path="/group-response/*" element={<GroupResponse />} />
        <Route path="/observation-response/*" element={<ObservationResponse />} />
        <Route path="/year/*" element={<Year />} />
        <Route path="/area/*" element={<Area />} />
        <Route path="/bonding/*" element={<Bonding />} />
        <Route path="/instructor/*" element={<Instructor />} />
        <Route path="/instructor-working-day/*" element={<InstructorWorkingDay />} />
        <Route path="/area-instructor/*" element={<AreaInstructor />} />
        <Route path="/bonding-instructor/*" element={<BondingInstructor />} />
        <Route path="/bounding-schedule/*" element={<BoundingSchedule />} />
        <Route path="/bonding-competence/*" element={<BondingCompetence />} />
        <Route path="/working-day/*" element={<WorkingDay />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
