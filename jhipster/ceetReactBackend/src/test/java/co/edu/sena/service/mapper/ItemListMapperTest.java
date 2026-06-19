package co.edu.sena.service.mapper;

import static co.edu.sena.domain.ItemListAsserts.*;
import static co.edu.sena.domain.ItemListTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ItemListMapperTest {

    private ItemListMapper itemListMapper;

    @BeforeEach
    void setUp() {
        itemListMapper = new ItemListMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getItemListSample1();
        var actual = itemListMapper.toEntity(itemListMapper.toDto(expected));
        assertItemListAllPropertiesEquals(expected, actual);
    }
}
