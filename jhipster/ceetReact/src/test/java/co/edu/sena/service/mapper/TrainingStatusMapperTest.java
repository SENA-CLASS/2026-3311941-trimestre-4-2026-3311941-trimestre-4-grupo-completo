package co.edu.sena.service.mapper;

import static co.edu.sena.domain.TrainingStatusAsserts.*;
import static co.edu.sena.domain.TrainingStatusTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TrainingStatusMapperTest {

    private TrainingStatusMapper trainingStatusMapper;

    @BeforeEach
    void setUp() {
        trainingStatusMapper = new TrainingStatusMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getTrainingStatusSample1();
        var actual = trainingStatusMapper.toEntity(trainingStatusMapper.toDto(expected));
        assertTrainingStatusAllPropertiesEquals(expected, actual);
    }
}
