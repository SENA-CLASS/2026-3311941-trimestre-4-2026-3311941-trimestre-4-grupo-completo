package co.edu.sena.service.mapper;

import co.edu.sena.domain.Project;
import co.edu.sena.domain.TrainingProgram;
import co.edu.sena.service.dto.ProjectDTO;
import co.edu.sena.service.dto.TrainingProgramDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Project} and its DTO {@link ProjectDTO}.
 */
@Mapper(componentModel = "spring")
public interface ProjectMapper extends EntityMapper<ProjectDTO, Project> {
    @Mapping(target = "trainingProgram", source = "trainingProgram", qualifiedByName = "trainingProgramId")
    ProjectDTO toDto(Project s);

    @Named("trainingProgramId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    TrainingProgramDTO toDtoTrainingProgramId(TrainingProgram trainingProgram);
}
