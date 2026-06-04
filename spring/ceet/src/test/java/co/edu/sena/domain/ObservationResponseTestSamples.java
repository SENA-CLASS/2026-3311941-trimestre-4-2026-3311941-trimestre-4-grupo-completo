package co.edu.sena.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

public class ObservationResponseTestSamples {

    private static final Random random = new Random();
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static ObservationResponse getObservationResponseSample1() {
        return new ObservationResponse().id("id1").numberObservation(1).obsevation("obsevation1").juries("juries1");
    }

    public static ObservationResponse getObservationResponseSample2() {
        return new ObservationResponse().id("id2").numberObservation(2).obsevation("obsevation2").juries("juries2");
    }

    public static ObservationResponse getObservationResponseRandomSampleGenerator() {
        return new ObservationResponse()
            .id(UUID.randomUUID().toString())
            .numberObservation(intCount.incrementAndGet())
            .obsevation(UUID.randomUUID().toString())
            .juries(UUID.randomUUID().toString());
    }
}
