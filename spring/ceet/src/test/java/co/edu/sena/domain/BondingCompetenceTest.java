package co.edu.sena.domain;

import static co.edu.sena.domain.BondingCompetenceTestSamples.*;
import static co.edu.sena.domain.BondingInstructorTestSamples.*;
import static co.edu.sena.domain.LearningCompetenceTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class BondingCompetenceTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BondingCompetence.class);
        BondingCompetence bondingCompetence1 = getBondingCompetenceSample1();
        BondingCompetence bondingCompetence2 = new BondingCompetence();
        assertThat(bondingCompetence1).isNotEqualTo(bondingCompetence2);

        bondingCompetence2.setId(bondingCompetence1.getId());
        assertThat(bondingCompetence1).isEqualTo(bondingCompetence2);

        bondingCompetence2 = getBondingCompetenceSample2();
        assertThat(bondingCompetence1).isNotEqualTo(bondingCompetence2);
    }

    @Test
    void bondingInstructorTest() {
        BondingCompetence bondingCompetence = getBondingCompetenceRandomSampleGenerator();
        BondingInstructor bondingInstructorBack = getBondingInstructorRandomSampleGenerator();

        bondingCompetence.setBondingInstructor(bondingInstructorBack);
        assertThat(bondingCompetence.getBondingInstructor()).isEqualTo(bondingInstructorBack);

        bondingCompetence.bondingInstructor(null);
        assertThat(bondingCompetence.getBondingInstructor()).isNull();
    }

    @Test
    void learningCompetenceTest() {
        BondingCompetence bondingCompetence = getBondingCompetenceRandomSampleGenerator();
        LearningCompetence learningCompetenceBack = getLearningCompetenceRandomSampleGenerator();

        bondingCompetence.setLearningCompetence(learningCompetenceBack);
        assertThat(bondingCompetence.getLearningCompetence()).isEqualTo(learningCompetenceBack);

        bondingCompetence.learningCompetence(null);
        assertThat(bondingCompetence.getLearningCompetence()).isNull();
    }
}
