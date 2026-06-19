package co.edu.sena.service.mapper;

import static co.edu.sena.domain.ClassroomAsserts.*;
import static co.edu.sena.domain.ClassroomTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ClassroomMapperTest {

    private ClassroomMapper classroomMapper;

    @BeforeEach
    void setUp() {
        classroomMapper = new ClassroomMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getClassroomSample1();
        var actual = classroomMapper.toEntity(classroomMapper.toDto(expected));
        assertClassroomAllPropertiesEquals(expected, actual);
    }
}
