package co.edu.sena.service.mapper;

import static co.edu.sena.domain.TrainingProgramAsserts.*;
import static co.edu.sena.domain.TrainingProgramTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TrainingProgramMapperTest {

    private TrainingProgramMapper trainingProgramMapper;

    @BeforeEach
    void setUp() {
        trainingProgramMapper = new TrainingProgramMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getTrainingProgramSample1();
        var actual = trainingProgramMapper.toEntity(trainingProgramMapper.toDto(expected));
        assertTrainingProgramAllPropertiesEquals(expected, actual);
    }
}
