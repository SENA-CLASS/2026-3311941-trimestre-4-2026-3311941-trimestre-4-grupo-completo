package co.edu.sena.domain;

import java.util.UUID;

public class LearningCompetenceTestSamples {

    public static LearningCompetence getLearningCompetenceSample1() {
        return new LearningCompetence().id("id1").competenceCode("competenceCode1").competitionDenomination("competitionDenomination1");
    }

    public static LearningCompetence getLearningCompetenceSample2() {
        return new LearningCompetence().id("id2").competenceCode("competenceCode2").competitionDenomination("competitionDenomination2");
    }

    public static LearningCompetence getLearningCompetenceRandomSampleGenerator() {
        return new LearningCompetence()
            .id(UUID.randomUUID().toString())
            .competenceCode(UUID.randomUUID().toString())
            .competitionDenomination(UUID.randomUUID().toString());
    }
}
