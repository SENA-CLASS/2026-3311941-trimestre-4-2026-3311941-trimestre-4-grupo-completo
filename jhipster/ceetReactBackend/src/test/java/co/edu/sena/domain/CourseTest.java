package co.edu.sena.domain;

import static co.edu.sena.domain.ApprenticeTestSamples.*;
import static co.edu.sena.domain.CheckListCourseTestSamples.*;
import static co.edu.sena.domain.CoursePlanningTestSamples.*;
import static co.edu.sena.domain.CourseStatusTestSamples.*;
import static co.edu.sena.domain.CourseTestSamples.*;
import static co.edu.sena.domain.CourseTrimesterTestSamples.*;
import static co.edu.sena.domain.ProjectGroupTestSamples.*;
import static co.edu.sena.domain.TrainingProgramTestSamples.*;
import static co.edu.sena.domain.WorkingDayCourseTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class CourseTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Course.class);
        Course course1 = getCourseSample1();
        Course course2 = new Course();
        assertThat(course1).isNotEqualTo(course2);

        course2.setId(course1.getId());
        assertThat(course1).isEqualTo(course2);

        course2 = getCourseSample2();
        assertThat(course1).isNotEqualTo(course2);
    }

    @Test
    void apprenticeTest() {
        Course course = getCourseRandomSampleGenerator();
        Apprentice apprenticeBack = getApprenticeRandomSampleGenerator();

        course.addApprentice(apprenticeBack);
        assertThat(course.getApprentices()).containsOnly(apprenticeBack);
        assertThat(apprenticeBack.getCourse()).isEqualTo(course);

        course.removeApprentice(apprenticeBack);
        assertThat(course.getApprentices()).doesNotContain(apprenticeBack);
        assertThat(apprenticeBack.getCourse()).isNull();

        course.apprentices(new HashSet<>(Set.of(apprenticeBack)));
        assertThat(course.getApprentices()).containsOnly(apprenticeBack);
        assertThat(apprenticeBack.getCourse()).isEqualTo(course);

        course.setApprentices(new HashSet<>());
        assertThat(course.getApprentices()).doesNotContain(apprenticeBack);
        assertThat(apprenticeBack.getCourse()).isNull();
    }

    @Test
    void courseTrimesterTest() {
        Course course = getCourseRandomSampleGenerator();
        CourseTrimester courseTrimesterBack = getCourseTrimesterRandomSampleGenerator();

        course.addCourseTrimester(courseTrimesterBack);
        assertThat(course.getCourseTrimesters()).containsOnly(courseTrimesterBack);
        assertThat(courseTrimesterBack.getCourse()).isEqualTo(course);

        course.removeCourseTrimester(courseTrimesterBack);
        assertThat(course.getCourseTrimesters()).doesNotContain(courseTrimesterBack);
        assertThat(courseTrimesterBack.getCourse()).isNull();

        course.courseTrimesters(new HashSet<>(Set.of(courseTrimesterBack)));
        assertThat(course.getCourseTrimesters()).containsOnly(courseTrimesterBack);
        assertThat(courseTrimesterBack.getCourse()).isEqualTo(course);

        course.setCourseTrimesters(new HashSet<>());
        assertThat(course.getCourseTrimesters()).doesNotContain(courseTrimesterBack);
        assertThat(courseTrimesterBack.getCourse()).isNull();
    }

    @Test
    void coursePlanningTest() {
        Course course = getCourseRandomSampleGenerator();
        CoursePlanning coursePlanningBack = getCoursePlanningRandomSampleGenerator();

        course.addCoursePlanning(coursePlanningBack);
        assertThat(course.getCoursePlannings()).containsOnly(coursePlanningBack);
        assertThat(coursePlanningBack.getCourse()).isEqualTo(course);

        course.removeCoursePlanning(coursePlanningBack);
        assertThat(course.getCoursePlannings()).doesNotContain(coursePlanningBack);
        assertThat(coursePlanningBack.getCourse()).isNull();

        course.coursePlannings(new HashSet<>(Set.of(coursePlanningBack)));
        assertThat(course.getCoursePlannings()).containsOnly(coursePlanningBack);
        assertThat(coursePlanningBack.getCourse()).isEqualTo(course);

        course.setCoursePlannings(new HashSet<>());
        assertThat(course.getCoursePlannings()).doesNotContain(coursePlanningBack);
        assertThat(coursePlanningBack.getCourse()).isNull();
    }

    @Test
    void projectGroupTest() {
        Course course = getCourseRandomSampleGenerator();
        ProjectGroup projectGroupBack = getProjectGroupRandomSampleGenerator();

        course.addProjectGroup(projectGroupBack);
        assertThat(course.getProjectGroups()).containsOnly(projectGroupBack);
        assertThat(projectGroupBack.getCourse()).isEqualTo(course);

        course.removeProjectGroup(projectGroupBack);
        assertThat(course.getProjectGroups()).doesNotContain(projectGroupBack);
        assertThat(projectGroupBack.getCourse()).isNull();

        course.projectGroups(new HashSet<>(Set.of(projectGroupBack)));
        assertThat(course.getProjectGroups()).containsOnly(projectGroupBack);
        assertThat(projectGroupBack.getCourse()).isEqualTo(course);

        course.setProjectGroups(new HashSet<>());
        assertThat(course.getProjectGroups()).doesNotContain(projectGroupBack);
        assertThat(projectGroupBack.getCourse()).isNull();
    }

    @Test
    void checkListCourseTest() {
        Course course = getCourseRandomSampleGenerator();
        CheckListCourse checkListCourseBack = getCheckListCourseRandomSampleGenerator();

        course.addCheckListCourse(checkListCourseBack);
        assertThat(course.getCheckListCourses()).containsOnly(checkListCourseBack);
        assertThat(checkListCourseBack.getCourse()).isEqualTo(course);

        course.removeCheckListCourse(checkListCourseBack);
        assertThat(course.getCheckListCourses()).doesNotContain(checkListCourseBack);
        assertThat(checkListCourseBack.getCourse()).isNull();

        course.checkListCourses(new HashSet<>(Set.of(checkListCourseBack)));
        assertThat(course.getCheckListCourses()).containsOnly(checkListCourseBack);
        assertThat(checkListCourseBack.getCourse()).isEqualTo(course);

        course.setCheckListCourses(new HashSet<>());
        assertThat(course.getCheckListCourses()).doesNotContain(checkListCourseBack);
        assertThat(checkListCourseBack.getCourse()).isNull();
    }

    @Test
    void courseStatusTest() {
        Course course = getCourseRandomSampleGenerator();
        CourseStatus courseStatusBack = getCourseStatusRandomSampleGenerator();

        course.setCourseStatus(courseStatusBack);
        assertThat(course.getCourseStatus()).isEqualTo(courseStatusBack);

        course.courseStatus(null);
        assertThat(course.getCourseStatus()).isNull();
    }

    @Test
    void workingDayCourseTest() {
        Course course = getCourseRandomSampleGenerator();
        WorkingDayCourse workingDayCourseBack = getWorkingDayCourseRandomSampleGenerator();

        course.setWorkingDayCourse(workingDayCourseBack);
        assertThat(course.getWorkingDayCourse()).isEqualTo(workingDayCourseBack);

        course.workingDayCourse(null);
        assertThat(course.getWorkingDayCourse()).isNull();
    }

    @Test
    void trainingProgramTest() {
        Course course = getCourseRandomSampleGenerator();
        TrainingProgram trainingProgramBack = getTrainingProgramRandomSampleGenerator();

        course.setTrainingProgram(trainingProgramBack);
        assertThat(course.getTrainingProgram()).isEqualTo(trainingProgramBack);

        course.trainingProgram(null);
        assertThat(course.getTrainingProgram()).isNull();
    }
}
