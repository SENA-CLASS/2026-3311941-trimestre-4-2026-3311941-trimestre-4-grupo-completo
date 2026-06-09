package co.edu.sena.service.mapper;

import co.edu.sena.domain.Assessment;
import co.edu.sena.domain.GroupResponse;
import co.edu.sena.domain.ItemList;
import co.edu.sena.domain.ProjectGroup;
import co.edu.sena.service.dto.AssessmentDTO;
import co.edu.sena.service.dto.GroupResponseDTO;
import co.edu.sena.service.dto.ItemListDTO;
import co.edu.sena.service.dto.ProjectGroupDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link GroupResponse} and its DTO {@link GroupResponseDTO}.
 */
@Mapper(componentModel = "spring")
public interface GroupResponseMapper extends EntityMapper<GroupResponseDTO, GroupResponse> {
    @Mapping(target = "projectGroup", source = "projectGroup", qualifiedByName = "projectGroupId")
    @Mapping(target = "assessment", source = "assessment", qualifiedByName = "assessmentAssessmentType")
    @Mapping(target = "itemList", source = "itemList", qualifiedByName = "itemListId")
    GroupResponseDTO toDto(GroupResponse s);

    @Named("projectGroupId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ProjectGroupDTO toDtoProjectGroupId(ProjectGroup projectGroup);

    @Named("assessmentAssessmentType")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "assessmentType", source = "assessmentType")
    AssessmentDTO toDtoAssessmentAssessmentType(Assessment assessment);

    @Named("itemListId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ItemListDTO toDtoItemListId(ItemList itemList);
}
