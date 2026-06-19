package co.edu.sena.service.mapper;

import static co.edu.sena.domain.BoundingScheduleAsserts.*;
import static co.edu.sena.domain.BoundingScheduleTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class BoundingScheduleMapperTest {

    private BoundingScheduleMapper boundingScheduleMapper;

    @BeforeEach
    void setUp() {
        boundingScheduleMapper = new BoundingScheduleMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getBoundingScheduleSample1();
        var actual = boundingScheduleMapper.toEntity(boundingScheduleMapper.toDto(expected));
        assertBoundingScheduleAllPropertiesEquals(expected, actual);
    }
}
