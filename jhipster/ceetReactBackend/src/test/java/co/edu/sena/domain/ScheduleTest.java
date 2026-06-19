package co.edu.sena.domain;

import static co.edu.sena.domain.ClassroomTestSamples.*;
import static co.edu.sena.domain.CourseTrimesterTestSamples.*;
import static co.edu.sena.domain.DayTestSamples.*;
import static co.edu.sena.domain.InstructorTestSamples.*;
import static co.edu.sena.domain.ModalityTestSamples.*;
import static co.edu.sena.domain.ScheduleTestSamples.*;
import static co.edu.sena.domain.ScheduleVersionTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ScheduleTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Schedule.class);
        Schedule schedule1 = getScheduleSample1();
        Schedule schedule2 = new Schedule();
        assertThat(schedule1).isNotEqualTo(schedule2);

        schedule2.setId(schedule1.getId());
        assertThat(schedule1).isEqualTo(schedule2);

        schedule2 = getScheduleSample2();
        assertThat(schedule1).isNotEqualTo(schedule2);
    }

    @Test
    void scheduleVersionTest() {
        Schedule schedule = getScheduleRandomSampleGenerator();
        ScheduleVersion scheduleVersionBack = getScheduleVersionRandomSampleGenerator();

        schedule.setScheduleVersion(scheduleVersionBack);
        assertThat(schedule.getScheduleVersion()).isEqualTo(scheduleVersionBack);

        schedule.scheduleVersion(null);
        assertThat(schedule.getScheduleVersion()).isNull();
    }

    @Test
    void modalityTest() {
        Schedule schedule = getScheduleRandomSampleGenerator();
        Modality modalityBack = getModalityRandomSampleGenerator();

        schedule.setModality(modalityBack);
        assertThat(schedule.getModality()).isEqualTo(modalityBack);

        schedule.modality(null);
        assertThat(schedule.getModality()).isNull();
    }

    @Test
    void dayTest() {
        Schedule schedule = getScheduleRandomSampleGenerator();
        Day dayBack = getDayRandomSampleGenerator();

        schedule.setDay(dayBack);
        assertThat(schedule.getDay()).isEqualTo(dayBack);

        schedule.day(null);
        assertThat(schedule.getDay()).isNull();
    }

    @Test
    void courseTrimesterTest() {
        Schedule schedule = getScheduleRandomSampleGenerator();
        CourseTrimester courseTrimesterBack = getCourseTrimesterRandomSampleGenerator();

        schedule.setCourseTrimester(courseTrimesterBack);
        assertThat(schedule.getCourseTrimester()).isEqualTo(courseTrimesterBack);

        schedule.courseTrimester(null);
        assertThat(schedule.getCourseTrimester()).isNull();
    }

    @Test
    void classroomTest() {
        Schedule schedule = getScheduleRandomSampleGenerator();
        Classroom classroomBack = getClassroomRandomSampleGenerator();

        schedule.setClassroom(classroomBack);
        assertThat(schedule.getClassroom()).isEqualTo(classroomBack);

        schedule.classroom(null);
        assertThat(schedule.getClassroom()).isNull();
    }

    @Test
    void instructorTest() {
        Schedule schedule = getScheduleRandomSampleGenerator();
        Instructor instructorBack = getInstructorRandomSampleGenerator();

        schedule.setInstructor(instructorBack);
        assertThat(schedule.getInstructor()).isEqualTo(instructorBack);

        schedule.instructor(null);
        assertThat(schedule.getInstructor()).isNull();
    }
}
