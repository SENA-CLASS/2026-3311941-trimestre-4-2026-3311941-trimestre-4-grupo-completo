package co.edu.sena.service.mapper;

import co.edu.sena.domain.Assessment;
import co.edu.sena.service.dto.AssessmentDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Assessment} and its DTO {@link AssessmentDTO}.
 */
@Mapper(componentModel = "spring")
public interface AssessmentMapper extends EntityMapper<AssessmentDTO, Assessment> {}
