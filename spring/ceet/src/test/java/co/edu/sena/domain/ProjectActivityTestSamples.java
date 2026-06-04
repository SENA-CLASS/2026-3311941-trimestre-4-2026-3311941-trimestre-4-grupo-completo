package co.edu.sena.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

public class ProjectActivityTestSamples {

    private static final Random random = new Random();
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static ProjectActivity getProjectActivitySample1() {
        return new ProjectActivity()
            .id("id1")
            .activityNumber(1)
            .activityDescription("activityDescription1")
            .projectActivityState("projectActivityState1");
    }

    public static ProjectActivity getProjectActivitySample2() {
        return new ProjectActivity()
            .id("id2")
            .activityNumber(2)
            .activityDescription("activityDescription2")
            .projectActivityState("projectActivityState2");
    }

    public static ProjectActivity getProjectActivityRandomSampleGenerator() {
        return new ProjectActivity()
            .id(UUID.randomUUID().toString())
            .activityNumber(intCount.incrementAndGet())
            .activityDescription(UUID.randomUUID().toString())
            .projectActivityState(UUID.randomUUID().toString());
    }
}
