package co.edu.sena.domain;

import static co.edu.sena.domain.BondingInstructorTestSamples.*;
import static co.edu.sena.domain.CurrentQuarterTestSamples.*;
import static co.edu.sena.domain.YearTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class YearTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Year.class);
        Year year1 = getYearSample1();
        Year year2 = new Year();
        assertThat(year1).isNotEqualTo(year2);

        year2.setId(year1.getId());
        assertThat(year1).isEqualTo(year2);

        year2 = getYearSample2();
        assertThat(year1).isNotEqualTo(year2);
    }

    @Test
    void bondingInstructorTest() {
        Year year = getYearRandomSampleGenerator();
        BondingInstructor bondingInstructorBack = getBondingInstructorRandomSampleGenerator();

        year.addBondingInstructor(bondingInstructorBack);
        assertThat(year.getBondingInstructors()).containsOnly(bondingInstructorBack);
        assertThat(bondingInstructorBack.getYear()).isEqualTo(year);

        year.removeBondingInstructor(bondingInstructorBack);
        assertThat(year.getBondingInstructors()).doesNotContain(bondingInstructorBack);
        assertThat(bondingInstructorBack.getYear()).isNull();

        year.bondingInstructors(new HashSet<>(Set.of(bondingInstructorBack)));
        assertThat(year.getBondingInstructors()).containsOnly(bondingInstructorBack);
        assertThat(bondingInstructorBack.getYear()).isEqualTo(year);

        year.setBondingInstructors(new HashSet<>());
        assertThat(year.getBondingInstructors()).doesNotContain(bondingInstructorBack);
        assertThat(bondingInstructorBack.getYear()).isNull();
    }

    @Test
    void currentQuarterTest() {
        Year year = getYearRandomSampleGenerator();
        CurrentQuarter currentQuarterBack = getCurrentQuarterRandomSampleGenerator();

        year.addCurrentQuarter(currentQuarterBack);
        assertThat(year.getCurrentQuarters()).containsOnly(currentQuarterBack);
        assertThat(currentQuarterBack.getYear()).isEqualTo(year);

        year.removeCurrentQuarter(currentQuarterBack);
        assertThat(year.getCurrentQuarters()).doesNotContain(currentQuarterBack);
        assertThat(currentQuarterBack.getYear()).isNull();

        year.currentQuarters(new HashSet<>(Set.of(currentQuarterBack)));
        assertThat(year.getCurrentQuarters()).containsOnly(currentQuarterBack);
        assertThat(currentQuarterBack.getYear()).isEqualTo(year);

        year.setCurrentQuarters(new HashSet<>());
        assertThat(year.getCurrentQuarters()).doesNotContain(currentQuarterBack);
        assertThat(currentQuarterBack.getYear()).isNull();
    }
}
