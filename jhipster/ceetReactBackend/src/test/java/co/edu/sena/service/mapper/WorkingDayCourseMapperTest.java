package co.edu.sena.service.mapper;

import static co.edu.sena.domain.WorkingDayCourseAsserts.*;
import static co.edu.sena.domain.WorkingDayCourseTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class WorkingDayCourseMapperTest {

    private WorkingDayCourseMapper workingDayCourseMapper;

    @BeforeEach
    void setUp() {
        workingDayCourseMapper = new WorkingDayCourseMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getWorkingDayCourseSample1();
        var actual = workingDayCourseMapper.toEntity(workingDayCourseMapper.toDto(expected));
        assertWorkingDayCourseAllPropertiesEquals(expected, actual);
    }
}
