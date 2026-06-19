package co.edu.sena.service.mapper;

import static co.edu.sena.domain.ScheduleVersionAsserts.*;
import static co.edu.sena.domain.ScheduleVersionTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ScheduleVersionMapperTest {

    private ScheduleVersionMapper scheduleVersionMapper;

    @BeforeEach
    void setUp() {
        scheduleVersionMapper = new ScheduleVersionMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getScheduleVersionSample1();
        var actual = scheduleVersionMapper.toEntity(scheduleVersionMapper.toDto(expected));
        assertScheduleVersionAllPropertiesEquals(expected, actual);
    }
}
