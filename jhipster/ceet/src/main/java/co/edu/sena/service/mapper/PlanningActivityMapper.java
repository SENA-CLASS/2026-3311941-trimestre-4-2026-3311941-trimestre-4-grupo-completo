package co.edu.sena.service.mapper;

import co.edu.sena.domain.PlanningActivity;
import co.edu.sena.domain.ProjectActivity;
import co.edu.sena.domain.QuarterSchedule;
import co.edu.sena.service.dto.PlanningActivityDTO;
import co.edu.sena.service.dto.ProjectActivityDTO;
import co.edu.sena.service.dto.QuarterScheduleDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link PlanningActivity} and its DTO {@link PlanningActivityDTO}.
 */
@Mapper(componentModel = "spring")
public interface PlanningActivityMapper extends EntityMapper<PlanningActivityDTO, PlanningActivity> {
    @Mapping(target = "quarterSchedule", source = "quarterSchedule", qualifiedByName = "quarterScheduleId")
    @Mapping(target = "projectActivity", source = "projectActivity", qualifiedByName = "projectActivityId")
    PlanningActivityDTO toDto(PlanningActivity s);

    @Named("quarterScheduleId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    QuarterScheduleDTO toDtoQuarterScheduleId(QuarterSchedule quarterSchedule);

    @Named("projectActivityId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ProjectActivityDTO toDtoProjectActivityId(ProjectActivity projectActivity);
}
