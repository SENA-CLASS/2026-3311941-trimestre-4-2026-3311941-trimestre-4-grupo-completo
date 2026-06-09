package co.edu.sena.domain;

import java.util.UUID;

public class PlanningTestSamples {

    public static Planning getPlanningSample1() {
        return new Planning().id("id1").planningCode("planningCode1");
    }

    public static Planning getPlanningSample2() {
        return new Planning().id("id2").planningCode("planningCode2");
    }

    public static Planning getPlanningRandomSampleGenerator() {
        return new Planning().id(UUID.randomUUID().toString()).planningCode(UUID.randomUUID().toString());
    }
}
