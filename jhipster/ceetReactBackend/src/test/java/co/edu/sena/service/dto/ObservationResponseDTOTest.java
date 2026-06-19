package co.edu.sena.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ObservationResponseDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ObservationResponseDTO.class);
        ObservationResponseDTO observationResponseDTO1 = new ObservationResponseDTO();
        observationResponseDTO1.setId("id1");
        ObservationResponseDTO observationResponseDTO2 = new ObservationResponseDTO();
        assertThat(observationResponseDTO1).isNotEqualTo(observationResponseDTO2);
        observationResponseDTO2.setId(observationResponseDTO1.getId());
        assertThat(observationResponseDTO1).isEqualTo(observationResponseDTO2);
        observationResponseDTO2.setId("id2");
        assertThat(observationResponseDTO1).isNotEqualTo(observationResponseDTO2);
        observationResponseDTO1.setId(null);
        assertThat(observationResponseDTO1).isNotEqualTo(observationResponseDTO2);
    }
}
