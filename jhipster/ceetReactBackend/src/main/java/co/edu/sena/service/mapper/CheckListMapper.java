package co.edu.sena.service.mapper;

import co.edu.sena.domain.CheckList;
import co.edu.sena.domain.TrainingProgram;
import co.edu.sena.service.dto.CheckListDTO;
import co.edu.sena.service.dto.TrainingProgramDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link CheckList} and its DTO {@link CheckListDTO}.
 */
@Mapper(componentModel = "spring")
public interface CheckListMapper extends EntityMapper<CheckListDTO, CheckList> {
    @Mapping(target = "trainingProgram", source = "trainingProgram", qualifiedByName = "trainingProgramId")
    CheckListDTO toDto(CheckList s);

    @Named("trainingProgramId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    TrainingProgramDTO toDtoTrainingProgramId(TrainingProgram trainingProgram);
}
