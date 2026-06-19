package co.edu.sena.domain;

import static co.edu.sena.domain.CampusTestSamples.*;
import static co.edu.sena.domain.ClassroomLimitationTestSamples.*;
import static co.edu.sena.domain.ClassroomTestSamples.*;
import static co.edu.sena.domain.ClassroomTypeTestSamples.*;
import static co.edu.sena.domain.ScheduleTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class ClassroomTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Classroom.class);
        Classroom classroom1 = getClassroomSample1();
        Classroom classroom2 = new Classroom();
        assertThat(classroom1).isNotEqualTo(classroom2);

        classroom2.setId(classroom1.getId());
        assertThat(classroom1).isEqualTo(classroom2);

        classroom2 = getClassroomSample2();
        assertThat(classroom1).isNotEqualTo(classroom2);
    }

    @Test
    void classroomLimitationTest() {
        Classroom classroom = getClassroomRandomSampleGenerator();
        ClassroomLimitation classroomLimitationBack = getClassroomLimitationRandomSampleGenerator();

        classroom.addClassroomLimitation(classroomLimitationBack);
        assertThat(classroom.getClassroomLimitations()).containsOnly(classroomLimitationBack);
        assertThat(classroomLimitationBack.getClassroom()).isEqualTo(classroom);

        classroom.removeClassroomLimitation(classroomLimitationBack);
        assertThat(classroom.getClassroomLimitations()).doesNotContain(classroomLimitationBack);
        assertThat(classroomLimitationBack.getClassroom()).isNull();

        classroom.classroomLimitations(new HashSet<>(Set.of(classroomLimitationBack)));
        assertThat(classroom.getClassroomLimitations()).containsOnly(classroomLimitationBack);
        assertThat(classroomLimitationBack.getClassroom()).isEqualTo(classroom);

        classroom.setClassroomLimitations(new HashSet<>());
        assertThat(classroom.getClassroomLimitations()).doesNotContain(classroomLimitationBack);
        assertThat(classroomLimitationBack.getClassroom()).isNull();
    }

    @Test
    void scheduleTest() {
        Classroom classroom = getClassroomRandomSampleGenerator();
        Schedule scheduleBack = getScheduleRandomSampleGenerator();

        classroom.addSchedule(scheduleBack);
        assertThat(classroom.getSchedules()).containsOnly(scheduleBack);
        assertThat(scheduleBack.getClassroom()).isEqualTo(classroom);

        classroom.removeSchedule(scheduleBack);
        assertThat(classroom.getSchedules()).doesNotContain(scheduleBack);
        assertThat(scheduleBack.getClassroom()).isNull();

        classroom.schedules(new HashSet<>(Set.of(scheduleBack)));
        assertThat(classroom.getSchedules()).containsOnly(scheduleBack);
        assertThat(scheduleBack.getClassroom()).isEqualTo(classroom);

        classroom.setSchedules(new HashSet<>());
        assertThat(classroom.getSchedules()).doesNotContain(scheduleBack);
        assertThat(scheduleBack.getClassroom()).isNull();
    }

    @Test
    void classroomTypeTest() {
        Classroom classroom = getClassroomRandomSampleGenerator();
        ClassroomType classroomTypeBack = getClassroomTypeRandomSampleGenerator();

        classroom.setClassroomType(classroomTypeBack);
        assertThat(classroom.getClassroomType()).isEqualTo(classroomTypeBack);

        classroom.classroomType(null);
        assertThat(classroom.getClassroomType()).isNull();
    }

    @Test
    void campusTest() {
        Classroom classroom = getClassroomRandomSampleGenerator();
        Campus campusBack = getCampusRandomSampleGenerator();

        classroom.setCampus(campusBack);
        assertThat(classroom.getCampus()).isEqualTo(campusBack);

        classroom.campus(null);
        assertThat(classroom.getCampus()).isNull();
    }
}
