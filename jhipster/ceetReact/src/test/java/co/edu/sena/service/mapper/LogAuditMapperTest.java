package co.edu.sena.service.mapper;

import static co.edu.sena.domain.LogAuditAsserts.*;
import static co.edu.sena.domain.LogAuditTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class LogAuditMapperTest {

    private LogAuditMapper logAuditMapper;

    @BeforeEach
    void setUp() {
        logAuditMapper = new LogAuditMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getLogAuditSample1();
        var actual = logAuditMapper.toEntity(logAuditMapper.toDto(expected));
        assertLogAuditAllPropertiesEquals(expected, actual);
    }
}
