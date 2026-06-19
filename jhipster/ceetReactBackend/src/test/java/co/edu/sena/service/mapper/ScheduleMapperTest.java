package co.edu.sena.service.mapper;

import static co.edu.sena.domain.ScheduleAsserts.*;
import static co.edu.sena.domain.ScheduleTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ScheduleMapperTest {

    private ScheduleMapper scheduleMapper;

    @BeforeEach
    void setUp() {
        scheduleMapper = new ScheduleMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getScheduleSample1();
        var actual = scheduleMapper.toEntity(scheduleMapper.toDto(expected));
        assertScheduleAllPropertiesEquals(expected, actual);
    }
}
