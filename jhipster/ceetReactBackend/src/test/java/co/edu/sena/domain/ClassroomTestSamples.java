package co.edu.sena.domain;

import java.util.UUID;

public class ClassroomTestSamples {

    public static Classroom getClassroomSample1() {
        return new Classroom().id("id1").classroomNumber("classroomNumber1").classroomDescription("classroomDescription1");
    }

    public static Classroom getClassroomSample2() {
        return new Classroom().id("id2").classroomNumber("classroomNumber2").classroomDescription("classroomDescription2");
    }

    public static Classroom getClassroomRandomSampleGenerator() {
        return new Classroom()
            .id(UUID.randomUUID().toString())
            .classroomNumber(UUID.randomUUID().toString())
            .classroomDescription(UUID.randomUUID().toString());
    }
}
