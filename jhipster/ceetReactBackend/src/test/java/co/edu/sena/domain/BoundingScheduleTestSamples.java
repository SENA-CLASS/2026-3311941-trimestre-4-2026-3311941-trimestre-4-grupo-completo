package co.edu.sena.domain;

import java.util.UUID;

public class BoundingScheduleTestSamples {

    public static BoundingSchedule getBoundingScheduleSample1() {
        return new BoundingSchedule().id("id1");
    }

    public static BoundingSchedule getBoundingScheduleSample2() {
        return new BoundingSchedule().id("id2");
    }

    public static BoundingSchedule getBoundingScheduleRandomSampleGenerator() {
        return new BoundingSchedule().id(UUID.randomUUID().toString());
    }
}
