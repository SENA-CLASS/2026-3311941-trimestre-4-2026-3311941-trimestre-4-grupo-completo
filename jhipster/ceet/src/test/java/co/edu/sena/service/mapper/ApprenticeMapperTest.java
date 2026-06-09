package co.edu.sena.service.mapper;

import static co.edu.sena.domain.ApprenticeAsserts.*;
import static co.edu.sena.domain.ApprenticeTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ApprenticeMapperTest {

    private ApprenticeMapper apprenticeMapper;

    @BeforeEach
    void setUp() {
        apprenticeMapper = new ApprenticeMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getApprenticeSample1();
        var actual = apprenticeMapper.toEntity(apprenticeMapper.toDto(expected));
        assertApprenticeAllPropertiesEquals(expected, actual);
    }
}
