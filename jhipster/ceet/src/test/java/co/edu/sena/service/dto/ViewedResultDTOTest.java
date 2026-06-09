package co.edu.sena.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ViewedResultDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ViewedResultDTO.class);
        ViewedResultDTO viewedResultDTO1 = new ViewedResultDTO();
        viewedResultDTO1.setId("id1");
        ViewedResultDTO viewedResultDTO2 = new ViewedResultDTO();
        assertThat(viewedResultDTO1).isNotEqualTo(viewedResultDTO2);
        viewedResultDTO2.setId(viewedResultDTO1.getId());
        assertThat(viewedResultDTO1).isEqualTo(viewedResultDTO2);
        viewedResultDTO2.setId("id2");
        assertThat(viewedResultDTO1).isNotEqualTo(viewedResultDTO2);
        viewedResultDTO1.setId(null);
        assertThat(viewedResultDTO1).isNotEqualTo(viewedResultDTO2);
    }
}
