package co.edu.sena.domain;

import static co.edu.sena.domain.CourseTrimesterTestSamples.*;
import static co.edu.sena.domain.LevelEducationTestSamples.*;
import static co.edu.sena.domain.QuarterScheduleTestSamples.*;
import static co.edu.sena.domain.TrimesterTestSamples.*;
import static co.edu.sena.domain.WorkingDayCourseTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class TrimesterTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Trimester.class);
        Trimester trimester1 = getTrimesterSample1();
        Trimester trimester2 = new Trimester();
        assertThat(trimester1).isNotEqualTo(trimester2);

        trimester2.setId(trimester1.getId());
        assertThat(trimester1).isEqualTo(trimester2);

        trimester2 = getTrimesterSample2();
        assertThat(trimester1).isNotEqualTo(trimester2);
    }

    @Test
    void courseTrimesterTest() {
        Trimester trimester = getTrimesterRandomSampleGenerator();
        CourseTrimester courseTrimesterBack = getCourseTrimesterRandomSampleGenerator();

        trimester.addCourseTrimester(courseTrimesterBack);
        assertThat(trimester.getCourseTrimesters()).containsOnly(courseTrimesterBack);
        assertThat(courseTrimesterBack.getTrimester()).isEqualTo(trimester);

        trimester.removeCourseTrimester(courseTrimesterBack);
        assertThat(trimester.getCourseTrimesters()).doesNotContain(courseTrimesterBack);
        assertThat(courseTrimesterBack.getTrimester()).isNull();

        trimester.courseTrimesters(new HashSet<>(Set.of(courseTrimesterBack)));
        assertThat(trimester.getCourseTrimesters()).containsOnly(courseTrimesterBack);
        assertThat(courseTrimesterBack.getTrimester()).isEqualTo(trimester);

        trimester.setCourseTrimesters(new HashSet<>());
        assertThat(trimester.getCourseTrimesters()).doesNotContain(courseTrimesterBack);
        assertThat(courseTrimesterBack.getTrimester()).isNull();
    }

    @Test
    void quarterScheduleTest() {
        Trimester trimester = getTrimesterRandomSampleGenerator();
        QuarterSchedule quarterScheduleBack = getQuarterScheduleRandomSampleGenerator();

        trimester.addQuarterSchedule(quarterScheduleBack);
        assertThat(trimester.getQuarterSchedules()).containsOnly(quarterScheduleBack);
        assertThat(quarterScheduleBack.getTrimester()).isEqualTo(trimester);

        trimester.removeQuarterSchedule(quarterScheduleBack);
        assertThat(trimester.getQuarterSchedules()).doesNotContain(quarterScheduleBack);
        assertThat(quarterScheduleBack.getTrimester()).isNull();

        trimester.quarterSchedules(new HashSet<>(Set.of(quarterScheduleBack)));
        assertThat(trimester.getQuarterSchedules()).containsOnly(quarterScheduleBack);
        assertThat(quarterScheduleBack.getTrimester()).isEqualTo(trimester);

        trimester.setQuarterSchedules(new HashSet<>());
        assertThat(trimester.getQuarterSchedules()).doesNotContain(quarterScheduleBack);
        assertThat(quarterScheduleBack.getTrimester()).isNull();
    }

    @Test
    void workingDayCourseTest() {
        Trimester trimester = getTrimesterRandomSampleGenerator();
        WorkingDayCourse workingDayCourseBack = getWorkingDayCourseRandomSampleGenerator();

        trimester.setWorkingDayCourse(workingDayCourseBack);
        assertThat(trimester.getWorkingDayCourse()).isEqualTo(workingDayCourseBack);

        trimester.workingDayCourse(null);
        assertThat(trimester.getWorkingDayCourse()).isNull();
    }

    @Test
    void levelEducationsTest() {
        Trimester trimester = getTrimesterRandomSampleGenerator();
        LevelEducation levelEducationBack = getLevelEducationRandomSampleGenerator();

        trimester.setLevelEducations(levelEducationBack);
        assertThat(trimester.getLevelEducations()).isEqualTo(levelEducationBack);

        trimester.levelEducations(null);
        assertThat(trimester.getLevelEducations()).isNull();
    }
}
