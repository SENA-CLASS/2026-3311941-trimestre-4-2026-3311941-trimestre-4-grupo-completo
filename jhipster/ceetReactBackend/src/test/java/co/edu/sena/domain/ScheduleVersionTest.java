package co.edu.sena.domain;

import static co.edu.sena.domain.CurrentQuarterTestSamples.*;
import static co.edu.sena.domain.ScheduleTestSamples.*;
import static co.edu.sena.domain.ScheduleVersionTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class ScheduleVersionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ScheduleVersion.class);
        ScheduleVersion scheduleVersion1 = getScheduleVersionSample1();
        ScheduleVersion scheduleVersion2 = new ScheduleVersion();
        assertThat(scheduleVersion1).isNotEqualTo(scheduleVersion2);

        scheduleVersion2.setId(scheduleVersion1.getId());
        assertThat(scheduleVersion1).isEqualTo(scheduleVersion2);

        scheduleVersion2 = getScheduleVersionSample2();
        assertThat(scheduleVersion1).isNotEqualTo(scheduleVersion2);
    }

    @Test
    void scheduleTest() {
        ScheduleVersion scheduleVersion = getScheduleVersionRandomSampleGenerator();
        Schedule scheduleBack = getScheduleRandomSampleGenerator();

        scheduleVersion.addSchedule(scheduleBack);
        assertThat(scheduleVersion.getSchedules()).containsOnly(scheduleBack);
        assertThat(scheduleBack.getScheduleVersion()).isEqualTo(scheduleVersion);

        scheduleVersion.removeSchedule(scheduleBack);
        assertThat(scheduleVersion.getSchedules()).doesNotContain(scheduleBack);
        assertThat(scheduleBack.getScheduleVersion()).isNull();

        scheduleVersion.schedules(new HashSet<>(Set.of(scheduleBack)));
        assertThat(scheduleVersion.getSchedules()).containsOnly(scheduleBack);
        assertThat(scheduleBack.getScheduleVersion()).isEqualTo(scheduleVersion);

        scheduleVersion.setSchedules(new HashSet<>());
        assertThat(scheduleVersion.getSchedules()).doesNotContain(scheduleBack);
        assertThat(scheduleBack.getScheduleVersion()).isNull();
    }

    @Test
    void currentQuarterTest() {
        ScheduleVersion scheduleVersion = getScheduleVersionRandomSampleGenerator();
        CurrentQuarter currentQuarterBack = getCurrentQuarterRandomSampleGenerator();

        scheduleVersion.setCurrentQuarter(currentQuarterBack);
        assertThat(scheduleVersion.getCurrentQuarter()).isEqualTo(currentQuarterBack);

        scheduleVersion.currentQuarter(null);
        assertThat(scheduleVersion.getCurrentQuarter()).isNull();
    }
}
