package co.edu.sena.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

public class CurrentQuarterTestSamples {

    private static final Random random = new Random();
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static CurrentQuarter getCurrentQuarterSample1() {
        return new CurrentQuarter().id("id1").scheduledQuarter(1);
    }

    public static CurrentQuarter getCurrentQuarterSample2() {
        return new CurrentQuarter().id("id2").scheduledQuarter(2);
    }

    public static CurrentQuarter getCurrentQuarterRandomSampleGenerator() {
        return new CurrentQuarter().id(UUID.randomUUID().toString()).scheduledQuarter(intCount.incrementAndGet());
    }
}
