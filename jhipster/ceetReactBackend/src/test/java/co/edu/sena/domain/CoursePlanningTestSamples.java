package co.edu.sena.domain;

import java.util.UUID;

public class CoursePlanningTestSamples {

    public static CoursePlanning getCoursePlanningSample1() {
        return new CoursePlanning().id("id1");
    }

    public static CoursePlanning getCoursePlanningSample2() {
        return new CoursePlanning().id("id2");
    }

    public static CoursePlanning getCoursePlanningRandomSampleGenerator() {
        return new CoursePlanning().id(UUID.randomUUID().toString());
    }
}
