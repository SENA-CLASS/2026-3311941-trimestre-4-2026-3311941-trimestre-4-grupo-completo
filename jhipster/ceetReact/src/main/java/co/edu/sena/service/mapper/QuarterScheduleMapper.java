package co.edu.sena.service.mapper;

import co.edu.sena.domain.LearningResult;
import co.edu.sena.domain.Planning;
import co.edu.sena.domain.QuarterSchedule;
import co.edu.sena.domain.Trimester;
import co.edu.sena.service.dto.LearningResultDTO;
import co.edu.sena.service.dto.PlanningDTO;
import co.edu.sena.service.dto.QuarterScheduleDTO;
import co.edu.sena.service.dto.TrimesterDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link QuarterSchedule} and its DTO {@link QuarterScheduleDTO}.
 */
@Mapper(componentModel = "spring")
public interface QuarterScheduleMapper extends EntityMapper<QuarterScheduleDTO, QuarterSchedule> {
    @Mapping(target = "learningResult", source = "learningResult", qualifiedByName = "learningResultId")
    @Mapping(target = "planning", source = "planning", qualifiedByName = "planningPlanningCode")
    @Mapping(target = "trimester", source = "trimester", qualifiedByName = "trimesterId")
    QuarterScheduleDTO toDto(QuarterSchedule s);

    @Named("learningResultId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    LearningResultDTO toDtoLearningResultId(LearningResult learningResult);

    @Named("planningPlanningCode")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "planningCode", source = "planningCode")
    PlanningDTO toDtoPlanningPlanningCode(Planning planning);

    @Named("trimesterId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    TrimesterDTO toDtoTrimesterId(Trimester trimester);
}
