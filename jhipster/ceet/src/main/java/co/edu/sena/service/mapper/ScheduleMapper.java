package co.edu.sena.service.mapper;

import co.edu.sena.domain.Classroom;
import co.edu.sena.domain.CourseTrimester;
import co.edu.sena.domain.Day;
import co.edu.sena.domain.Instructor;
import co.edu.sena.domain.Modality;
import co.edu.sena.domain.Schedule;
import co.edu.sena.domain.ScheduleVersion;
import co.edu.sena.service.dto.ClassroomDTO;
import co.edu.sena.service.dto.CourseTrimesterDTO;
import co.edu.sena.service.dto.DayDTO;
import co.edu.sena.service.dto.InstructorDTO;
import co.edu.sena.service.dto.ModalityDTO;
import co.edu.sena.service.dto.ScheduleDTO;
import co.edu.sena.service.dto.ScheduleVersionDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Schedule} and its DTO {@link ScheduleDTO}.
 */
@Mapper(componentModel = "spring")
public interface ScheduleMapper extends EntityMapper<ScheduleDTO, Schedule> {
    @Mapping(target = "scheduleVersion", source = "scheduleVersion", qualifiedByName = "scheduleVersionId")
    @Mapping(target = "modality", source = "modality", qualifiedByName = "modalityModalityName")
    @Mapping(target = "day", source = "day", qualifiedByName = "dayDayName")
    @Mapping(target = "courseTrimester", source = "courseTrimester", qualifiedByName = "courseTrimesterId")
    @Mapping(target = "classroom", source = "classroom", qualifiedByName = "classroomId")
    @Mapping(target = "instructor", source = "instructor", qualifiedByName = "instructorId")
    ScheduleDTO toDto(Schedule s);

    @Named("scheduleVersionId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ScheduleVersionDTO toDtoScheduleVersionId(ScheduleVersion scheduleVersion);

    @Named("modalityModalityName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "modalityName", source = "modalityName")
    ModalityDTO toDtoModalityModalityName(Modality modality);

    @Named("dayDayName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "dayName", source = "dayName")
    DayDTO toDtoDayDayName(Day day);

    @Named("courseTrimesterId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CourseTrimesterDTO toDtoCourseTrimesterId(CourseTrimester courseTrimester);

    @Named("classroomId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ClassroomDTO toDtoClassroomId(Classroom classroom);

    @Named("instructorId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    InstructorDTO toDtoInstructorId(Instructor instructor);
}
