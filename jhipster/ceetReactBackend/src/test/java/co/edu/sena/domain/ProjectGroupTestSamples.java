package co.edu.sena.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

public class ProjectGroupTestSamples {

    private static final Random random = new Random();
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static ProjectGroup getProjectGroupSample1() {
        return new ProjectGroup().id("id1").groupNumber(1).projectName("projectName1");
    }

    public static ProjectGroup getProjectGroupSample2() {
        return new ProjectGroup().id("id2").groupNumber(2).projectName("projectName2");
    }

    public static ProjectGroup getProjectGroupRandomSampleGenerator() {
        return new ProjectGroup()
            .id(UUID.randomUUID().toString())
            .groupNumber(intCount.incrementAndGet())
            .projectName(UUID.randomUUID().toString());
    }
}
