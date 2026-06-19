package co.edu.sena.service.mapper;

import static co.edu.sena.domain.ProjectPhaseAsserts.*;
import static co.edu.sena.domain.ProjectPhaseTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ProjectPhaseMapperTest {

    private ProjectPhaseMapper projectPhaseMapper;

    @BeforeEach
    void setUp() {
        projectPhaseMapper = new ProjectPhaseMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getProjectPhaseSample1();
        var actual = projectPhaseMapper.toEntity(projectPhaseMapper.toDto(expected));
        assertProjectPhaseAllPropertiesEquals(expected, actual);
    }
}
