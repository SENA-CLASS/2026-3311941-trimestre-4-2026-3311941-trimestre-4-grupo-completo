package co.edu.sena.service.mapper;

import co.edu.sena.domain.CourseTrimester;
import co.edu.sena.domain.LearningResult;
import co.edu.sena.domain.Planning;
import co.edu.sena.domain.ViewedResult;
import co.edu.sena.service.dto.CourseTrimesterDTO;
import co.edu.sena.service.dto.LearningResultDTO;
import co.edu.sena.service.dto.PlanningDTO;
import co.edu.sena.service.dto.ViewedResultDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ViewedResult} and its DTO {@link ViewedResultDTO}.
 */
@Mapper(componentModel = "spring")
public interface ViewedResultMapper extends EntityMapper<ViewedResultDTO, ViewedResult> {
    @Mapping(target = "courseTrimester", source = "courseTrimester", qualifiedByName = "courseTrimesterId")
    @Mapping(target = "planning", source = "planning", qualifiedByName = "planningPlanningCode")
    @Mapping(target = "learningResult", source = "learningResult", qualifiedByName = "learningResultId")
    ViewedResultDTO toDto(ViewedResult s);

    @Named("courseTrimesterId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CourseTrimesterDTO toDtoCourseTrimesterId(CourseTrimester courseTrimester);

    @Named("planningPlanningCode")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "planningCode", source = "planningCode")
    PlanningDTO toDtoPlanningPlanningCode(Planning planning);

    @Named("learningResultId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    LearningResultDTO toDtoLearningResultId(LearningResult learningResult);
}
