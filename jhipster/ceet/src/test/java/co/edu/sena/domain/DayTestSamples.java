package co.edu.sena.domain;

import java.util.UUID;

public class DayTestSamples {

    public static Day getDaySample1() {
        return new Day().id("id1").dayName("dayName1");
    }

    public static Day getDaySample2() {
        return new Day().id("id2").dayName("dayName2");
    }

    public static Day getDayRandomSampleGenerator() {
        return new Day().id(UUID.randomUUID().toString()).dayName(UUID.randomUUID().toString());
    }
}
