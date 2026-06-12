package co.edu.sena.service.mapper;

import co.edu.sena.domain.BondingInstructor;
import co.edu.sena.domain.BoundingSchedule;
import co.edu.sena.domain.InstructorWorkingDay;
import co.edu.sena.service.dto.BondingInstructorDTO;
import co.edu.sena.service.dto.BoundingScheduleDTO;
import co.edu.sena.service.dto.InstructorWorkingDayDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link BoundingSchedule} and its DTO {@link BoundingScheduleDTO}.
 */
@Mapper(componentModel = "spring")
public interface BoundingScheduleMapper extends EntityMapper<BoundingScheduleDTO, BoundingSchedule> {
    @Mapping(target = "bondingInstructor", source = "bondingInstructor", qualifiedByName = "bondingInstructorId")
    @Mapping(target = "instructorWorkingDay", source = "instructorWorkingDay", qualifiedByName = "instructorWorkingDayId")
    BoundingScheduleDTO toDto(BoundingSchedule s);

    @Named("bondingInstructorId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    BondingInstructorDTO toDtoBondingInstructorId(BondingInstructor bondingInstructor);

    @Named("instructorWorkingDayId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    InstructorWorkingDayDTO toDtoInstructorWorkingDayId(InstructorWorkingDay instructorWorkingDay);
}
