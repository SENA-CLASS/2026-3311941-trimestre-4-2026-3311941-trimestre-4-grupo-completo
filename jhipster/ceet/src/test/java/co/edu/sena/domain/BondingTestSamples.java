package co.edu.sena.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

public class BondingTestSamples {

    private static final Random random = new Random();
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Bonding getBondingSample1() {
        return new Bonding().id("id1").bondingType("bondingType1").workingHours(1);
    }

    public static Bonding getBondingSample2() {
        return new Bonding().id("id2").bondingType("bondingType2").workingHours(2);
    }

    public static Bonding getBondingRandomSampleGenerator() {
        return new Bonding()
            .id(UUID.randomUUID().toString())
            .bondingType(UUID.randomUUID().toString())
            .workingHours(intCount.incrementAndGet());
    }
}
