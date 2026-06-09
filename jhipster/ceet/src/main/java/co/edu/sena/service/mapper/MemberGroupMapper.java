package co.edu.sena.service.mapper;

import co.edu.sena.domain.Apprentice;
import co.edu.sena.domain.MemberGroup;
import co.edu.sena.domain.ProjectGroup;
import co.edu.sena.service.dto.ApprenticeDTO;
import co.edu.sena.service.dto.MemberGroupDTO;
import co.edu.sena.service.dto.ProjectGroupDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link MemberGroup} and its DTO {@link MemberGroupDTO}.
 */
@Mapper(componentModel = "spring")
public interface MemberGroupMapper extends EntityMapper<MemberGroupDTO, MemberGroup> {
    @Mapping(target = "projectGroup", source = "projectGroup", qualifiedByName = "projectGroupId")
    @Mapping(target = "apprentice", source = "apprentice", qualifiedByName = "apprenticeId")
    MemberGroupDTO toDto(MemberGroup s);

    @Named("projectGroupId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ProjectGroupDTO toDtoProjectGroupId(ProjectGroup projectGroup);

    @Named("apprenticeId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ApprenticeDTO toDtoApprenticeId(Apprentice apprentice);
}
