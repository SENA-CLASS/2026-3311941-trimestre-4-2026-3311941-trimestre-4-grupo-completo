package co.edu.sena.service.mapper;

import static co.edu.sena.domain.ProjectGroupAsserts.*;
import static co.edu.sena.domain.ProjectGroupTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ProjectGroupMapperTest {

    private ProjectGroupMapper projectGroupMapper;

    @BeforeEach
    void setUp() {
        projectGroupMapper = new ProjectGroupMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getProjectGroupSample1();
        var actual = projectGroupMapper.toEntity(projectGroupMapper.toDto(expected));
        assertProjectGroupAllPropertiesEquals(expected, actual);
    }
}
