package co.edu.sena.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class BondingInstructorDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BondingInstructorDTO.class);
        BondingInstructorDTO bondingInstructorDTO1 = new BondingInstructorDTO();
        bondingInstructorDTO1.setId("id1");
        BondingInstructorDTO bondingInstructorDTO2 = new BondingInstructorDTO();
        assertThat(bondingInstructorDTO1).isNotEqualTo(bondingInstructorDTO2);
        bondingInstructorDTO2.setId(bondingInstructorDTO1.getId());
        assertThat(bondingInstructorDTO1).isEqualTo(bondingInstructorDTO2);
        bondingInstructorDTO2.setId("id2");
        assertThat(bondingInstructorDTO1).isNotEqualTo(bondingInstructorDTO2);
        bondingInstructorDTO1.setId(null);
        assertThat(bondingInstructorDTO1).isNotEqualTo(bondingInstructorDTO2);
    }
}
