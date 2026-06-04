package co.edu.sena.service.mapper;

import static co.edu.sena.domain.LevelEducationAsserts.*;
import static co.edu.sena.domain.LevelEducationTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class LevelEducationMapperTest {

    private LevelEducationMapper levelEducationMapper;

    @BeforeEach
    void setUp() {
        levelEducationMapper = new LevelEducationMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getLevelEducationSample1();
        var actual = levelEducationMapper.toEntity(levelEducationMapper.toDto(expected));
        assertLevelEducationAllPropertiesEquals(expected, actual);
    }
}
