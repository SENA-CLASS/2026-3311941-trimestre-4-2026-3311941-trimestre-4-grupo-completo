package co.edu.sena.domain;

import java.util.UUID;

public class PlanningActivityTestSamples {

    public static PlanningActivity getPlanningActivitySample1() {
        return new PlanningActivity().id("id1");
    }

    public static PlanningActivity getPlanningActivitySample2() {
        return new PlanningActivity().id("id2");
    }

    public static PlanningActivity getPlanningActivityRandomSampleGenerator() {
        return new PlanningActivity().id(UUID.randomUUID().toString());
    }
}
