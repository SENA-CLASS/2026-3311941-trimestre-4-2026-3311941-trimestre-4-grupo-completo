package co.edu.sena.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CoursePlanningDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CoursePlanningDTO.class);
        CoursePlanningDTO coursePlanningDTO1 = new CoursePlanningDTO();
        coursePlanningDTO1.setId("id1");
        CoursePlanningDTO coursePlanningDTO2 = new CoursePlanningDTO();
        assertThat(coursePlanningDTO1).isNotEqualTo(coursePlanningDTO2);
        coursePlanningDTO2.setId(coursePlanningDTO1.getId());
        assertThat(coursePlanningDTO1).isEqualTo(coursePlanningDTO2);
        coursePlanningDTO2.setId("id2");
        assertThat(coursePlanningDTO1).isNotEqualTo(coursePlanningDTO2);
        coursePlanningDTO1.setId(null);
        assertThat(coursePlanningDTO1).isNotEqualTo(coursePlanningDTO2);
    }
}
