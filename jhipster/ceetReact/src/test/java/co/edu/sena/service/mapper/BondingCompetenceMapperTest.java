package co.edu.sena.service.mapper;

import static co.edu.sena.domain.BondingCompetenceAsserts.*;
import static co.edu.sena.domain.BondingCompetenceTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class BondingCompetenceMapperTest {

    private BondingCompetenceMapper bondingCompetenceMapper;

    @BeforeEach
    void setUp() {
        bondingCompetenceMapper = new BondingCompetenceMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getBondingCompetenceSample1();
        var actual = bondingCompetenceMapper.toEntity(bondingCompetenceMapper.toDto(expected));
        assertBondingCompetenceAllPropertiesEquals(expected, actual);
    }
}
