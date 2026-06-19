package co.edu.sena.service.mapper;

import static co.edu.sena.domain.BondingInstructorAsserts.*;
import static co.edu.sena.domain.BondingInstructorTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class BondingInstructorMapperTest {

    private BondingInstructorMapper bondingInstructorMapper;

    @BeforeEach
    void setUp() {
        bondingInstructorMapper = new BondingInstructorMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getBondingInstructorSample1();
        var actual = bondingInstructorMapper.toEntity(bondingInstructorMapper.toDto(expected));
        assertBondingInstructorAllPropertiesEquals(expected, actual);
    }
}
