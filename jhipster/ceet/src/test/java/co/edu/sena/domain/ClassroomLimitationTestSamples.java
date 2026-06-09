package co.edu.sena.domain;

import java.util.UUID;

public class ClassroomLimitationTestSamples {

    public static ClassroomLimitation getClassroomLimitationSample1() {
        return new ClassroomLimitation().id("id1");
    }

    public static ClassroomLimitation getClassroomLimitationSample2() {
        return new ClassroomLimitation().id("id2");
    }

    public static ClassroomLimitation getClassroomLimitationRandomSampleGenerator() {
        return new ClassroomLimitation().id(UUID.randomUUID().toString());
    }
}
