package co.edu.sena.domain;

import static co.edu.sena.domain.CourseStatusTestSamples.*;
import static co.edu.sena.domain.CourseTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class CourseStatusTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CourseStatus.class);
        CourseStatus courseStatus1 = getCourseStatusSample1();
        CourseStatus courseStatus2 = new CourseStatus();
        assertThat(courseStatus1).isNotEqualTo(courseStatus2);

        courseStatus2.setId(courseStatus1.getId());
        assertThat(courseStatus1).isEqualTo(courseStatus2);

        courseStatus2 = getCourseStatusSample2();
        assertThat(courseStatus1).isNotEqualTo(courseStatus2);
    }

    @Test
    void courseTest() {
        CourseStatus courseStatus = getCourseStatusRandomSampleGenerator();
        Course courseBack = getCourseRandomSampleGenerator();

        courseStatus.addCourse(courseBack);
        assertThat(courseStatus.getCourses()).containsOnly(courseBack);
        assertThat(courseBack.getCourseStatus()).isEqualTo(courseStatus);

        courseStatus.removeCourse(courseBack);
        assertThat(courseStatus.getCourses()).doesNotContain(courseBack);
        assertThat(courseBack.getCourseStatus()).isNull();

        courseStatus.courses(new HashSet<>(Set.of(courseBack)));
        assertThat(courseStatus.getCourses()).containsOnly(courseBack);
        assertThat(courseBack.getCourseStatus()).isEqualTo(courseStatus);

        courseStatus.setCourses(new HashSet<>());
        assertThat(courseStatus.getCourses()).doesNotContain(courseBack);
        assertThat(courseBack.getCourseStatus()).isNull();
    }
}
