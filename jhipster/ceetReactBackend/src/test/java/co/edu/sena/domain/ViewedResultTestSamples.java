package co.edu.sena.domain;

import java.util.UUID;

public class ViewedResultTestSamples {

    public static ViewedResult getViewedResultSample1() {
        return new ViewedResult().id("id1");
    }

    public static ViewedResult getViewedResultSample2() {
        return new ViewedResult().id("id2");
    }

    public static ViewedResult getViewedResultRandomSampleGenerator() {
        return new ViewedResult().id(UUID.randomUUID().toString());
    }
}
