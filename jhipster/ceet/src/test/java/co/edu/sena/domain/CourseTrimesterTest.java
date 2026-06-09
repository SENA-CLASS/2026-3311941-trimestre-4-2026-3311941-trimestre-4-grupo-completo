package co.edu.sena.domain;

import static co.edu.sena.domain.CourseTestSamples.*;
import static co.edu.sena.domain.CourseTrimesterTestSamples.*;
import static co.edu.sena.domain.ScheduleTestSamples.*;
import static co.edu.sena.domain.TrimesterTestSamples.*;
import static co.edu.sena.domain.ViewedResultTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class CourseTrimesterTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CourseTrimester.class);
        CourseTrimester courseTrimester1 = getCourseTrimesterSample1();
        CourseTrimester courseTrimester2 = new CourseTrimester();
        assertThat(courseTrimester1).isNotEqualTo(courseTrimester2);

        courseTrimester2.setId(courseTrimester1.getId());
        assertThat(courseTrimester1).isEqualTo(courseTrimester2);

        courseTrimester2 = getCourseTrimesterSample2();
        assertThat(courseTrimester1).isNotEqualTo(courseTrimester2);
    }

    @Test
    void viewedResultTest() {
        CourseTrimester courseTrimester = getCourseTrimesterRandomSampleGenerator();
        ViewedResult viewedResultBack = getViewedResultRandomSampleGenerator();

        courseTrimester.addViewedResult(viewedResultBack);
        assertThat(courseTrimester.getViewedResults()).containsOnly(viewedResultBack);
        assertThat(viewedResultBack.getCourseTrimester()).isEqualTo(courseTrimester);

        courseTrimester.removeViewedResult(viewedResultBack);
        assertThat(courseTrimester.getViewedResults()).doesNotContain(viewedResultBack);
        assertThat(viewedResultBack.getCourseTrimester()).isNull();

        courseTrimester.viewedResults(new HashSet<>(Set.of(viewedResultBack)));
        assertThat(courseTrimester.getViewedResults()).containsOnly(viewedResultBack);
        assertThat(viewedResultBack.getCourseTrimester()).isEqualTo(courseTrimester);

        courseTrimester.setViewedResults(new HashSet<>());
        assertThat(courseTrimester.getViewedResults()).doesNotContain(viewedResultBack);
        assertThat(viewedResultBack.getCourseTrimester()).isNull();
    }

    @Test
    void scheduleTest() {
        CourseTrimester courseTrimester = getCourseTrimesterRandomSampleGenerator();
        Schedule scheduleBack = getScheduleRandomSampleGenerator();

        courseTrimester.addSchedule(scheduleBack);
        assertThat(courseTrimester.getSchedules()).containsOnly(scheduleBack);
        assertThat(scheduleBack.getCourseTrimester()).isEqualTo(courseTrimester);

        courseTrimester.removeSchedule(scheduleBack);
        assertThat(courseTrimester.getSchedules()).doesNotContain(scheduleBack);
        assertThat(scheduleBack.getCourseTrimester()).isNull();

        courseTrimester.schedules(new HashSet<>(Set.of(scheduleBack)));
        assertThat(courseTrimester.getSchedules()).containsOnly(scheduleBack);
        assertThat(scheduleBack.getCourseTrimester()).isEqualTo(courseTrimester);

        courseTrimester.setSchedules(new HashSet<>());
        assertThat(courseTrimester.getSchedules()).doesNotContain(scheduleBack);
        assertThat(scheduleBack.getCourseTrimester()).isNull();
    }

    @Test
    void courseTest() {
        CourseTrimester courseTrimester = getCourseTrimesterRandomSampleGenerator();
        Course courseBack = getCourseRandomSampleGenerator();

        courseTrimester.setCourse(courseBack);
        assertThat(courseTrimester.getCourse()).isEqualTo(courseBack);

        courseTrimester.course(null);
        assertThat(courseTrimester.getCourse()).isNull();
    }

    @Test
    void trimesterTest() {
        CourseTrimester courseTrimester = getCourseTrimesterRandomSampleGenerator();
        Trimester trimesterBack = getTrimesterRandomSampleGenerator();

        courseTrimester.setTrimester(trimesterBack);
        assertThat(courseTrimester.getTrimester()).isEqualTo(trimesterBack);

        courseTrimester.trimester(null);
        assertThat(courseTrimester.getTrimester()).isNull();
    }
}
