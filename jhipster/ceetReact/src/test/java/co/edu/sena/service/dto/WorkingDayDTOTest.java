package co.edu.sena.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class WorkingDayDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(WorkingDayDTO.class);
        WorkingDayDTO workingDayDTO1 = new WorkingDayDTO();
        workingDayDTO1.setId("id1");
        WorkingDayDTO workingDayDTO2 = new WorkingDayDTO();
        assertThat(workingDayDTO1).isNotEqualTo(workingDayDTO2);
        workingDayDTO2.setId(workingDayDTO1.getId());
        assertThat(workingDayDTO1).isEqualTo(workingDayDTO2);
        workingDayDTO2.setId("id2");
        assertThat(workingDayDTO1).isNotEqualTo(workingDayDTO2);
        workingDayDTO1.setId(null);
        assertThat(workingDayDTO1).isNotEqualTo(workingDayDTO2);
    }
}
