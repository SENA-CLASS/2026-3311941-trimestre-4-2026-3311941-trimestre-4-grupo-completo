package com.mycompany.ejemplo03.service.mapper;

import static com.mycompany.ejemplo03.domain.CuentaAsserts.*;
import static com.mycompany.ejemplo03.domain.CuentaTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CuentaMapperTest {

    private CuentaMapper cuentaMapper;

    @BeforeEach
    void setUp() {
        cuentaMapper = new CuentaMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getCuentaSample1();
        var actual = cuentaMapper.toEntity(cuentaMapper.toDto(expected));
        assertCuentaAllPropertiesEquals(expected, actual);
    }
}
