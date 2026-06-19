package co.edu.sena.service.mapper;

import static co.edu.sena.domain.GroupResponseAsserts.*;
import static co.edu.sena.domain.GroupResponseTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class GroupResponseMapperTest {

    private GroupResponseMapper groupResponseMapper;

    @BeforeEach
    void setUp() {
        groupResponseMapper = new GroupResponseMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getGroupResponseSample1();
        var actual = groupResponseMapper.toEntity(groupResponseMapper.toDto(expected));
        assertGroupResponseAllPropertiesEquals(expected, actual);
    }
}
