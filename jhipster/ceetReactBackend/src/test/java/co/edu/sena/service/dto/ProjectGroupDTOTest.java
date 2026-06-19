package co.edu.sena.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ProjectGroupDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProjectGroupDTO.class);
        ProjectGroupDTO projectGroupDTO1 = new ProjectGroupDTO();
        projectGroupDTO1.setId("id1");
        ProjectGroupDTO projectGroupDTO2 = new ProjectGroupDTO();
        assertThat(projectGroupDTO1).isNotEqualTo(projectGroupDTO2);
        projectGroupDTO2.setId(projectGroupDTO1.getId());
        assertThat(projectGroupDTO1).isEqualTo(projectGroupDTO2);
        projectGroupDTO2.setId("id2");
        assertThat(projectGroupDTO1).isNotEqualTo(projectGroupDTO2);
        projectGroupDTO1.setId(null);
        assertThat(projectGroupDTO1).isNotEqualTo(projectGroupDTO2);
    }
}
