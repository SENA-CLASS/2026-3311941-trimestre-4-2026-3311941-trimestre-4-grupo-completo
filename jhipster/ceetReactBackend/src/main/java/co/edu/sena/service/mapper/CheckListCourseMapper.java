package co.edu.sena.service.mapper;

import co.edu.sena.domain.CheckList;
import co.edu.sena.domain.CheckListCourse;
import co.edu.sena.domain.Course;
import co.edu.sena.service.dto.CheckListCourseDTO;
import co.edu.sena.service.dto.CheckListDTO;
import co.edu.sena.service.dto.CourseDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link CheckListCourse} and its DTO {@link CheckListCourseDTO}.
 */
@Mapper(componentModel = "spring")
public interface CheckListCourseMapper extends EntityMapper<CheckListCourseDTO, CheckListCourse> {
    @Mapping(target = "course", source = "course", qualifiedByName = "courseId")
    @Mapping(target = "checkList", source = "checkList", qualifiedByName = "checkListId")
    CheckListCourseDTO toDto(CheckListCourse s);

    @Named("courseId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CourseDTO toDtoCourseId(Course course);

    @Named("checkListId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CheckListDTO toDtoCheckListId(CheckList checkList);
}
