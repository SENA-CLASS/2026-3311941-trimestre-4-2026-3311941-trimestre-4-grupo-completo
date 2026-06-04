package co.edu.sena.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

public class TrimesterTestSamples {

    private static final Random random = new Random();
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Trimester getTrimesterSample1() {
        return new Trimester().id("id1").trimesterName(1).trimesterState("trimesterState1");
    }

    public static Trimester getTrimesterSample2() {
        return new Trimester().id("id2").trimesterName(2).trimesterState("trimesterState2");
    }

    public static Trimester getTrimesterRandomSampleGenerator() {
        return new Trimester()
            .id(UUID.randomUUID().toString())
            .trimesterName(intCount.incrementAndGet())
            .trimesterState(UUID.randomUUID().toString());
    }
}
