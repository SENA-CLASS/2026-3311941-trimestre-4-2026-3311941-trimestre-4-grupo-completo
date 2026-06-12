package co.edu.sena.service.mapper;

import co.edu.sena.domain.Course;
import co.edu.sena.domain.CoursePlanning;
import co.edu.sena.domain.Planning;
import co.edu.sena.service.dto.CourseDTO;
import co.edu.sena.service.dto.CoursePlanningDTO;
import co.edu.sena.service.dto.PlanningDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link CoursePlanning} and its DTO {@link CoursePlanningDTO}.
 */
@Mapper(componentModel = "spring")
public interface CoursePlanningMapper extends EntityMapper<CoursePlanningDTO, CoursePlanning> {
    @Mapping(target = "course", source = "course", qualifiedByName = "courseCourseNumber")
    @Mapping(target = "planning", source = "planning", qualifiedByName = "planningPlanningCode")
    CoursePlanningDTO toDto(CoursePlanning s);

    @Named("courseCourseNumber")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "courseNumber", source = "courseNumber")
    CourseDTO toDtoCourseCourseNumber(Course course);

    @Named("planningPlanningCode")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "planningCode", source = "planningCode")
    PlanningDTO toDtoPlanningPlanningCode(Planning planning);
}
