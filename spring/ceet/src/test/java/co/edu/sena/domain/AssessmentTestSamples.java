package co.edu.sena.domain;

import java.util.UUID;

public class AssessmentTestSamples {

    public static Assessment getAssessmentSample1() {
        return new Assessment().id("id1").assessmentType("assessmentType1");
    }

    public static Assessment getAssessmentSample2() {
        return new Assessment().id("id2").assessmentType("assessmentType2");
    }

    public static Assessment getAssessmentRandomSampleGenerator() {
        return new Assessment().id(UUID.randomUUID().toString()).assessmentType(UUID.randomUUID().toString());
    }
}
