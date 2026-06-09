package co.edu.sena.domain;

import java.util.UUID;

public class ScheduleVersionTestSamples {

    public static ScheduleVersion getScheduleVersionSample1() {
        return new ScheduleVersion().id("id1").versionNumber("versionNumber1");
    }

    public static ScheduleVersion getScheduleVersionSample2() {
        return new ScheduleVersion().id("id2").versionNumber("versionNumber2");
    }

    public static ScheduleVersion getScheduleVersionRandomSampleGenerator() {
        return new ScheduleVersion().id(UUID.randomUUID().toString()).versionNumber(UUID.randomUUID().toString());
    }
}
