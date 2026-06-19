package co.edu.sena.domain;

import java.util.UUID;

public class ScheduleTestSamples {

    public static Schedule getScheduleSample1() {
        return new Schedule().id("id1");
    }

    public static Schedule getScheduleSample2() {
        return new Schedule().id("id2");
    }

    public static Schedule getScheduleRandomSampleGenerator() {
        return new Schedule().id(UUID.randomUUID().toString());
    }
}
