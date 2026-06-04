package co.edu.sena.service.mapper;

import static co.edu.sena.domain.CheckListAsserts.*;
import static co.edu.sena.domain.CheckListTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CheckListMapperTest {

    private CheckListMapper checkListMapper;

    @BeforeEach
    void setUp() {
        checkListMapper = new CheckListMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getCheckListSample1();
        var actual = checkListMapper.toEntity(checkListMapper.toDto(expected));
        assertCheckListAllPropertiesEquals(expected, actual);
    }
}
