package co.edu.sena.service.mapper;

import static co.edu.sena.domain.InstructorWorkingDayAsserts.*;
import static co.edu.sena.domain.InstructorWorkingDayTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class InstructorWorkingDayMapperTest {

    private InstructorWorkingDayMapper instructorWorkingDayMapper;

    @BeforeEach
    void setUp() {
        instructorWorkingDayMapper = new InstructorWorkingDayMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getInstructorWorkingDaySample1();
        var actual = instructorWorkingDayMapper.toEntity(instructorWorkingDayMapper.toDto(expected));
        assertInstructorWorkingDayAllPropertiesEquals(expected, actual);
    }
}
