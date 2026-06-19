package co.edu.sena.service.mapper;

import co.edu.sena.domain.ProjectActivity;
import co.edu.sena.domain.ProjectPhase;
import co.edu.sena.service.dto.ProjectActivityDTO;
import co.edu.sena.service.dto.ProjectPhaseDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ProjectActivity} and its DTO {@link ProjectActivityDTO}.
 */
@Mapper(componentModel = "spring")
public interface ProjectActivityMapper extends EntityMapper<ProjectActivityDTO, ProjectActivity> {
    @Mapping(target = "projectPhase", source = "projectPhase", qualifiedByName = "projectPhaseId")
    ProjectActivityDTO toDto(ProjectActivity s);

    @Named("projectPhaseId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ProjectPhaseDTO toDtoProjectPhaseId(ProjectPhase projectPhase);
}
