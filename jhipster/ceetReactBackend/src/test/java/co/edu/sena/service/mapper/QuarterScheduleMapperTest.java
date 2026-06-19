package co.edu.sena.service.mapper;

import static co.edu.sena.domain.QuarterScheduleAsserts.*;
import static co.edu.sena.domain.QuarterScheduleTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class QuarterScheduleMapperTest {

    private QuarterScheduleMapper quarterScheduleMapper;

    @BeforeEach
    void setUp() {
        quarterScheduleMapper = new QuarterScheduleMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getQuarterScheduleSample1();
        var actual = quarterScheduleMapper.toEntity(quarterScheduleMapper.toDto(expected));
        assertQuarterScheduleAllPropertiesEquals(expected, actual);
    }
}
