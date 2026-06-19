package co.edu.sena.domain;

import java.util.UUID;

public class CheckListCourseTestSamples {

    public static CheckListCourse getCheckListCourseSample1() {
        return new CheckListCourse().id("id1");
    }

    public static CheckListCourse getCheckListCourseSample2() {
        return new CheckListCourse().id("id2");
    }

    public static CheckListCourse getCheckListCourseRandomSampleGenerator() {
        return new CheckListCourse().id(UUID.randomUUID().toString());
    }
}
