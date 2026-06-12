package co.edu.sena.domain;

import static co.edu.sena.domain.BondingCompetenceTestSamples.*;
import static co.edu.sena.domain.BondingInstructorTestSamples.*;
import static co.edu.sena.domain.BondingTestSamples.*;
import static co.edu.sena.domain.BoundingScheduleTestSamples.*;
import static co.edu.sena.domain.InstructorTestSamples.*;
import static co.edu.sena.domain.YearTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class BondingInstructorTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BondingInstructor.class);
        BondingInstructor bondingInstructor1 = getBondingInstructorSample1();
        BondingInstructor bondingInstructor2 = new BondingInstructor();
        assertThat(bondingInstructor1).isNotEqualTo(bondingInstructor2);

        bondingInstructor2.setId(bondingInstructor1.getId());
        assertThat(bondingInstructor1).isEqualTo(bondingInstructor2);

        bondingInstructor2 = getBondingInstructorSample2();
        assertThat(bondingInstructor1).isNotEqualTo(bondingInstructor2);
    }

    @Test
    void boundingScheduleTest() {
        BondingInstructor bondingInstructor = getBondingInstructorRandomSampleGenerator();
        BoundingSchedule boundingScheduleBack = getBoundingScheduleRandomSampleGenerator();

        bondingInstructor.addBoundingSchedule(boundingScheduleBack);
        assertThat(bondingInstructor.getBoundingSchedules()).containsOnly(boundingScheduleBack);
        assertThat(boundingScheduleBack.getBondingInstructor()).isEqualTo(bondingInstructor);

        bondingInstructor.removeBoundingSchedule(boundingScheduleBack);
        assertThat(bondingInstructor.getBoundingSchedules()).doesNotContain(boundingScheduleBack);
        assertThat(boundingScheduleBack.getBondingInstructor()).isNull();

        bondingInstructor.boundingSchedules(new HashSet<>(Set.of(boundingScheduleBack)));
        assertThat(bondingInstructor.getBoundingSchedules()).containsOnly(boundingScheduleBack);
        assertThat(boundingScheduleBack.getBondingInstructor()).isEqualTo(bondingInstructor);

        bondingInstructor.setBoundingSchedules(new HashSet<>());
        assertThat(bondingInstructor.getBoundingSchedules()).doesNotContain(boundingScheduleBack);
        assertThat(boundingScheduleBack.getBondingInstructor()).isNull();
    }

    @Test
    void bondingCompetenceTest() {
        BondingInstructor bondingInstructor = getBondingInstructorRandomSampleGenerator();
        BondingCompetence bondingCompetenceBack = getBondingCompetenceRandomSampleGenerator();

        bondingInstructor.addBondingCompetence(bondingCompetenceBack);
        assertThat(bondingInstructor.getBondingCompetences()).containsOnly(bondingCompetenceBack);
        assertThat(bondingCompetenceBack.getBondingInstructor()).isEqualTo(bondingInstructor);

        bondingInstructor.removeBondingCompetence(bondingCompetenceBack);
        assertThat(bondingInstructor.getBondingCompetences()).doesNotContain(bondingCompetenceBack);
        assertThat(bondingCompetenceBack.getBondingInstructor()).isNull();

        bondingInstructor.bondingCompetences(new HashSet<>(Set.of(bondingCompetenceBack)));
        assertThat(bondingInstructor.getBondingCompetences()).containsOnly(bondingCompetenceBack);
        assertThat(bondingCompetenceBack.getBondingInstructor()).isEqualTo(bondingInstructor);

        bondingInstructor.setBondingCompetences(new HashSet<>());
        assertThat(bondingInstructor.getBondingCompetences()).doesNotContain(bondingCompetenceBack);
        assertThat(bondingCompetenceBack.getBondingInstructor()).isNull();
    }

    @Test
    void yearTest() {
        BondingInstructor bondingInstructor = getBondingInstructorRandomSampleGenerator();
        Year yearBack = getYearRandomSampleGenerator();

        bondingInstructor.setYear(yearBack);
        assertThat(bondingInstructor.getYear()).isEqualTo(yearBack);

        bondingInstructor.year(null);
        assertThat(bondingInstructor.getYear()).isNull();
    }

    @Test
    void instructorTest() {
        BondingInstructor bondingInstructor = getBondingInstructorRandomSampleGenerator();
        Instructor instructorBack = getInstructorRandomSampleGenerator();

        bondingInstructor.setInstructor(instructorBack);
        assertThat(bondingInstructor.getInstructor()).isEqualTo(instructorBack);

        bondingInstructor.instructor(null);
        assertThat(bondingInstructor.getInstructor()).isNull();
    }

    @Test
    void bondingTest() {
        BondingInstructor bondingInstructor = getBondingInstructorRandomSampleGenerator();
        Bonding bondingBack = getBondingRandomSampleGenerator();

        bondingInstructor.setBonding(bondingBack);
        assertThat(bondingInstructor.getBonding()).isEqualTo(bondingBack);

        bondingInstructor.bonding(null);
        assertThat(bondingInstructor.getBonding()).isNull();
    }
}
