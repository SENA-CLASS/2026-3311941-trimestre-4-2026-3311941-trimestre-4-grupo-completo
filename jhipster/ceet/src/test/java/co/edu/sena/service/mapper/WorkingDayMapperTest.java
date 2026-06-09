package co.edu.sena.service.mapper;

import static co.edu.sena.domain.WorkingDayAsserts.*;
import static co.edu.sena.domain.WorkingDayTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class WorkingDayMapperTest {

    private WorkingDayMapper workingDayMapper;

    @BeforeEach
    void setUp() {
        workingDayMapper = new WorkingDayMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getWorkingDaySample1();
        var actual = workingDayMapper.toEntity(workingDayMapper.toDto(expected));
        assertWorkingDayAllPropertiesEquals(expected, actual);
    }
}
