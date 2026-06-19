package co.edu.sena.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

public class GeneralObservationTestSamples {

    private static final Random random = new Random();
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static GeneralObservation getGeneralObservationSample1() {
        return new GeneralObservation().id("id1").number(1).observationGeneral("observationGeneral1").jury("jury1");
    }

    public static GeneralObservation getGeneralObservationSample2() {
        return new GeneralObservation().id("id2").number(2).observationGeneral("observationGeneral2").jury("jury2");
    }

    public static GeneralObservation getGeneralObservationRandomSampleGenerator() {
        return new GeneralObservation()
            .id(UUID.randomUUID().toString())
            .number(intCount.incrementAndGet())
            .observationGeneral(UUID.randomUUID().toString())
            .jury(UUID.randomUUID().toString());
    }
}
