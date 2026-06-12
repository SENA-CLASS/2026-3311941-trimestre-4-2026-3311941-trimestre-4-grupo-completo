package co.edu.sena.domain;

import static co.edu.sena.domain.CourseTestSamples.*;
import static co.edu.sena.domain.TrimesterTestSamples.*;
import static co.edu.sena.domain.WorkingDayCourseTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class WorkingDayCourseTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WorkingDayCourse.class);
        WorkingDayCourse workingDayCourse1 = getWorkingDayCourseSample1();
        WorkingDayCourse workingDayCourse2 = new WorkingDayCourse();
        assertThat(workingDayCourse1).isNotEqualTo(workingDayCourse2);

        workingDayCourse2.setId(workingDayCourse1.getId());
        assertThat(workingDayCourse1).isEqualTo(workingDayCourse2);

        workingDayCourse2 = getWorkingDayCourseSample2();
        assertThat(workingDayCourse1).isNotEqualTo(workingDayCourse2);
    }

    @Test
    void courseTest() {
        WorkingDayCourse workingDayCourse = getWorkingDayCourseRandomSampleGenerator();
        Course courseBack = getCourseRandomSampleGenerator();

        workingDayCourse.addCourse(courseBack);
        assertThat(workingDayCourse.getCourses()).containsOnly(courseBack);
        assertThat(courseBack.getWorkingDayCourse()).isEqualTo(workingDayCourse);

        workingDayCourse.removeCourse(courseBack);
        assertThat(workingDayCourse.getCourses()).doesNotContain(courseBack);
        assertThat(courseBack.getWorkingDayCourse()).isNull();

        workingDayCourse.courses(new HashSet<>(Set.of(courseBack)));
        assertThat(workingDayCourse.getCourses()).containsOnly(courseBack);
        assertThat(courseBack.getWorkingDayCourse()).isEqualTo(workingDayCourse);

        workingDayCourse.setCourses(new HashSet<>());
        assertThat(workingDayCourse.getCourses()).doesNotContain(courseBack);
        assertThat(courseBack.getWorkingDayCourse()).isNull();
    }

    @Test
    void trimesterTest() {
        WorkingDayCourse workingDayCourse = getWorkingDayCourseRandomSampleGenerator();
        Trimester trimesterBack = getTrimesterRandomSampleGenerator();

        workingDayCourse.addTrimester(trimesterBack);
        assertThat(workingDayCourse.getTrimesters()).containsOnly(trimesterBack);
        assertThat(trimesterBack.getWorkingDayCourse()).isEqualTo(workingDayCourse);

        workingDayCourse.removeTrimester(trimesterBack);
        assertThat(workingDayCourse.getTrimesters()).doesNotContain(trimesterBack);
        assertThat(trimesterBack.getWorkingDayCourse()).isNull();

        workingDayCourse.trimesters(new HashSet<>(Set.of(trimesterBack)));
        assertThat(workingDayCourse.getTrimesters()).containsOnly(trimesterBack);
        assertThat(trimesterBack.getWorkingDayCourse()).isEqualTo(workingDayCourse);

        workingDayCourse.setTrimesters(new HashSet<>());
        assertThat(workingDayCourse.getTrimesters()).doesNotContain(trimesterBack);
        assertThat(trimesterBack.getWorkingDayCourse()).isNull();
    }
}
