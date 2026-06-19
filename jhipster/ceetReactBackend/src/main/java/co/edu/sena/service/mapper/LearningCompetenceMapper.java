package co.edu.sena.service.mapper;

import co.edu.sena.domain.LearningCompetence;
import co.edu.sena.domain.TrainingProgram;
import co.edu.sena.service.dto.LearningCompetenceDTO;
import co.edu.sena.service.dto.TrainingProgramDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link LearningCompetence} and its DTO {@link LearningCompetenceDTO}.
 */
@Mapper(componentModel = "spring")
public interface LearningCompetenceMapper extends EntityMapper<LearningCompetenceDTO, LearningCompetence> {
    @Mapping(target = "trainingProgram", source = "trainingProgram", qualifiedByName = "trainingProgramId")
    LearningCompetenceDTO toDto(LearningCompetence s);

    @Named("trainingProgramId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    TrainingProgramDTO toDtoTrainingProgramId(TrainingProgram trainingProgram);
}
