package co.edu.sena.service.mapper;

import static co.edu.sena.domain.CoursePlanningAsserts.*;
import static co.edu.sena.domain.CoursePlanningTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CoursePlanningMapperTest {

    private CoursePlanningMapper coursePlanningMapper;

    @BeforeEach
    void setUp() {
        coursePlanningMapper = new CoursePlanningMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getCoursePlanningSample1();
        var actual = coursePlanningMapper.toEntity(coursePlanningMapper.toDto(expected));
        assertCoursePlanningAllPropertiesEquals(expected, actual);
    }
}
