package co.edu.sena.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class AreaInstructorDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AreaInstructorDTO.class);
        AreaInstructorDTO areaInstructorDTO1 = new AreaInstructorDTO();
        areaInstructorDTO1.setId("id1");
        AreaInstructorDTO areaInstructorDTO2 = new AreaInstructorDTO();
        assertThat(areaInstructorDTO1).isNotEqualTo(areaInstructorDTO2);
        areaInstructorDTO2.setId(areaInstructorDTO1.getId());
        assertThat(areaInstructorDTO1).isEqualTo(areaInstructorDTO2);
        areaInstructorDTO2.setId("id2");
        assertThat(areaInstructorDTO1).isNotEqualTo(areaInstructorDTO2);
        areaInstructorDTO1.setId(null);
        assertThat(areaInstructorDTO1).isNotEqualTo(areaInstructorDTO2);
    }
}
