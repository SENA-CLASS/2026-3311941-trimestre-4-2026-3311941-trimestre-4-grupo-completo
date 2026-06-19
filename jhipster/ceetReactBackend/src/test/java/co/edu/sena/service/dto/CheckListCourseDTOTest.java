package co.edu.sena.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CheckListCourseDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CheckListCourseDTO.class);
        CheckListCourseDTO checkListCourseDTO1 = new CheckListCourseDTO();
        checkListCourseDTO1.setId("id1");
        CheckListCourseDTO checkListCourseDTO2 = new CheckListCourseDTO();
        assertThat(checkListCourseDTO1).isNotEqualTo(checkListCourseDTO2);
        checkListCourseDTO2.setId(checkListCourseDTO1.getId());
        assertThat(checkListCourseDTO1).isEqualTo(checkListCourseDTO2);
        checkListCourseDTO2.setId("id2");
        assertThat(checkListCourseDTO1).isNotEqualTo(checkListCourseDTO2);
        checkListCourseDTO1.setId(null);
        assertThat(checkListCourseDTO1).isNotEqualTo(checkListCourseDTO2);
    }
}
