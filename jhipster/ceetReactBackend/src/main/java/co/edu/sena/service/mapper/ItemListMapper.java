package co.edu.sena.service.mapper;

import co.edu.sena.domain.CheckList;
import co.edu.sena.domain.ItemList;
import co.edu.sena.domain.LearningResult;
import co.edu.sena.service.dto.CheckListDTO;
import co.edu.sena.service.dto.ItemListDTO;
import co.edu.sena.service.dto.LearningResultDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ItemList} and its DTO {@link ItemListDTO}.
 */
@Mapper(componentModel = "spring")
public interface ItemListMapper extends EntityMapper<ItemListDTO, ItemList> {
    @Mapping(target = "checkList", source = "checkList", qualifiedByName = "checkListListName")
    @Mapping(target = "learningResult", source = "learningResult", qualifiedByName = "learningResultId")
    ItemListDTO toDto(ItemList s);

    @Named("checkListListName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "listName", source = "listName")
    CheckListDTO toDtoCheckListListName(CheckList checkList);

    @Named("learningResultId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    LearningResultDTO toDtoLearningResultId(LearningResult learningResult);
}
