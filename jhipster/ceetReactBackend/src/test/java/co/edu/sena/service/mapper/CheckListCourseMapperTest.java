package co.edu.sena.service.mapper;

import static co.edu.sena.domain.CheckListCourseAsserts.*;
import static co.edu.sena.domain.CheckListCourseTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CheckListCourseMapperTest {

    private CheckListCourseMapper checkListCourseMapper;

    @BeforeEach
    void setUp() {
        checkListCourseMapper = new CheckListCourseMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getCheckListCourseSample1();
        var actual = checkListCourseMapper.toEntity(checkListCourseMapper.toDto(expected));
        assertCheckListCourseAllPropertiesEquals(expected, actual);
    }
}
