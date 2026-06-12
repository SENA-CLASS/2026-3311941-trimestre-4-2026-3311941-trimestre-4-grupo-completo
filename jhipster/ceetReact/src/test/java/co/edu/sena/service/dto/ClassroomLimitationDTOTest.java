package co.edu.sena.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ClassroomLimitationDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ClassroomLimitationDTO.class);
        ClassroomLimitationDTO classroomLimitationDTO1 = new ClassroomLimitationDTO();
        classroomLimitationDTO1.setId("id1");
        ClassroomLimitationDTO classroomLimitationDTO2 = new ClassroomLimitationDTO();
        assertThat(classroomLimitationDTO1).isNotEqualTo(classroomLimitationDTO2);
        classroomLimitationDTO2.setId(classroomLimitationDTO1.getId());
        assertThat(classroomLimitationDTO1).isEqualTo(classroomLimitationDTO2);
        classroomLimitationDTO2.setId("id2");
        assertThat(classroomLimitationDTO1).isNotEqualTo(classroomLimitationDTO2);
        classroomLimitationDTO1.setId(null);
        assertThat(classroomLimitationDTO1).isNotEqualTo(classroomLimitationDTO2);
    }
}
