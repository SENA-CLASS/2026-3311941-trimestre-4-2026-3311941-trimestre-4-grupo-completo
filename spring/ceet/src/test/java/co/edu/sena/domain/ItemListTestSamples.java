package co.edu.sena.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

public class ItemListTestSamples {

    private static final Random random = new Random();
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static ItemList getItemListSample1() {
        return new ItemList().id("id1").itemNumber(1).question("question1");
    }

    public static ItemList getItemListSample2() {
        return new ItemList().id("id2").itemNumber(2).question("question2");
    }

    public static ItemList getItemListRandomSampleGenerator() {
        return new ItemList()
            .id(UUID.randomUUID().toString())
            .itemNumber(intCount.incrementAndGet())
            .question(UUID.randomUUID().toString());
    }
}
