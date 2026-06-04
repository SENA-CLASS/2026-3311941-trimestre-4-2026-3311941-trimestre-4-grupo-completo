package co.edu.sena.domain;

import static co.edu.sena.domain.BondingInstructorTestSamples.*;
import static co.edu.sena.domain.BoundingScheduleTestSamples.*;
import static co.edu.sena.domain.InstructorWorkingDayTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class BoundingScheduleTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BoundingSchedule.class);
        BoundingSchedule boundingSchedule1 = getBoundingScheduleSample1();
        BoundingSchedule boundingSchedule2 = new BoundingSchedule();
        assertThat(boundingSchedule1).isNotEqualTo(boundingSchedule2);

        boundingSchedule2.setId(boundingSchedule1.getId());
        assertThat(boundingSchedule1).isEqualTo(boundingSchedule2);

        boundingSchedule2 = getBoundingScheduleSample2();
        assertThat(boundingSchedule1).isNotEqualTo(boundingSchedule2);
    }

    @Test
    void bondingInstructorTest() {
        BoundingSchedule boundingSchedule = getBoundingScheduleRandomSampleGenerator();
        BondingInstructor bondingInstructorBack = getBondingInstructorRandomSampleGenerator();

        boundingSchedule.setBondingInstructor(bondingInstructorBack);
        assertThat(boundingSchedule.getBondingInstructor()).isEqualTo(bondingInstructorBack);

        boundingSchedule.bondingInstructor(null);
        assertThat(boundingSchedule.getBondingInstructor()).isNull();
    }

    @Test
    void instructorWorkingDayTest() {
        BoundingSchedule boundingSchedule = getBoundingScheduleRandomSampleGenerator();
        InstructorWorkingDay instructorWorkingDayBack = getInstructorWorkingDayRandomSampleGenerator();

        boundingSchedule.setInstructorWorkingDay(instructorWorkingDayBack);
        assertThat(boundingSchedule.getInstructorWorkingDay()).isEqualTo(instructorWorkingDayBack);

        boundingSchedule.instructorWorkingDay(null);
        assertThat(boundingSchedule.getInstructorWorkingDay()).isNull();
    }
}
