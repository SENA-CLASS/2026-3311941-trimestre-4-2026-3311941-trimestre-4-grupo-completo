package co.edu.sena.service.mapper;

import co.edu.sena.domain.LevelEducation;
import co.edu.sena.domain.Trimester;
import co.edu.sena.domain.WorkingDayCourse;
import co.edu.sena.service.dto.LevelEducationDTO;
import co.edu.sena.service.dto.TrimesterDTO;
import co.edu.sena.service.dto.WorkingDayCourseDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Trimester} and its DTO {@link TrimesterDTO}.
 */
@Mapper(componentModel = "spring")
public interface TrimesterMapper extends EntityMapper<TrimesterDTO, Trimester> {
    @Mapping(target = "workingDayCourse", source = "workingDayCourse", qualifiedByName = "workingDayCourseWorkingDayName")
    @Mapping(target = "levelEducations", source = "levelEducations", qualifiedByName = "levelEducationLevelName")
    TrimesterDTO toDto(Trimester s);

    @Named("workingDayCourseWorkingDayName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "workingDayName", source = "workingDayName")
    WorkingDayCourseDTO toDtoWorkingDayCourseWorkingDayName(WorkingDayCourse workingDayCourse);

    @Named("levelEducationLevelName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "levelName", source = "levelName")
    LevelEducationDTO toDtoLevelEducationLevelName(LevelEducation levelEducation);
}
