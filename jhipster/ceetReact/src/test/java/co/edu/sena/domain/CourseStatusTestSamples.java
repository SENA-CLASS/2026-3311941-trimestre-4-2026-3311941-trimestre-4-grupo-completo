package co.edu.sena.domain;

import java.util.UUID;

public class CourseStatusTestSamples {

    public static CourseStatus getCourseStatusSample1() {
        return new CourseStatus().id("id1").nameCourseStatus("nameCourseStatus1");
    }

    public static CourseStatus getCourseStatusSample2() {
        return new CourseStatus().id("id2").nameCourseStatus("nameCourseStatus2");
    }

    public static CourseStatus getCourseStatusRandomSampleGenerator() {
        return new CourseStatus().id(UUID.randomUUID().toString()).nameCourseStatus(UUID.randomUUID().toString());
    }
}
