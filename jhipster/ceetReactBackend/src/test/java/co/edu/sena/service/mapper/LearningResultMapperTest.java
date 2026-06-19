package co.edu.sena.service.mapper;

import static co.edu.sena.domain.LearningResultAsserts.*;
import static co.edu.sena.domain.LearningResultTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class LearningResultMapperTest {

    private LearningResultMapper learningResultMapper;

    @BeforeEach
    void setUp() {
        learningResultMapper = new LearningResultMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getLearningResultSample1();
        var actual = learningResultMapper.toEntity(learningResultMapper.toDto(expected));
        assertLearningResultAllPropertiesEquals(expected, actual);
    }
}
