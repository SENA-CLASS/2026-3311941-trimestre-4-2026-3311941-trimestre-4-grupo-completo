package co.edu.sena.domain;

import java.util.UUID;

public class BondingInstructorTestSamples {

    public static BondingInstructor getBondingInstructorSample1() {
        return new BondingInstructor().id("id1");
    }

    public static BondingInstructor getBondingInstructorSample2() {
        return new BondingInstructor().id("id2");
    }

    public static BondingInstructor getBondingInstructorRandomSampleGenerator() {
        return new BondingInstructor().id(UUID.randomUUID().toString());
    }
}
