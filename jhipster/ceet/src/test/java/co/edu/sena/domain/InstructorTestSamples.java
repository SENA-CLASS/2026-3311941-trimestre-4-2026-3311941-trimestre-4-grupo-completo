package co.edu.sena.domain;

import java.util.UUID;

public class InstructorTestSamples {

    public static Instructor getInstructorSample1() {
        return new Instructor().id("id1");
    }

    public static Instructor getInstructorSample2() {
        return new Instructor().id("id2");
    }

    public static Instructor getInstructorRandomSampleGenerator() {
        return new Instructor().id(UUID.randomUUID().toString());
    }
}
