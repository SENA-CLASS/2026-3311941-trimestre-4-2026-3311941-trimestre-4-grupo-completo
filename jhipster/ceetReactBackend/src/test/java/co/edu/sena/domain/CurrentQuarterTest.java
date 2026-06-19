package co.edu.sena.domain;

import static co.edu.sena.domain.CurrentQuarterTestSamples.*;
import static co.edu.sena.domain.ScheduleVersionTestSamples.*;
import static co.edu.sena.domain.YearTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class CurrentQuarterTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CurrentQuarter.class);
        CurrentQuarter currentQuarter1 = getCurrentQuarterSample1();
        CurrentQuarter currentQuarter2 = new CurrentQuarter();
        assertThat(currentQuarter1).isNotEqualTo(currentQuarter2);

        currentQuarter2.setId(currentQuarter1.getId());
        assertThat(currentQuarter1).isEqualTo(currentQuarter2);

        currentQuarter2 = getCurrentQuarterSample2();
        assertThat(currentQuarter1).isNotEqualTo(currentQuarter2);
    }

    @Test
    void scheduleVersionTest() {
        CurrentQuarter currentQuarter = getCurrentQuarterRandomSampleGenerator();
        ScheduleVersion scheduleVersionBack = getScheduleVersionRandomSampleGenerator();

        currentQuarter.addScheduleVersion(scheduleVersionBack);
        assertThat(currentQuarter.getScheduleVersions()).containsOnly(scheduleVersionBack);
        assertThat(scheduleVersionBack.getCurrentQuarter()).isEqualTo(currentQuarter);

        currentQuarter.removeScheduleVersion(scheduleVersionBack);
        assertThat(currentQuarter.getScheduleVersions()).doesNotContain(scheduleVersionBack);
        assertThat(scheduleVersionBack.getCurrentQuarter()).isNull();

        currentQuarter.scheduleVersions(new HashSet<>(Set.of(scheduleVersionBack)));
        assertThat(currentQuarter.getScheduleVersions()).containsOnly(scheduleVersionBack);
        assertThat(scheduleVersionBack.getCurrentQuarter()).isEqualTo(currentQuarter);

        currentQuarter.setScheduleVersions(new HashSet<>());
        assertThat(currentQuarter.getScheduleVersions()).doesNotContain(scheduleVersionBack);
        assertThat(scheduleVersionBack.getCurrentQuarter()).isNull();
    }

    @Test
    void yearTest() {
        CurrentQuarter currentQuarter = getCurrentQuarterRandomSampleGenerator();
        Year yearBack = getYearRandomSampleGenerator();

        currentQuarter.setYear(yearBack);
        assertThat(currentQuarter.getYear()).isEqualTo(yearBack);

        currentQuarter.year(null);
        assertThat(currentQuarter.getYear()).isNull();
    }
}
