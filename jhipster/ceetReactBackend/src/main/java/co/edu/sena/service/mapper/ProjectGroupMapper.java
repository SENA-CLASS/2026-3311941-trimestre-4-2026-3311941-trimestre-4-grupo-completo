package co.edu.sena.service.mapper;

import co.edu.sena.domain.Course;
import co.edu.sena.domain.ProjectGroup;
import co.edu.sena.service.dto.CourseDTO;
import co.edu.sena.service.dto.ProjectGroupDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ProjectGroup} and its DTO {@link ProjectGroupDTO}.
 */
@Mapper(componentModel = "spring")
public interface ProjectGroupMapper extends EntityMapper<ProjectGroupDTO, ProjectGroup> {
    @Mapping(target = "course", source = "course", qualifiedByName = "courseCourseNumber")
    ProjectGroupDTO toDto(ProjectGroup s);

    @Named("courseCourseNumber")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "courseNumber", source = "courseNumber")
    CourseDTO toDtoCourseCourseNumber(Course course);
}
