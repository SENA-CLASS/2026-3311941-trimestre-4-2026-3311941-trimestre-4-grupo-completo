package co.edu.sena.domain;

import java.util.UUID;

public class LearningResultTestSamples {

    public static LearningResult getLearningResultSample1() {
        return new LearningResult().id("id1").resultCode("resultCode1").denomination("denomination1");
    }

    public static LearningResult getLearningResultSample2() {
        return new LearningResult().id("id2").resultCode("resultCode2").denomination("denomination2");
    }

    public static LearningResult getLearningResultRandomSampleGenerator() {
        return new LearningResult()
            .id(UUID.randomUUID().toString())
            .resultCode(UUID.randomUUID().toString())
            .denomination(UUID.randomUUID().toString());
    }
}
