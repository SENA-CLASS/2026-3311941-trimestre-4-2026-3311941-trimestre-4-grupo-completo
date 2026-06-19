package co.edu.sena.service.mapper;

import static co.edu.sena.domain.CampusAsserts.*;
import static co.edu.sena.domain.CampusTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CampusMapperTest {

    private CampusMapper campusMapper;

    @BeforeEach
    void setUp() {
        campusMapper = new CampusMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getCampusSample1();
        var actual = campusMapper.toEntity(campusMapper.toDto(expected));
        assertCampusAllPropertiesEquals(expected, actual);
    }
}
