package co.edu.sena.service.mapper;

import co.edu.sena.domain.Planning;
import co.edu.sena.service.dto.PlanningDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Planning} and its DTO {@link PlanningDTO}.
 */
@Mapper(componentModel = "spring")
public interface PlanningMapper extends EntityMapper<PlanningDTO, Planning> {}
