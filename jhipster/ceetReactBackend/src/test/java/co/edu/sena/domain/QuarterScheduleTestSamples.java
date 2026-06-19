package co.edu.sena.domain;

import java.util.UUID;

public class QuarterScheduleTestSamples {

    public static QuarterSchedule getQuarterScheduleSample1() {
        return new QuarterSchedule().id("id1");
    }

    public static QuarterSchedule getQuarterScheduleSample2() {
        return new QuarterSchedule().id("id2");
    }

    public static QuarterSchedule getQuarterScheduleRandomSampleGenerator() {
        return new QuarterSchedule().id(UUID.randomUUID().toString());
    }
}
