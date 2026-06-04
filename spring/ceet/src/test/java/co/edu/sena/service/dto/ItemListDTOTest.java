package co.edu.sena.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ItemListDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ItemListDTO.class);
        ItemListDTO itemListDTO1 = new ItemListDTO();
        itemListDTO1.setId("id1");
        ItemListDTO itemListDTO2 = new ItemListDTO();
        assertThat(itemListDTO1).isNotEqualTo(itemListDTO2);
        itemListDTO2.setId(itemListDTO1.getId());
        assertThat(itemListDTO1).isEqualTo(itemListDTO2);
        itemListDTO2.setId("id2");
        assertThat(itemListDTO1).isNotEqualTo(itemListDTO2);
        itemListDTO1.setId(null);
        assertThat(itemListDTO1).isNotEqualTo(itemListDTO2);
    }
}
