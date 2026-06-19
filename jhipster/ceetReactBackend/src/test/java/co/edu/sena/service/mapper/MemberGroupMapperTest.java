package co.edu.sena.service.mapper;

import static co.edu.sena.domain.MemberGroupAsserts.*;
import static co.edu.sena.domain.MemberGroupTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class MemberGroupMapperTest {

    private MemberGroupMapper memberGroupMapper;

    @BeforeEach
    void setUp() {
        memberGroupMapper = new MemberGroupMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getMemberGroupSample1();
        var actual = memberGroupMapper.toEntity(memberGroupMapper.toDto(expected));
        assertMemberGroupAllPropertiesEquals(expected, actual);
    }
}
