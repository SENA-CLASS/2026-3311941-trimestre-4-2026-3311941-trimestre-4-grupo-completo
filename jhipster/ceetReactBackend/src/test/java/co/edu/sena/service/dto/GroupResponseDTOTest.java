package co.edu.sena.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class GroupResponseDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GroupResponseDTO.class);
        GroupResponseDTO groupResponseDTO1 = new GroupResponseDTO();
        groupResponseDTO1.setId("id1");
        GroupResponseDTO groupResponseDTO2 = new GroupResponseDTO();
        assertThat(groupResponseDTO1).isNotEqualTo(groupResponseDTO2);
        groupResponseDTO2.setId(groupResponseDTO1.getId());
        assertThat(groupResponseDTO1).isEqualTo(groupResponseDTO2);
        groupResponseDTO2.setId("id2");
        assertThat(groupResponseDTO1).isNotEqualTo(groupResponseDTO2);
        groupResponseDTO1.setId(null);
        assertThat(groupResponseDTO1).isNotEqualTo(groupResponseDTO2);
    }
}
