package co.edu.sena.service.mapper;

import co.edu.sena.domain.LevelEducation;
import co.edu.sena.service.dto.LevelEducationDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link LevelEducation} and its DTO {@link LevelEducationDTO}.
 */
@Mapper(componentModel = "spring")
public interface LevelEducationMapper extends EntityMapper<LevelEducationDTO, LevelEducation> {}
