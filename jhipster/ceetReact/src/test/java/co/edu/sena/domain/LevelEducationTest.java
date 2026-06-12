package co.edu.sena.domain;

import static co.edu.sena.domain.LevelEducationTestSamples.*;
import static co.edu.sena.domain.TrainingProgramTestSamples.*;
import static co.edu.sena.domain.TrimesterTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class LevelEducationTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LevelEducation.class);
        LevelEducation levelEducation1 = getLevelEducationSample1();
        LevelEducation levelEducation2 = new LevelEducation();
        assertThat(levelEducation1).isNotEqualTo(levelEducation2);

        levelEducation2.setId(levelEducation1.getId());
        assertThat(levelEducation1).isEqualTo(levelEducation2);

        levelEducation2 = getLevelEducationSample2();
        assertThat(levelEducation1).isNotEqualTo(levelEducation2);
    }

    @Test
    void trainingProgramTest() {
        LevelEducation levelEducation = getLevelEducationRandomSampleGenerator();
        TrainingProgram trainingProgramBack = getTrainingProgramRandomSampleGenerator();

        levelEducation.addTrainingProgram(trainingProgramBack);
        assertThat(levelEducation.getTrainingPrograms()).containsOnly(trainingProgramBack);
        assertThat(trainingProgramBack.getLevelEducation()).isEqualTo(levelEducation);

        levelEducation.removeTrainingProgram(trainingProgramBack);
        assertThat(levelEducation.getTrainingPrograms()).doesNotContain(trainingProgramBack);
        assertThat(trainingProgramBack.getLevelEducation()).isNull();

        levelEducation.trainingPrograms(new HashSet<>(Set.of(trainingProgramBack)));
        assertThat(levelEducation.getTrainingPrograms()).containsOnly(trainingProgramBack);
        assertThat(trainingProgramBack.getLevelEducation()).isEqualTo(levelEducation);

        levelEducation.setTrainingPrograms(new HashSet<>());
        assertThat(levelEducation.getTrainingPrograms()).doesNotContain(trainingProgramBack);
        assertThat(trainingProgramBack.getLevelEducation()).isNull();
    }

    @Test
    void trimesterTest() {
        LevelEducation levelEducation = getLevelEducationRandomSampleGenerator();
        Trimester trimesterBack = getTrimesterRandomSampleGenerator();

        levelEducation.addTrimester(trimesterBack);
        assertThat(levelEducation.getTrimesters()).containsOnly(trimesterBack);
        assertThat(trimesterBack.getLevelEducations()).isEqualTo(levelEducation);

        levelEducation.removeTrimester(trimesterBack);
        assertThat(levelEducation.getTrimesters()).doesNotContain(trimesterBack);
        assertThat(trimesterBack.getLevelEducations()).isNull();

        levelEducation.trimesters(new HashSet<>(Set.of(trimesterBack)));
        assertThat(levelEducation.getTrimesters()).containsOnly(trimesterBack);
        assertThat(trimesterBack.getLevelEducations()).isEqualTo(levelEducation);

        levelEducation.setTrimesters(new HashSet<>());
        assertThat(levelEducation.getTrimesters()).doesNotContain(trimesterBack);
        assertThat(trimesterBack.getLevelEducations()).isNull();
    }
}
