package co.edu.sena.domain;

import java.util.UUID;

public class AreaInstructorTestSamples {

    public static AreaInstructor getAreaInstructorSample1() {
        return new AreaInstructor().id("id1");
    }

    public static AreaInstructor getAreaInstructorSample2() {
        return new AreaInstructor().id("id2");
    }

    public static AreaInstructor getAreaInstructorRandomSampleGenerator() {
        return new AreaInstructor().id(UUID.randomUUID().toString());
    }
}
