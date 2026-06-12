package co.edu.sena.service.mapper;

import co.edu.sena.domain.Area;
import co.edu.sena.domain.AreaInstructor;
import co.edu.sena.domain.Instructor;
import co.edu.sena.service.dto.AreaDTO;
import co.edu.sena.service.dto.AreaInstructorDTO;
import co.edu.sena.service.dto.InstructorDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link AreaInstructor} and its DTO {@link AreaInstructorDTO}.
 */
@Mapper(componentModel = "spring")
public interface AreaInstructorMapper extends EntityMapper<AreaInstructorDTO, AreaInstructor> {
    @Mapping(target = "area", source = "area", qualifiedByName = "areaAreaName")
    @Mapping(target = "instructor", source = "instructor", qualifiedByName = "instructorId")
    AreaInstructorDTO toDto(AreaInstructor s);

    @Named("areaAreaName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "areaName", source = "areaName")
    AreaDTO toDtoAreaAreaName(Area area);

    @Named("instructorId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    InstructorDTO toDtoInstructorId(Instructor instructor);
}
