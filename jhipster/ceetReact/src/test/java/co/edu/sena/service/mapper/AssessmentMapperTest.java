package co.edu.sena.service.mapper;

import static co.edu.sena.domain.AssessmentAsserts.*;
import static co.edu.sena.domain.AssessmentTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AssessmentMapperTest {

    private AssessmentMapper assessmentMapper;

    @BeforeEach
    void setUp() {
        assessmentMapper = new AssessmentMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getAssessmentSample1();
        var actual = assessmentMapper.toEntity(assessmentMapper.toDto(expected));
        assertAssessmentAllPropertiesEquals(expected, actual);
    }
}
