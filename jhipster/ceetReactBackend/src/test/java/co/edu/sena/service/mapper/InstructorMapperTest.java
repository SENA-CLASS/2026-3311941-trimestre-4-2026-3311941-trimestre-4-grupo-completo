package co.edu.sena.service.mapper;

import static co.edu.sena.domain.InstructorAsserts.*;
import static co.edu.sena.domain.InstructorTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class InstructorMapperTest {

    private InstructorMapper instructorMapper;

    @BeforeEach
    void setUp() {
        instructorMapper = new InstructorMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getInstructorSample1();
        var actual = instructorMapper.toEntity(instructorMapper.toDto(expected));
        assertInstructorAllPropertiesEquals(expected, actual);
    }
}
