package co.edu.sena.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ProjectPhaseDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProjectPhaseDTO.class);
        ProjectPhaseDTO projectPhaseDTO1 = new ProjectPhaseDTO();
        projectPhaseDTO1.setId("id1");
        ProjectPhaseDTO projectPhaseDTO2 = new ProjectPhaseDTO();
        assertThat(projectPhaseDTO1).isNotEqualTo(projectPhaseDTO2);
        projectPhaseDTO2.setId(projectPhaseDTO1.getId());
        assertThat(projectPhaseDTO1).isEqualTo(projectPhaseDTO2);
        projectPhaseDTO2.setId("id2");
        assertThat(projectPhaseDTO1).isNotEqualTo(projectPhaseDTO2);
        projectPhaseDTO1.setId(null);
        assertThat(projectPhaseDTO1).isNotEqualTo(projectPhaseDTO2);
    }
}
