package co.edu.sena.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class LevelEducationDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LevelEducationDTO.class);
        LevelEducationDTO levelEducationDTO1 = new LevelEducationDTO();
        levelEducationDTO1.setId("id1");
        LevelEducationDTO levelEducationDTO2 = new LevelEducationDTO();
        assertThat(levelEducationDTO1).isNotEqualTo(levelEducationDTO2);
        levelEducationDTO2.setId(levelEducationDTO1.getId());
        assertThat(levelEducationDTO1).isEqualTo(levelEducationDTO2);
        levelEducationDTO2.setId("id2");
        assertThat(levelEducationDTO1).isNotEqualTo(levelEducationDTO2);
        levelEducationDTO1.setId(null);
        assertThat(levelEducationDTO1).isNotEqualTo(levelEducationDTO2);
    }
}
