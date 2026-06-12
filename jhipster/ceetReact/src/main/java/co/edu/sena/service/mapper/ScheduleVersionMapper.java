package co.edu.sena.service.mapper;

import co.edu.sena.domain.CurrentQuarter;
import co.edu.sena.domain.ScheduleVersion;
import co.edu.sena.service.dto.CurrentQuarterDTO;
import co.edu.sena.service.dto.ScheduleVersionDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ScheduleVersion} and its DTO {@link ScheduleVersionDTO}.
 */
@Mapper(componentModel = "spring")
public interface ScheduleVersionMapper extends EntityMapper<ScheduleVersionDTO, ScheduleVersion> {
    @Mapping(target = "currentQuarter", source = "currentQuarter", qualifiedByName = "currentQuarterId")
    ScheduleVersionDTO toDto(ScheduleVersion s);

    @Named("currentQuarterId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CurrentQuarterDTO toDtoCurrentQuarterId(CurrentQuarter currentQuarter);
}
