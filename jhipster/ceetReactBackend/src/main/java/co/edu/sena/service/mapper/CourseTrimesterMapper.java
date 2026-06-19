package co.edu.sena.service.mapper;

import co.edu.sena.domain.Course;
import co.edu.sena.domain.CourseTrimester;
import co.edu.sena.domain.Trimester;
import co.edu.sena.service.dto.CourseDTO;
import co.edu.sena.service.dto.CourseTrimesterDTO;
import co.edu.sena.service.dto.TrimesterDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link CourseTrimester} and its DTO {@link CourseTrimesterDTO}.
 */
@Mapper(componentModel = "spring")
public interface CourseTrimesterMapper extends EntityMapper<CourseTrimesterDTO, CourseTrimester> {
    @Mapping(target = "course", source = "course", qualifiedByName = "courseCourseNumber")
    @Mapping(target = "trimester", source = "trimester", qualifiedByName = "trimesterId")
    CourseTrimesterDTO toDto(CourseTrimester s);

    @Named("courseCourseNumber")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "courseNumber", source = "courseNumber")
    CourseDTO toDtoCourseCourseNumber(Course course);

    @Named("trimesterId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    TrimesterDTO toDtoTrimesterId(Trimester trimester);
}
