package co.edu.sena.domain;

import static co.edu.sena.domain.AreaInstructorTestSamples.*;
import static co.edu.sena.domain.BondingInstructorTestSamples.*;
import static co.edu.sena.domain.CustomerTestSamples.*;
import static co.edu.sena.domain.InstructorTestSamples.*;
import static co.edu.sena.domain.ScheduleTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class InstructorTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Instructor.class);
        Instructor instructor1 = getInstructorSample1();
        Instructor instructor2 = new Instructor();
        assertThat(instructor1).isNotEqualTo(instructor2);

        instructor2.setId(instructor1.getId());
        assertThat(instructor1).isEqualTo(instructor2);

        instructor2 = getInstructorSample2();
        assertThat(instructor1).isNotEqualTo(instructor2);
    }

    @Test
    void areaInstructorTest() {
        Instructor instructor = getInstructorRandomSampleGenerator();
        AreaInstructor areaInstructorBack = getAreaInstructorRandomSampleGenerator();

        instructor.addAreaInstructor(areaInstructorBack);
        assertThat(instructor.getAreaInstructors()).containsOnly(areaInstructorBack);
        assertThat(areaInstructorBack.getInstructor()).isEqualTo(instructor);

        instructor.removeAreaInstructor(areaInstructorBack);
        assertThat(instructor.getAreaInstructors()).doesNotContain(areaInstructorBack);
        assertThat(areaInstructorBack.getInstructor()).isNull();

        instructor.areaInstructors(new HashSet<>(Set.of(areaInstructorBack)));
        assertThat(instructor.getAreaInstructors()).containsOnly(areaInstructorBack);
        assertThat(areaInstructorBack.getInstructor()).isEqualTo(instructor);

        instructor.setAreaInstructors(new HashSet<>());
        assertThat(instructor.getAreaInstructors()).doesNotContain(areaInstructorBack);
        assertThat(areaInstructorBack.getInstructor()).isNull();
    }

    @Test
    void bondingInstructorTest() {
        Instructor instructor = getInstructorRandomSampleGenerator();
        BondingInstructor bondingInstructorBack = getBondingInstructorRandomSampleGenerator();

        instructor.addBondingInstructor(bondingInstructorBack);
        assertThat(instructor.getBondingInstructors()).containsOnly(bondingInstructorBack);
        assertThat(bondingInstructorBack.getInstructor()).isEqualTo(instructor);

        instructor.removeBondingInstructor(bondingInstructorBack);
        assertThat(instructor.getBondingInstructors()).doesNotContain(bondingInstructorBack);
        assertThat(bondingInstructorBack.getInstructor()).isNull();

        instructor.bondingInstructors(new HashSet<>(Set.of(bondingInstructorBack)));
        assertThat(instructor.getBondingInstructors()).containsOnly(bondingInstructorBack);
        assertThat(bondingInstructorBack.getInstructor()).isEqualTo(instructor);

        instructor.setBondingInstructors(new HashSet<>());
        assertThat(instructor.getBondingInstructors()).doesNotContain(bondingInstructorBack);
        assertThat(bondingInstructorBack.getInstructor()).isNull();
    }

    @Test
    void scheduleTest() {
        Instructor instructor = getInstructorRandomSampleGenerator();
        Schedule scheduleBack = getScheduleRandomSampleGenerator();

        instructor.addSchedule(scheduleBack);
        assertThat(instructor.getSchedules()).containsOnly(scheduleBack);
        assertThat(scheduleBack.getInstructor()).isEqualTo(instructor);

        instructor.removeSchedule(scheduleBack);
        assertThat(instructor.getSchedules()).doesNotContain(scheduleBack);
        assertThat(scheduleBack.getInstructor()).isNull();

        instructor.schedules(new HashSet<>(Set.of(scheduleBack)));
        assertThat(instructor.getSchedules()).containsOnly(scheduleBack);
        assertThat(scheduleBack.getInstructor()).isEqualTo(instructor);

        instructor.setSchedules(new HashSet<>());
        assertThat(instructor.getSchedules()).doesNotContain(scheduleBack);
        assertThat(scheduleBack.getInstructor()).isNull();
    }

    @Test
    void customerTest() {
        Instructor instructor = getInstructorRandomSampleGenerator();
        Customer customerBack = getCustomerRandomSampleGenerator();

        instructor.setCustomer(customerBack);
        assertThat(instructor.getCustomer()).isEqualTo(customerBack);

        instructor.customer(null);
        assertThat(instructor.getCustomer()).isNull();
    }
}
