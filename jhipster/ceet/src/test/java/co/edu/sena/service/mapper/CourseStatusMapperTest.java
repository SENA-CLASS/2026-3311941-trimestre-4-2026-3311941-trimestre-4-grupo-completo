package co.edu.sena.service.mapper;

import static co.edu.sena.domain.CourseStatusAsserts.*;
import static co.edu.sena.domain.CourseStatusTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CourseStatusMapperTest {

    private CourseStatusMapper courseStatusMapper;

    @BeforeEach
    void setUp() {
        courseStatusMapper = new CourseStatusMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getCourseStatusSample1();
        var actual = courseStatusMapper.toEntity(courseStatusMapper.toDto(expected));
        assertCourseStatusAllPropertiesEquals(expected, actual);
    }
}
