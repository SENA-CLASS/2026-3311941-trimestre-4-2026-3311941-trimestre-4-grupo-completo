package co.edu.sena.service.mapper;

import static co.edu.sena.domain.YearAsserts.*;
import static co.edu.sena.domain.YearTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class YearMapperTest {

    private YearMapper yearMapper;

    @BeforeEach
    void setUp() {
        yearMapper = new YearMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getYearSample1();
        var actual = yearMapper.toEntity(yearMapper.toDto(expected));
        assertYearAllPropertiesEquals(expected, actual);
    }
}
