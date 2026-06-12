package co.edu.sena.service.mapper;

import co.edu.sena.domain.Day;
import co.edu.sena.domain.InstructorWorkingDay;
import co.edu.sena.domain.WorkingDay;
import co.edu.sena.service.dto.DayDTO;
import co.edu.sena.service.dto.InstructorWorkingDayDTO;
import co.edu.sena.service.dto.WorkingDayDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link WorkingDay} and its DTO {@link WorkingDayDTO}.
 */
@Mapper(componentModel = "spring")
public interface WorkingDayMapper extends EntityMapper<WorkingDayDTO, WorkingDay> {
    @Mapping(target = "instructorWorkingDay", source = "instructorWorkingDay", qualifiedByName = "instructorWorkingDayNameWorkingDay")
    @Mapping(target = "day", source = "day", qualifiedByName = "dayDayName")
    WorkingDayDTO toDto(WorkingDay s);

    @Named("instructorWorkingDayNameWorkingDay")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "nameWorkingDay", source = "nameWorkingDay")
    InstructorWorkingDayDTO toDtoInstructorWorkingDayNameWorkingDay(InstructorWorkingDay instructorWorkingDay);

    @Named("dayDayName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "dayName", source = "dayName")
    DayDTO toDtoDayDayName(Day day);
}
