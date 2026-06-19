package co.edu.sena.service.mapper;

import static co.edu.sena.domain.ClassroomLimitationAsserts.*;
import static co.edu.sena.domain.ClassroomLimitationTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ClassroomLimitationMapperTest {

    private ClassroomLimitationMapper classroomLimitationMapper;

    @BeforeEach
    void setUp() {
        classroomLimitationMapper = new ClassroomLimitationMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getClassroomLimitationSample1();
        var actual = classroomLimitationMapper.toEntity(classroomLimitationMapper.toDto(expected));
        assertClassroomLimitationAllPropertiesEquals(expected, actual);
    }
}
