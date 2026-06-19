package co.edu.sena.domain;

import static co.edu.sena.domain.BondingCompetenceTestSamples.*;
import static co.edu.sena.domain.LearningCompetenceTestSamples.*;
import static co.edu.sena.domain.LearningResultTestSamples.*;
import static co.edu.sena.domain.TrainingProgramTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class LearningCompetenceTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LearningCompetence.class);
        LearningCompetence learningCompetence1 = getLearningCompetenceSample1();
        LearningCompetence learningCompetence2 = new LearningCompetence();
        assertThat(learningCompetence1).isNotEqualTo(learningCompetence2);

        learningCompetence2.setId(learningCompetence1.getId());
        assertThat(learningCompetence1).isEqualTo(learningCompetence2);

        learningCompetence2 = getLearningCompetenceSample2();
        assertThat(learningCompetence1).isNotEqualTo(learningCompetence2);
    }

    @Test
    void learningResultTest() {
        LearningCompetence learningCompetence = getLearningCompetenceRandomSampleGenerator();
        LearningResult learningResultBack = getLearningResultRandomSampleGenerator();

        learningCompetence.addLearningResult(learningResultBack);
        assertThat(learningCompetence.getLearningResults()).containsOnly(learningResultBack);
        assertThat(learningResultBack.getLearningCompetence()).isEqualTo(learningCompetence);

        learningCompetence.removeLearningResult(learningResultBack);
        assertThat(learningCompetence.getLearningResults()).doesNotContain(learningResultBack);
        assertThat(learningResultBack.getLearningCompetence()).isNull();

        learningCompetence.learningResults(new HashSet<>(Set.of(learningResultBack)));
        assertThat(learningCompetence.getLearningResults()).containsOnly(learningResultBack);
        assertThat(learningResultBack.getLearningCompetence()).isEqualTo(learningCompetence);

        learningCompetence.setLearningResults(new HashSet<>());
        assertThat(learningCompetence.getLearningResults()).doesNotContain(learningResultBack);
        assertThat(learningResultBack.getLearningCompetence()).isNull();
    }

    @Test
    void bondingCompetenceTest() {
        LearningCompetence learningCompetence = getLearningCompetenceRandomSampleGenerator();
        BondingCompetence bondingCompetenceBack = getBondingCompetenceRandomSampleGenerator();

        learningCompetence.addBondingCompetence(bondingCompetenceBack);
        assertThat(learningCompetence.getBondingCompetences()).containsOnly(bondingCompetenceBack);
        assertThat(bondingCompetenceBack.getLearningCompetence()).isEqualTo(learningCompetence);

        learningCompetence.removeBondingCompetence(bondingCompetenceBack);
        assertThat(learningCompetence.getBondingCompetences()).doesNotContain(bondingCompetenceBack);
        assertThat(bondingCompetenceBack.getLearningCompetence()).isNull();

        learningCompetence.bondingCompetences(new HashSet<>(Set.of(bondingCompetenceBack)));
        assertThat(learningCompetence.getBondingCompetences()).containsOnly(bondingCompetenceBack);
        assertThat(bondingCompetenceBack.getLearningCompetence()).isEqualTo(learningCompetence);

        learningCompetence.setBondingCompetences(new HashSet<>());
        assertThat(learningCompetence.getBondingCompetences()).doesNotContain(bondingCompetenceBack);
        assertThat(bondingCompetenceBack.getLearningCompetence()).isNull();
    }

    @Test
    void trainingProgramTest() {
        LearningCompetence learningCompetence = getLearningCompetenceRandomSampleGenerator();
        TrainingProgram trainingProgramBack = getTrainingProgramRandomSampleGenerator();

        learningCompetence.setTrainingProgram(trainingProgramBack);
        assertThat(learningCompetence.getTrainingProgram()).isEqualTo(trainingProgramBack);

        learningCompetence.trainingProgram(null);
        assertThat(learningCompetence.getTrainingProgram()).isNull();
    }
}
