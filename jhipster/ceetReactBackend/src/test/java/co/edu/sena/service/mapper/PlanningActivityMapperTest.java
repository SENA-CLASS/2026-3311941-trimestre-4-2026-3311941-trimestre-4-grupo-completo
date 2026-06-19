package co.edu.sena.service.mapper;

import static co.edu.sena.domain.PlanningActivityAsserts.*;
import static co.edu.sena.domain.PlanningActivityTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class PlanningActivityMapperTest {

    private PlanningActivityMapper planningActivityMapper;

    @BeforeEach
    void setUp() {
        planningActivityMapper = new PlanningActivityMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getPlanningActivitySample1();
        var actual = planningActivityMapper.toEntity(planningActivityMapper.toDto(expected));
        assertPlanningActivityAllPropertiesEquals(expected, actual);
    }
}
