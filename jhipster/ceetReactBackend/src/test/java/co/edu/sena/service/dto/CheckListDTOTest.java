package co.edu.sena.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CheckListDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CheckListDTO.class);
        CheckListDTO checkListDTO1 = new CheckListDTO();
        checkListDTO1.setId("id1");
        CheckListDTO checkListDTO2 = new CheckListDTO();
        assertThat(checkListDTO1).isNotEqualTo(checkListDTO2);
        checkListDTO2.setId(checkListDTO1.getId());
        assertThat(checkListDTO1).isEqualTo(checkListDTO2);
        checkListDTO2.setId("id2");
        assertThat(checkListDTO1).isNotEqualTo(checkListDTO2);
        checkListDTO1.setId(null);
        assertThat(checkListDTO1).isNotEqualTo(checkListDTO2);
    }
}
