package co.edu.sena.service.mapper;

import static co.edu.sena.domain.LearningCompetenceAsserts.*;
import static co.edu.sena.domain.LearningCompetenceTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class LearningCompetenceMapperTest {

    private LearningCompetenceMapper learningCompetenceMapper;

    @BeforeEach
    void setUp() {
        learningCompetenceMapper = new LearningCompetenceMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getLearningCompetenceSample1();
        var actual = learningCompetenceMapper.toEntity(learningCompetenceMapper.toDto(expected));
        assertLearningCompetenceAllPropertiesEquals(expected, actual);
    }
}
