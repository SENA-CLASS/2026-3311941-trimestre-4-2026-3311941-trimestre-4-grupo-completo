package co.edu.sena.domain;

import static co.edu.sena.domain.ModalityTestSamples.*;
import static co.edu.sena.domain.ScheduleTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class ModalityTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Modality.class);
        Modality modality1 = getModalitySample1();
        Modality modality2 = new Modality();
        assertThat(modality1).isNotEqualTo(modality2);

        modality2.setId(modality1.getId());
        assertThat(modality1).isEqualTo(modality2);

        modality2 = getModalitySample2();
        assertThat(modality1).isNotEqualTo(modality2);
    }

    @Test
    void scheduleTest() {
        Modality modality = getModalityRandomSampleGenerator();
        Schedule scheduleBack = getScheduleRandomSampleGenerator();

        modality.addSchedule(scheduleBack);
        assertThat(modality.getSchedules()).containsOnly(scheduleBack);
        assertThat(scheduleBack.getModality()).isEqualTo(modality);

        modality.removeSchedule(scheduleBack);
        assertThat(modality.getSchedules()).doesNotContain(scheduleBack);
        assertThat(scheduleBack.getModality()).isNull();

        modality.schedules(new HashSet<>(Set.of(scheduleBack)));
        assertThat(modality.getSchedules()).containsOnly(scheduleBack);
        assertThat(scheduleBack.getModality()).isEqualTo(modality);

        modality.setSchedules(new HashSet<>());
        assertThat(modality.getSchedules()).doesNotContain(scheduleBack);
        assertThat(scheduleBack.getModality()).isNull();
    }
}
