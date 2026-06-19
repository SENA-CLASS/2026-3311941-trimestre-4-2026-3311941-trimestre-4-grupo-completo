package co.edu.sena.service.mapper;

import static co.edu.sena.domain.ProjectActivityAsserts.*;
import static co.edu.sena.domain.ProjectActivityTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ProjectActivityMapperTest {

    private ProjectActivityMapper projectActivityMapper;

    @BeforeEach
    void setUp() {
        projectActivityMapper = new ProjectActivityMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getProjectActivitySample1();
        var actual = projectActivityMapper.toEntity(projectActivityMapper.toDto(expected));
        assertProjectActivityAllPropertiesEquals(expected, actual);
    }
}
