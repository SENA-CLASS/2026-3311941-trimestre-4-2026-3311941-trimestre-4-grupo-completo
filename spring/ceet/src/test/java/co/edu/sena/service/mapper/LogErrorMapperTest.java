package co.edu.sena.service.mapper;

import static co.edu.sena.domain.LogErrorAsserts.*;
import static co.edu.sena.domain.LogErrorTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class LogErrorMapperTest {

    private LogErrorMapper logErrorMapper;

    @BeforeEach
    void setUp() {
        logErrorMapper = new LogErrorMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getLogErrorSample1();
        var actual = logErrorMapper.toEntity(logErrorMapper.toDto(expected));
        assertLogErrorAllPropertiesEquals(expected, actual);
    }
}
