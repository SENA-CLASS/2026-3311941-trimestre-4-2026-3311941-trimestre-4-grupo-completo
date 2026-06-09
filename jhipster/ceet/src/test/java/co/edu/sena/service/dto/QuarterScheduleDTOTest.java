package co.edu.sena.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class QuarterScheduleDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(QuarterScheduleDTO.class);
        QuarterScheduleDTO quarterScheduleDTO1 = new QuarterScheduleDTO();
        quarterScheduleDTO1.setId("id1");
        QuarterScheduleDTO quarterScheduleDTO2 = new QuarterScheduleDTO();
        assertThat(quarterScheduleDTO1).isNotEqualTo(quarterScheduleDTO2);
        quarterScheduleDTO2.setId(quarterScheduleDTO1.getId());
        assertThat(quarterScheduleDTO1).isEqualTo(quarterScheduleDTO2);
        quarterScheduleDTO2.setId("id2");
        assertThat(quarterScheduleDTO1).isNotEqualTo(quarterScheduleDTO2);
        quarterScheduleDTO1.setId(null);
        assertThat(quarterScheduleDTO1).isNotEqualTo(quarterScheduleDTO2);
    }
}
