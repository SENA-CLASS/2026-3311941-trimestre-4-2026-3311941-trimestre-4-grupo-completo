package co.edu.sena.service.mapper;

import static co.edu.sena.domain.ViewedResultAsserts.*;
import static co.edu.sena.domain.ViewedResultTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ViewedResultMapperTest {

    private ViewedResultMapper viewedResultMapper;

    @BeforeEach
    void setUp() {
        viewedResultMapper = new ViewedResultMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getViewedResultSample1();
        var actual = viewedResultMapper.toEntity(viewedResultMapper.toDto(expected));
        assertViewedResultAllPropertiesEquals(expected, actual);
    }
}
