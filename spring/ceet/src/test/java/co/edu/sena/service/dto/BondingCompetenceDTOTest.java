package co.edu.sena.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class BondingCompetenceDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BondingCompetenceDTO.class);
        BondingCompetenceDTO bondingCompetenceDTO1 = new BondingCompetenceDTO();
        bondingCompetenceDTO1.setId("id1");
        BondingCompetenceDTO bondingCompetenceDTO2 = new BondingCompetenceDTO();
        assertThat(bondingCompetenceDTO1).isNotEqualTo(bondingCompetenceDTO2);
        bondingCompetenceDTO2.setId(bondingCompetenceDTO1.getId());
        assertThat(bondingCompetenceDTO1).isEqualTo(bondingCompetenceDTO2);
        bondingCompetenceDTO2.setId("id2");
        assertThat(bondingCompetenceDTO1).isNotEqualTo(bondingCompetenceDTO2);
        bondingCompetenceDTO1.setId(null);
        assertThat(bondingCompetenceDTO1).isNotEqualTo(bondingCompetenceDTO2);
    }
}
