package co.edu.sena.service.mapper;

import co.edu.sena.domain.Classroom;
import co.edu.sena.domain.ClassroomLimitation;
import co.edu.sena.domain.LearningResult;
import co.edu.sena.service.dto.ClassroomDTO;
import co.edu.sena.service.dto.ClassroomLimitationDTO;
import co.edu.sena.service.dto.LearningResultDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ClassroomLimitation} and its DTO {@link ClassroomLimitationDTO}.
 */
@Mapper(componentModel = "spring")
public interface ClassroomLimitationMapper extends EntityMapper<ClassroomLimitationDTO, ClassroomLimitation> {
    @Mapping(target = "classroom", source = "classroom", qualifiedByName = "classroomId")
    @Mapping(target = "learningResult", source = "learningResult", qualifiedByName = "learningResultId")
    ClassroomLimitationDTO toDto(ClassroomLimitation s);

    @Named("classroomId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ClassroomDTO toDtoClassroomId(Classroom classroom);

    @Named("learningResultId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    LearningResultDTO toDtoLearningResultId(LearningResult learningResult);
}
