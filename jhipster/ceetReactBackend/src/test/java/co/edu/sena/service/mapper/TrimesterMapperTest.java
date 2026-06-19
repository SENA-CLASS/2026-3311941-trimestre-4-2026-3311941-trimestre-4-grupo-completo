package co.edu.sena.service.mapper;

import static co.edu.sena.domain.TrimesterAsserts.*;
import static co.edu.sena.domain.TrimesterTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TrimesterMapperTest {

    private TrimesterMapper trimesterMapper;

    @BeforeEach
    void setUp() {
        trimesterMapper = new TrimesterMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getTrimesterSample1();
        var actual = trimesterMapper.toEntity(trimesterMapper.toDto(expected));
        assertTrimesterAllPropertiesEquals(expected, actual);
    }
}
