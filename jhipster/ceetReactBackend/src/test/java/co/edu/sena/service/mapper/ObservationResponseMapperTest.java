package co.edu.sena.service.mapper;

import static co.edu.sena.domain.ObservationResponseAsserts.*;
import static co.edu.sena.domain.ObservationResponseTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ObservationResponseMapperTest {

    private ObservationResponseMapper observationResponseMapper;

    @BeforeEach
    void setUp() {
        observationResponseMapper = new ObservationResponseMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getObservationResponseSample1();
        var actual = observationResponseMapper.toEntity(observationResponseMapper.toDto(expected));
        assertObservationResponseAllPropertiesEquals(expected, actual);
    }
}
