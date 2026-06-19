package co.edu.sena.service.mapper;

import static co.edu.sena.domain.GeneralObservationAsserts.*;
import static co.edu.sena.domain.GeneralObservationTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class GeneralObservationMapperTest {

    private GeneralObservationMapper generalObservationMapper;

    @BeforeEach
    void setUp() {
        generalObservationMapper = new GeneralObservationMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getGeneralObservationSample1();
        var actual = generalObservationMapper.toEntity(generalObservationMapper.toDto(expected));
        assertGeneralObservationAllPropertiesEquals(expected, actual);
    }
}
