package co.edu.sena.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CurrentQuarterDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CurrentQuarterDTO.class);
        CurrentQuarterDTO currentQuarterDTO1 = new CurrentQuarterDTO();
        currentQuarterDTO1.setId("id1");
        CurrentQuarterDTO currentQuarterDTO2 = new CurrentQuarterDTO();
        assertThat(currentQuarterDTO1).isNotEqualTo(currentQuarterDTO2);
        currentQuarterDTO2.setId(currentQuarterDTO1.getId());
        assertThat(currentQuarterDTO1).isEqualTo(currentQuarterDTO2);
        currentQuarterDTO2.setId("id2");
        assertThat(currentQuarterDTO1).isNotEqualTo(currentQuarterDTO2);
        currentQuarterDTO1.setId(null);
        assertThat(currentQuarterDTO1).isNotEqualTo(currentQuarterDTO2);
    }
}
