package co.edu.sena.domain;

import java.util.UUID;

public class WorkingDayTestSamples {

    public static WorkingDay getWorkingDaySample1() {
        return new WorkingDay().id("id1");
    }

    public static WorkingDay getWorkingDaySample2() {
        return new WorkingDay().id("id2");
    }

    public static WorkingDay getWorkingDayRandomSampleGenerator() {
        return new WorkingDay().id(UUID.randomUUID().toString());
    }
}
