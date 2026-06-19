package co.edu.sena.service.mapper;

import static co.edu.sena.domain.DayAsserts.*;
import static co.edu.sena.domain.DayTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class DayMapperTest {

    private DayMapper dayMapper;

    @BeforeEach
    void setUp() {
        dayMapper = new DayMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getDaySample1();
        var actual = dayMapper.toEntity(dayMapper.toDto(expected));
        assertDayAllPropertiesEquals(expected, actual);
    }
}
