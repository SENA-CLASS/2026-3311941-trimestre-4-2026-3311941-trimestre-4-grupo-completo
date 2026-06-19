package co.edu.sena.domain;

import static co.edu.sena.domain.DayTestSamples.*;
import static co.edu.sena.domain.InstructorWorkingDayTestSamples.*;
import static co.edu.sena.domain.WorkingDayTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class WorkingDayTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WorkingDay.class);
        WorkingDay workingDay1 = getWorkingDaySample1();
        WorkingDay workingDay2 = new WorkingDay();
        assertThat(workingDay1).isNotEqualTo(workingDay2);

        workingDay2.setId(workingDay1.getId());
        assertThat(workingDay1).isEqualTo(workingDay2);

        workingDay2 = getWorkingDaySample2();
        assertThat(workingDay1).isNotEqualTo(workingDay2);
    }

    @Test
    void instructorWorkingDayTest() {
        WorkingDay workingDay = getWorkingDayRandomSampleGenerator();
        InstructorWorkingDay instructorWorkingDayBack = getInstructorWorkingDayRandomSampleGenerator();

        workingDay.setInstructorWorkingDay(instructorWorkingDayBack);
        assertThat(workingDay.getInstructorWorkingDay()).isEqualTo(instructorWorkingDayBack);

        workingDay.instructorWorkingDay(null);
        assertThat(workingDay.getInstructorWorkingDay()).isNull();
    }

    @Test
    void dayTest() {
        WorkingDay workingDay = getWorkingDayRandomSampleGenerator();
        Day dayBack = getDayRandomSampleGenerator();

        workingDay.setDay(dayBack);
        assertThat(workingDay.getDay()).isEqualTo(dayBack);

        workingDay.day(null);
        assertThat(workingDay.getDay()).isNull();
    }
}
