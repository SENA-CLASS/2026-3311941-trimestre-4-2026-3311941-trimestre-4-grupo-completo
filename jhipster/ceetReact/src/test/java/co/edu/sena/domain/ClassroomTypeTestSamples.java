package co.edu.sena.domain;

import java.util.UUID;

public class ClassroomTypeTestSamples {

    public static ClassroomType getClassroomTypeSample1() {
        return new ClassroomType().id("id1").typeClassroom("typeClassroom1").classroomDescription("classroomDescription1");
    }

    public static ClassroomType getClassroomTypeSample2() {
        return new ClassroomType().id("id2").typeClassroom("typeClassroom2").classroomDescription("classroomDescription2");
    }

    public static ClassroomType getClassroomTypeRandomSampleGenerator() {
        return new ClassroomType()
            .id(UUID.randomUUID().toString())
            .typeClassroom(UUID.randomUUID().toString())
            .classroomDescription(UUID.randomUUID().toString());
    }
}
