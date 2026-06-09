package co.edu.sena.domain;

import static co.edu.sena.domain.BoundingScheduleTestSamples.*;
import static co.edu.sena.domain.InstructorWorkingDayTestSamples.*;
import static co.edu.sena.domain.WorkingDayTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class InstructorWorkingDayTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(InstructorWorkingDay.class);
        InstructorWorkingDay instructorWorkingDay1 = getInstructorWorkingDaySample1();
        InstructorWorkingDay instructorWorkingDay2 = new InstructorWorkingDay();
        assertThat(instructorWorkingDay1).isNotEqualTo(instructorWorkingDay2);

        instructorWorkingDay2.setId(instructorWorkingDay1.getId());
        assertThat(instructorWorkingDay1).isEqualTo(instructorWorkingDay2);

        instructorWorkingDay2 = getInstructorWorkingDaySample2();
        assertThat(instructorWorkingDay1).isNotEqualTo(instructorWorkingDay2);
    }

    @Test
    void boundingScheduleTest() {
        InstructorWorkingDay instructorWorkingDay = getInstructorWorkingDayRandomSampleGenerator();
        BoundingSchedule boundingScheduleBack = getBoundingScheduleRandomSampleGenerator();

        instructorWorkingDay.addBoundingSchedule(boundingScheduleBack);
        assertThat(instructorWorkingDay.getBoundingSchedules()).containsOnly(boundingScheduleBack);
        assertThat(boundingScheduleBack.getInstructorWorkingDay()).isEqualTo(instructorWorkingDay);

        instructorWorkingDay.removeBoundingSchedule(boundingScheduleBack);
        assertThat(instructorWorkingDay.getBoundingSchedules()).doesNotContain(boundingScheduleBack);
        assertThat(boundingScheduleBack.getInstructorWorkingDay()).isNull();

        instructorWorkingDay.boundingSchedules(new HashSet<>(Set.of(boundingScheduleBack)));
        assertThat(instructorWorkingDay.getBoundingSchedules()).containsOnly(boundingScheduleBack);
        assertThat(boundingScheduleBack.getInstructorWorkingDay()).isEqualTo(instructorWorkingDay);

        instructorWorkingDay.setBoundingSchedules(new HashSet<>());
        assertThat(instructorWorkingDay.getBoundingSchedules()).doesNotContain(boundingScheduleBack);
        assertThat(boundingScheduleBack.getInstructorWorkingDay()).isNull();
    }

    @Test
    void workingDayTest() {
        InstructorWorkingDay instructorWorkingDay = getInstructorWorkingDayRandomSampleGenerator();
        WorkingDay workingDayBack = getWorkingDayRandomSampleGenerator();

        instructorWorkingDay.addWorkingDay(workingDayBack);
        assertThat(instructorWorkingDay.getWorkingDays()).containsOnly(workingDayBack);
        assertThat(workingDayBack.getInstructorWorkingDay()).isEqualTo(instructorWorkingDay);

        instructorWorkingDay.removeWorkingDay(workingDayBack);
        assertThat(instructorWorkingDay.getWorkingDays()).doesNotContain(workingDayBack);
        assertThat(workingDayBack.getInstructorWorkingDay()).isNull();

        instructorWorkingDay.workingDays(new HashSet<>(Set.of(workingDayBack)));
        assertThat(instructorWorkingDay.getWorkingDays()).containsOnly(workingDayBack);
        assertThat(workingDayBack.getInstructorWorkingDay()).isEqualTo(instructorWorkingDay);

        instructorWorkingDay.setWorkingDays(new HashSet<>());
        assertThat(instructorWorkingDay.getWorkingDays()).doesNotContain(workingDayBack);
        assertThat(workingDayBack.getInstructorWorkingDay()).isNull();
    }
}
