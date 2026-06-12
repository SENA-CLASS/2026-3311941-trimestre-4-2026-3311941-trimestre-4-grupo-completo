package co.edu.sena.service.mapper;

import co.edu.sena.domain.BondingCompetence;
import co.edu.sena.domain.BondingInstructor;
import co.edu.sena.domain.LearningCompetence;
import co.edu.sena.service.dto.BondingCompetenceDTO;
import co.edu.sena.service.dto.BondingInstructorDTO;
import co.edu.sena.service.dto.LearningCompetenceDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link BondingCompetence} and its DTO {@link BondingCompetenceDTO}.
 */
@Mapper(componentModel = "spring")
public interface BondingCompetenceMapper extends EntityMapper<BondingCompetenceDTO, BondingCompetence> {
    @Mapping(target = "bondingInstructor", source = "bondingInstructor", qualifiedByName = "bondingInstructorId")
    @Mapping(target = "learningCompetence", source = "learningCompetence", qualifiedByName = "learningCompetenceId")
    BondingCompetenceDTO toDto(BondingCompetence s);

    @Named("bondingInstructorId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    BondingInstructorDTO toDtoBondingInstructorId(BondingInstructor bondingInstructor);

    @Named("learningCompetenceId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    LearningCompetenceDTO toDtoLearningCompetenceId(LearningCompetence learningCompetence);
}
