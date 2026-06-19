package co.edu.sena.service.mapper;

import co.edu.sena.domain.Project;
import co.edu.sena.domain.ProjectPhase;
import co.edu.sena.service.dto.ProjectDTO;
import co.edu.sena.service.dto.ProjectPhaseDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ProjectPhase} and its DTO {@link ProjectPhaseDTO}.
 */
@Mapper(componentModel = "spring")
public interface ProjectPhaseMapper extends EntityMapper<ProjectPhaseDTO, ProjectPhase> {
    @Mapping(target = "project", source = "project", qualifiedByName = "projectProjectCode")
    ProjectPhaseDTO toDto(ProjectPhase s);

    @Named("projectProjectCode")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "projectCode", source = "projectCode")
    ProjectDTO toDtoProjectProjectCode(Project project);
}
