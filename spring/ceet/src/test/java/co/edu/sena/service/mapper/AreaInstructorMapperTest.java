package co.edu.sena.service.mapper;

import static co.edu.sena.domain.AreaInstructorAsserts.*;
import static co.edu.sena.domain.AreaInstructorTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AreaInstructorMapperTest {

    private AreaInstructorMapper areaInstructorMapper;

    @BeforeEach
    void setUp() {
        areaInstructorMapper = new AreaInstructorMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getAreaInstructorSample1();
        var actual = areaInstructorMapper.toEntity(areaInstructorMapper.toDto(expected));
        assertAreaInstructorAllPropertiesEquals(expected, actual);
    }
}
