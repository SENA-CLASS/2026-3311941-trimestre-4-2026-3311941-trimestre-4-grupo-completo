package co.edu.sena.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CourseTrimesterDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CourseTrimesterDTO.class);
        CourseTrimesterDTO courseTrimesterDTO1 = new CourseTrimesterDTO();
        courseTrimesterDTO1.setId("id1");
        CourseTrimesterDTO courseTrimesterDTO2 = new CourseTrimesterDTO();
        assertThat(courseTrimesterDTO1).isNotEqualTo(courseTrimesterDTO2);
        courseTrimesterDTO2.setId(courseTrimesterDTO1.getId());
        assertThat(courseTrimesterDTO1).isEqualTo(courseTrimesterDTO2);
        courseTrimesterDTO2.setId("id2");
        assertThat(courseTrimesterDTO1).isNotEqualTo(courseTrimesterDTO2);
        courseTrimesterDTO1.setId(null);
        assertThat(courseTrimesterDTO1).isNotEqualTo(courseTrimesterDTO2);
    }
}
