package co.edu.sena.service.mapper;

import co.edu.sena.domain.InstructorWorkingDay;
import co.edu.sena.service.dto.InstructorWorkingDayDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link InstructorWorkingDay} and its DTO {@link InstructorWorkingDayDTO}.
 */
@Mapper(componentModel = "spring")
public interface InstructorWorkingDayMapper extends EntityMapper<InstructorWorkingDayDTO, InstructorWorkingDay> {}
