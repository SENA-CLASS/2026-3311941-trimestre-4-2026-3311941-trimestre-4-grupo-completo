package co.edu.sena.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class InstructorWorkingDayDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(InstructorWorkingDayDTO.class);
        InstructorWorkingDayDTO instructorWorkingDayDTO1 = new InstructorWorkingDayDTO();
        instructorWorkingDayDTO1.setId("id1");
        InstructorWorkingDayDTO instructorWorkingDayDTO2 = new InstructorWorkingDayDTO();
        assertThat(instructorWorkingDayDTO1).isNotEqualTo(instructorWorkingDayDTO2);
        instructorWorkingDayDTO2.setId(instructorWorkingDayDTO1.getId());
        assertThat(instructorWorkingDayDTO1).isEqualTo(instructorWorkingDayDTO2);
        instructorWorkingDayDTO2.setId("id2");
        assertThat(instructorWorkingDayDTO1).isNotEqualTo(instructorWorkingDayDTO2);
        instructorWorkingDayDTO1.setId(null);
        assertThat(instructorWorkingDayDTO1).isNotEqualTo(instructorWorkingDayDTO2);
    }
}
