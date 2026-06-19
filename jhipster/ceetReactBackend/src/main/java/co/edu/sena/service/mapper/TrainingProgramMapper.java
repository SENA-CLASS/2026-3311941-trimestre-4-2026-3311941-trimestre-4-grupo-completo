package co.edu.sena.service.mapper;

import co.edu.sena.domain.LevelEducation;
import co.edu.sena.domain.TrainingProgram;
import co.edu.sena.service.dto.LevelEducationDTO;
import co.edu.sena.service.dto.TrainingProgramDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link TrainingProgram} and its DTO {@link TrainingProgramDTO}.
 */
@Mapper(componentModel = "spring")
public interface TrainingProgramMapper extends EntityMapper<TrainingProgramDTO, TrainingProgram> {
    @Mapping(target = "levelEducation", source = "levelEducation", qualifiedByName = "levelEducationLevelName")
    TrainingProgramDTO toDto(TrainingProgram s);

    @Named("levelEducationLevelName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "levelName", source = "levelName")
    LevelEducationDTO toDtoLevelEducationLevelName(LevelEducation levelEducation);
}
