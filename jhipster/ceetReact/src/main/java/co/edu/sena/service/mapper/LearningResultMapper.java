package co.edu.sena.service.mapper;

import co.edu.sena.domain.LearningCompetence;
import co.edu.sena.domain.LearningResult;
import co.edu.sena.service.dto.LearningCompetenceDTO;
import co.edu.sena.service.dto.LearningResultDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link LearningResult} and its DTO {@link LearningResultDTO}.
 */
@Mapper(componentModel = "spring")
public interface LearningResultMapper extends EntityMapper<LearningResultDTO, LearningResult> {
    @Mapping(target = "learningCompetence", source = "learningCompetence", qualifiedByName = "learningCompetenceId")
    LearningResultDTO toDto(LearningResult s);

    @Named("learningCompetenceId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    LearningCompetenceDTO toDtoLearningCompetenceId(LearningCompetence learningCompetence);
}
