package co.edu.sena.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class GeneralObservationDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GeneralObservationDTO.class);
        GeneralObservationDTO generalObservationDTO1 = new GeneralObservationDTO();
        generalObservationDTO1.setId("id1");
        GeneralObservationDTO generalObservationDTO2 = new GeneralObservationDTO();
        assertThat(generalObservationDTO1).isNotEqualTo(generalObservationDTO2);
        generalObservationDTO2.setId(generalObservationDTO1.getId());
        assertThat(generalObservationDTO1).isEqualTo(generalObservationDTO2);
        generalObservationDTO2.setId("id2");
        assertThat(generalObservationDTO1).isNotEqualTo(generalObservationDTO2);
        generalObservationDTO1.setId(null);
        assertThat(generalObservationDTO1).isNotEqualTo(generalObservationDTO2);
    }
}
