package co.edu.sena.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class AssessmentDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AssessmentDTO.class);
        AssessmentDTO assessmentDTO1 = new AssessmentDTO();
        assessmentDTO1.setId("id1");
        AssessmentDTO assessmentDTO2 = new AssessmentDTO();
        assertThat(assessmentDTO1).isNotEqualTo(assessmentDTO2);
        assessmentDTO2.setId(assessmentDTO1.getId());
        assertThat(assessmentDTO1).isEqualTo(assessmentDTO2);
        assessmentDTO2.setId("id2");
        assertThat(assessmentDTO1).isNotEqualTo(assessmentDTO2);
        assessmentDTO1.setId(null);
        assertThat(assessmentDTO1).isNotEqualTo(assessmentDTO2);
    }
}
