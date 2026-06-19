package co.edu.sena.service.mapper;

import static co.edu.sena.domain.CurrentQuarterAsserts.*;
import static co.edu.sena.domain.CurrentQuarterTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CurrentQuarterMapperTest {

    private CurrentQuarterMapper currentQuarterMapper;

    @BeforeEach
    void setUp() {
        currentQuarterMapper = new CurrentQuarterMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getCurrentQuarterSample1();
        var actual = currentQuarterMapper.toEntity(currentQuarterMapper.toDto(expected));
        assertCurrentQuarterAllPropertiesEquals(expected, actual);
    }
}
