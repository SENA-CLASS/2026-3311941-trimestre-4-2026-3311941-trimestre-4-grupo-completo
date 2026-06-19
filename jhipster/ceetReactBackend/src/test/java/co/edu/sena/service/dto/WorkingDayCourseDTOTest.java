package co.edu.sena.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class WorkingDayCourseDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(WorkingDayCourseDTO.class);
        WorkingDayCourseDTO workingDayCourseDTO1 = new WorkingDayCourseDTO();
        workingDayCourseDTO1.setId("id1");
        WorkingDayCourseDTO workingDayCourseDTO2 = new WorkingDayCourseDTO();
        assertThat(workingDayCourseDTO1).isNotEqualTo(workingDayCourseDTO2);
        workingDayCourseDTO2.setId(workingDayCourseDTO1.getId());
        assertThat(workingDayCourseDTO1).isEqualTo(workingDayCourseDTO2);
        workingDayCourseDTO2.setId("id2");
        assertThat(workingDayCourseDTO1).isNotEqualTo(workingDayCourseDTO2);
        workingDayCourseDTO1.setId(null);
        assertThat(workingDayCourseDTO1).isNotEqualTo(workingDayCourseDTO2);
    }
}
