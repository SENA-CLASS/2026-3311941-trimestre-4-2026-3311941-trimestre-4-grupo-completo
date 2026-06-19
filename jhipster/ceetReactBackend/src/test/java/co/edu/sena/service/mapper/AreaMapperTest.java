package co.edu.sena.service.mapper;

import static co.edu.sena.domain.AreaAsserts.*;
import static co.edu.sena.domain.AreaTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AreaMapperTest {

    private AreaMapper areaMapper;

    @BeforeEach
    void setUp() {
        areaMapper = new AreaMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getAreaSample1();
        var actual = areaMapper.toEntity(areaMapper.toDto(expected));
        assertAreaAllPropertiesEquals(expected, actual);
    }
}
