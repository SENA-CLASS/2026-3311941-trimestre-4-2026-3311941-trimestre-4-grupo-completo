package co.edu.sena.domain;

import static co.edu.sena.domain.ApprenticeTestSamples.*;
import static co.edu.sena.domain.TrainingStatusTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class TrainingStatusTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TrainingStatus.class);
        TrainingStatus trainingStatus1 = getTrainingStatusSample1();
        TrainingStatus trainingStatus2 = new TrainingStatus();
        assertThat(trainingStatus1).isNotEqualTo(trainingStatus2);

        trainingStatus2.setId(trainingStatus1.getId());
        assertThat(trainingStatus1).isEqualTo(trainingStatus2);

        trainingStatus2 = getTrainingStatusSample2();
        assertThat(trainingStatus1).isNotEqualTo(trainingStatus2);
    }

    @Test
    void apprenticeTest() {
        TrainingStatus trainingStatus = getTrainingStatusRandomSampleGenerator();
        Apprentice apprenticeBack = getApprenticeRandomSampleGenerator();

        trainingStatus.addApprentice(apprenticeBack);
        assertThat(trainingStatus.getApprentices()).containsOnly(apprenticeBack);
        assertThat(apprenticeBack.getTrainingStatus()).isEqualTo(trainingStatus);

        trainingStatus.removeApprentice(apprenticeBack);
        assertThat(trainingStatus.getApprentices()).doesNotContain(apprenticeBack);
        assertThat(apprenticeBack.getTrainingStatus()).isNull();

        trainingStatus.apprentices(new HashSet<>(Set.of(apprenticeBack)));
        assertThat(trainingStatus.getApprentices()).containsOnly(apprenticeBack);
        assertThat(apprenticeBack.getTrainingStatus()).isEqualTo(trainingStatus);

        trainingStatus.setApprentices(new HashSet<>());
        assertThat(trainingStatus.getApprentices()).doesNotContain(apprenticeBack);
        assertThat(apprenticeBack.getTrainingStatus()).isNull();
    }
}
