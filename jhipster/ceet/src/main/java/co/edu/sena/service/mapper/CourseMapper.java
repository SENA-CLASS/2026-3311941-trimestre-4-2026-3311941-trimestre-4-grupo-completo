package co.edu.sena.service.mapper;

import co.edu.sena.domain.Course;
import co.edu.sena.domain.CourseStatus;
import co.edu.sena.domain.TrainingProgram;
import co.edu.sena.domain.WorkingDayCourse;
import co.edu.sena.service.dto.CourseDTO;
import co.edu.sena.service.dto.CourseStatusDTO;
import co.edu.sena.service.dto.TrainingProgramDTO;
import co.edu.sena.service.dto.WorkingDayCourseDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Course} and its DTO {@link CourseDTO}.
 */
@Mapper(componentModel = "spring")
public interface CourseMapper extends EntityMapper<CourseDTO, Course> {
    @Mapping(target = "courseStatus", source = "courseStatus", qualifiedByName = "courseStatusNameCourseStatus")
    @Mapping(target = "workingDayCourse", source = "workingDayCourse", qualifiedByName = "workingDayCourseWorkingDayName")
    @Mapping(target = "trainingProgram", source = "trainingProgram", qualifiedByName = "trainingProgramId")
    CourseDTO toDto(Course s);

    @Named("courseStatusNameCourseStatus")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "nameCourseStatus", source = "nameCourseStatus")
    CourseStatusDTO toDtoCourseStatusNameCourseStatus(CourseStatus courseStatus);

    @Named("workingDayCourseWorkingDayName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "workingDayName", source = "workingDayName")
    WorkingDayCourseDTO toDtoWorkingDayCourseWorkingDayName(WorkingDayCourse workingDayCourse);

    @Named("trainingProgramId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    TrainingProgramDTO toDtoTrainingProgramId(TrainingProgram trainingProgram);
}
