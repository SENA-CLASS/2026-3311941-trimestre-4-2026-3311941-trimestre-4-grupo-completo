package co.edu.sena.domain;

import java.util.UUID;

public class TrainingStatusTestSamples {

    public static TrainingStatus getTrainingStatusSample1() {
        return new TrainingStatus().id("id1").statusName("statusName1");
    }

    public static TrainingStatus getTrainingStatusSample2() {
        return new TrainingStatus().id("id2").statusName("statusName2");
    }

    public static TrainingStatus getTrainingStatusRandomSampleGenerator() {
        return new TrainingStatus().id(UUID.randomUUID().toString()).statusName(UUID.randomUUID().toString());
    }
}
