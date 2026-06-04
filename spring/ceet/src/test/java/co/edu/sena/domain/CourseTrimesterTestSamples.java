package co.edu.sena.domain;

import java.util.UUID;

public class CourseTrimesterTestSamples {

    public static CourseTrimester getCourseTrimesterSample1() {
        return new CourseTrimester().id("id1");
    }

    public static CourseTrimester getCourseTrimesterSample2() {
        return new CourseTrimester().id("id2");
    }

    public static CourseTrimester getCourseTrimesterRandomSampleGenerator() {
        return new CourseTrimester().id(UUID.randomUUID().toString());
    }
}
