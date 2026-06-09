import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'ceetApp.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'document-type',
    data: { pageTitle: 'ceetApp.documentType.home.title' },
    loadChildren: () => import('./document-type/document-type.routes'),
  },
  {
    path: 'customer',
    data: { pageTitle: 'ceetApp.customer.home.title' },
    loadChildren: () => import('./customer/customer.routes'),
  },
  {
    path: 'training-status',
    data: { pageTitle: 'ceetApp.trainingStatus.home.title' },
    loadChildren: () => import('./training-status/training-status.routes'),
  },
  {
    path: 'course-status',
    data: { pageTitle: 'ceetApp.courseStatus.home.title' },
    loadChildren: () => import('./course-status/course-status.routes'),
  },
  {
    path: 'working-day-course',
    data: { pageTitle: 'ceetApp.workingDayCourse.home.title' },
    loadChildren: () => import('./working-day-course/working-day-course.routes'),
  },
  {
    path: 'course',
    data: { pageTitle: 'ceetApp.course.home.title' },
    loadChildren: () => import('./course/course.routes'),
  },
  {
    path: 'apprentice',
    data: { pageTitle: 'ceetApp.apprentice.home.title' },
    loadChildren: () => import('./apprentice/apprentice.routes'),
  },
  {
    path: 'log-error',
    data: { pageTitle: 'ceetApp.logError.home.title' },
    loadChildren: () => import('./log-error/log-error.routes'),
  },
  {
    path: 'log-audit',
    data: { pageTitle: 'ceetApp.logAudit.home.title' },
    loadChildren: () => import('./log-audit/log-audit.routes'),
  },
  {
    path: 'planning',
    data: { pageTitle: 'ceetApp.planning.home.title' },
    loadChildren: () => import('./planning/planning.routes'),
  },
  {
    path: 'quarter-schedule',
    data: { pageTitle: 'ceetApp.quarterSchedule.home.title' },
    loadChildren: () => import('./quarter-schedule/quarter-schedule.routes'),
  },
  {
    path: 'level-education',
    data: { pageTitle: 'ceetApp.levelEducation.home.title' },
    loadChildren: () => import('./level-education/level-education.routes'),
  },
  {
    path: 'training-program',
    data: { pageTitle: 'ceetApp.trainingProgram.home.title' },
    loadChildren: () => import('./training-program/training-program.routes'),
  },
  {
    path: 'trimester',
    data: { pageTitle: 'ceetApp.trimester.home.title' },
    loadChildren: () => import('./trimester/trimester.routes'),
  },
  {
    path: 'course-trimester',
    data: { pageTitle: 'ceetApp.courseTrimester.home.title' },
    loadChildren: () => import('./course-trimester/course-trimester.routes'),
  },
  {
    path: 'viewed-result',
    data: { pageTitle: 'ceetApp.viewedResult.home.title' },
    loadChildren: () => import('./viewed-result/viewed-result.routes'),
  },
  {
    path: 'course-planning',
    data: { pageTitle: 'ceetApp.coursePlanning.home.title' },
    loadChildren: () => import('./course-planning/course-planning.routes'),
  },
  {
    path: 'learning-competence',
    data: { pageTitle: 'ceetApp.learningCompetence.home.title' },
    loadChildren: () => import('./learning-competence/learning-competence.routes'),
  },
  {
    path: 'learning-result',
    data: { pageTitle: 'ceetApp.learningResult.home.title' },
    loadChildren: () => import('./learning-result/learning-result.routes'),
  },
  {
    path: 'planning-activity',
    data: { pageTitle: 'ceetApp.planningActivity.home.title' },
    loadChildren: () => import('./planning-activity/planning-activity.routes'),
  },
  {
    path: 'project',
    data: { pageTitle: 'ceetApp.project.home.title' },
    loadChildren: () => import('./project/project.routes'),
  },
  {
    path: 'project-phase',
    data: { pageTitle: 'ceetApp.projectPhase.home.title' },
    loadChildren: () => import('./project-phase/project-phase.routes'),
  },
  {
    path: 'project-activity',
    data: { pageTitle: 'ceetApp.projectActivity.home.title' },
    loadChildren: () => import('./project-activity/project-activity.routes'),
  },
  {
    path: 'classroom-type',
    data: { pageTitle: 'ceetApp.classroomType.home.title' },
    loadChildren: () => import('./classroom-type/classroom-type.routes'),
  },
  {
    path: 'campus',
    data: { pageTitle: 'ceetApp.campus.home.title' },
    loadChildren: () => import('./campus/campus.routes'),
  },
  {
    path: 'classroom',
    data: { pageTitle: 'ceetApp.classroom.home.title' },
    loadChildren: () => import('./classroom/classroom.routes'),
  },
  {
    path: 'classroom-limitation',
    data: { pageTitle: 'ceetApp.classroomLimitation.home.title' },
    loadChildren: () => import('./classroom-limitation/classroom-limitation.routes'),
  },
  {
    path: 'day',
    data: { pageTitle: 'ceetApp.day.home.title' },
    loadChildren: () => import('./day/day.routes'),
  },
  {
    path: 'modality',
    data: { pageTitle: 'ceetApp.modality.home.title' },
    loadChildren: () => import('./modality/modality.routes'),
  },
  {
    path: 'current-quarter',
    data: { pageTitle: 'ceetApp.currentQuarter.home.title' },
    loadChildren: () => import('./current-quarter/current-quarter.routes'),
  },
  {
    path: 'schedule-version',
    data: { pageTitle: 'ceetApp.scheduleVersion.home.title' },
    loadChildren: () => import('./schedule-version/schedule-version.routes'),
  },
  {
    path: 'schedule',
    data: { pageTitle: 'ceetApp.schedule.home.title' },
    loadChildren: () => import('./schedule/schedule.routes'),
  },
  {
    path: 'project-group',
    data: { pageTitle: 'ceetApp.projectGroup.home.title' },
    loadChildren: () => import('./project-group/project-group.routes'),
  },
  {
    path: 'assessment',
    data: { pageTitle: 'ceetApp.assessment.home.title' },
    loadChildren: () => import('./assessment/assessment.routes'),
  },
  {
    path: 'check-list',
    data: { pageTitle: 'ceetApp.checkList.home.title' },
    loadChildren: () => import('./check-list/check-list.routes'),
  },
  {
    path: 'general-observation',
    data: { pageTitle: 'ceetApp.generalObservation.home.title' },
    loadChildren: () => import('./general-observation/general-observation.routes'),
  },
  {
    path: 'member-group',
    data: { pageTitle: 'ceetApp.memberGroup.home.title' },
    loadChildren: () => import('./member-group/member-group.routes'),
  },
  {
    path: 'check-list-course',
    data: { pageTitle: 'ceetApp.checkListCourse.home.title' },
    loadChildren: () => import('./check-list-course/check-list-course.routes'),
  },
  {
    path: 'item-list',
    data: { pageTitle: 'ceetApp.itemList.home.title' },
    loadChildren: () => import('./item-list/item-list.routes'),
  },
  {
    path: 'group-response',
    data: { pageTitle: 'ceetApp.groupResponse.home.title' },
    loadChildren: () => import('./group-response/group-response.routes'),
  },
  {
    path: 'observation-response',
    data: { pageTitle: 'ceetApp.observationResponse.home.title' },
    loadChildren: () => import('./observation-response/observation-response.routes'),
  },
  {
    path: 'year',
    data: { pageTitle: 'ceetApp.year.home.title' },
    loadChildren: () => import('./year/year.routes'),
  },
  {
    path: 'area',
    data: { pageTitle: 'ceetApp.area.home.title' },
    loadChildren: () => import('./area/area.routes'),
  },
  {
    path: 'bonding',
    data: { pageTitle: 'ceetApp.bonding.home.title' },
    loadChildren: () => import('./bonding/bonding.routes'),
  },
  {
    path: 'instructor',
    data: { pageTitle: 'ceetApp.instructor.home.title' },
    loadChildren: () => import('./instructor/instructor.routes'),
  },
  {
    path: 'instructor-working-day',
    data: { pageTitle: 'ceetApp.instructorWorkingDay.home.title' },
    loadChildren: () => import('./instructor-working-day/instructor-working-day.routes'),
  },
  {
    path: 'area-instructor',
    data: { pageTitle: 'ceetApp.areaInstructor.home.title' },
    loadChildren: () => import('./area-instructor/area-instructor.routes'),
  },
  {
    path: 'bonding-instructor',
    data: { pageTitle: 'ceetApp.bondingInstructor.home.title' },
    loadChildren: () => import('./bonding-instructor/bonding-instructor.routes'),
  },
  {
    path: 'bounding-schedule',
    data: { pageTitle: 'ceetApp.boundingSchedule.home.title' },
    loadChildren: () => import('./bounding-schedule/bounding-schedule.routes'),
  },
  {
    path: 'bonding-competence',
    data: { pageTitle: 'ceetApp.bondingCompetence.home.title' },
    loadChildren: () => import('./bonding-competence/bonding-competence.routes'),
  },
  {
    path: 'working-day',
    data: { pageTitle: 'ceetApp.workingDay.home.title' },
    loadChildren: () => import('./working-day/working-day.routes'),
  },
  {
    path: 'user-management',
    data: { pageTitle: 'userManagement.home.title' },
    loadChildren: () => import('./admin/user-management/user-management.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
