package co.edu.sena.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class MemberGroupDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MemberGroupDTO.class);
        MemberGroupDTO memberGroupDTO1 = new MemberGroupDTO();
        memberGroupDTO1.setId("id1");
        MemberGroupDTO memberGroupDTO2 = new MemberGroupDTO();
        assertThat(memberGroupDTO1).isNotEqualTo(memberGroupDTO2);
        memberGroupDTO2.setId(memberGroupDTO1.getId());
        assertThat(memberGroupDTO1).isEqualTo(memberGroupDTO2);
        memberGroupDTO2.setId("id2");
        assertThat(memberGroupDTO1).isNotEqualTo(memberGroupDTO2);
        memberGroupDTO1.setId(null);
        assertThat(memberGroupDTO1).isNotEqualTo(memberGroupDTO2);
    }
}
