package co.edu.sena.service.mapper;

import static co.edu.sena.domain.CourseTrimesterAsserts.*;
import static co.edu.sena.domain.CourseTrimesterTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CourseTrimesterMapperTest {

    private CourseTrimesterMapper courseTrimesterMapper;

    @BeforeEach
    void setUp() {
        courseTrimesterMapper = new CourseTrimesterMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getCourseTrimesterSample1();
        var actual = courseTrimesterMapper.toEntity(courseTrimesterMapper.toDto(expected));
        assertCourseTrimesterAllPropertiesEquals(expected, actual);
    }
}
