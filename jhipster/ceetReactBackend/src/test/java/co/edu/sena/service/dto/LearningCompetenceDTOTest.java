package co.edu.sena.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class LearningCompetenceDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LearningCompetenceDTO.class);
        LearningCompetenceDTO learningCompetenceDTO1 = new LearningCompetenceDTO();
        learningCompetenceDTO1.setId("id1");
        LearningCompetenceDTO learningCompetenceDTO2 = new LearningCompetenceDTO();
        assertThat(learningCompetenceDTO1).isNotEqualTo(learningCompetenceDTO2);
        learningCompetenceDTO2.setId(learningCompetenceDTO1.getId());
        assertThat(learningCompetenceDTO1).isEqualTo(learningCompetenceDTO2);
        learningCompetenceDTO2.setId("id2");
        assertThat(learningCompetenceDTO1).isNotEqualTo(learningCompetenceDTO2);
        learningCompetenceDTO1.setId(null);
        assertThat(learningCompetenceDTO1).isNotEqualTo(learningCompetenceDTO2);
    }
}
