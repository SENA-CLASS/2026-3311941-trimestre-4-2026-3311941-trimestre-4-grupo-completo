package co.edu.sena.service.mapper;

import static co.edu.sena.domain.ClassroomTypeAsserts.*;
import static co.edu.sena.domain.ClassroomTypeTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ClassroomTypeMapperTest {

    private ClassroomTypeMapper classroomTypeMapper;

    @BeforeEach
    void setUp() {
        classroomTypeMapper = new ClassroomTypeMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getClassroomTypeSample1();
        var actual = classroomTypeMapper.toEntity(classroomTypeMapper.toDto(expected));
        assertClassroomTypeAllPropertiesEquals(expected, actual);
    }
}
