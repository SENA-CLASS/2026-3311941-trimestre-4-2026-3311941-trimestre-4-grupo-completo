package co.edu.sena.domain;

import java.util.UUID;

public class CourseTestSamples {

    public static Course getCourseSample1() {
        return new Course().id("id1").courseNumber("courseNumber1").route("route1");
    }

    public static Course getCourseSample2() {
        return new Course().id("id2").courseNumber("courseNumber2").route("route2");
    }

    public static Course getCourseRandomSampleGenerator() {
        return new Course().id(UUID.randomUUID().toString()).courseNumber(UUID.randomUUID().toString()).route(UUID.randomUUID().toString());
    }
}
