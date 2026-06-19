package co.edu.sena.service.mapper;

import co.edu.sena.domain.WorkingDayCourse;
import co.edu.sena.service.dto.WorkingDayCourseDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link WorkingDayCourse} and its DTO {@link WorkingDayCourseDTO}.
 */
@Mapper(componentModel = "spring")
public interface WorkingDayCourseMapper extends EntityMapper<WorkingDayCourseDTO, WorkingDayCourse> {}
