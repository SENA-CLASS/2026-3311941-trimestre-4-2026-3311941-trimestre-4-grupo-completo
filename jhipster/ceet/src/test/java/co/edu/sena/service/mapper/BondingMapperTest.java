package co.edu.sena.service.mapper;

import static co.edu.sena.domain.BondingAsserts.*;
import static co.edu.sena.domain.BondingTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class BondingMapperTest {

    private BondingMapper bondingMapper;

    @BeforeEach
    void setUp() {
        bondingMapper = new BondingMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getBondingSample1();
        var actual = bondingMapper.toEntity(bondingMapper.toDto(expected));
        assertBondingAllPropertiesEquals(expected, actual);
    }
}
