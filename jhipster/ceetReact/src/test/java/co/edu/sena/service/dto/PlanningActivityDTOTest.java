package co.edu.sena.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PlanningActivityDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlanningActivityDTO.class);
        PlanningActivityDTO planningActivityDTO1 = new PlanningActivityDTO();
        planningActivityDTO1.setId("id1");
        PlanningActivityDTO planningActivityDTO2 = new PlanningActivityDTO();
        assertThat(planningActivityDTO1).isNotEqualTo(planningActivityDTO2);
        planningActivityDTO2.setId(planningActivityDTO1.getId());
        assertThat(planningActivityDTO1).isEqualTo(planningActivityDTO2);
        planningActivityDTO2.setId("id2");
        assertThat(planningActivityDTO1).isNotEqualTo(planningActivityDTO2);
        planningActivityDTO1.setId(null);
        assertThat(planningActivityDTO1).isNotEqualTo(planningActivityDTO2);
    }
}
