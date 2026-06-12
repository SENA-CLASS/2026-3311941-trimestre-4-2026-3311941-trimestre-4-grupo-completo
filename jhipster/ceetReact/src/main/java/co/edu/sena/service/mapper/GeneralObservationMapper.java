package co.edu.sena.service.mapper;

import co.edu.sena.domain.Customer;
import co.edu.sena.domain.GeneralObservation;
import co.edu.sena.domain.ProjectGroup;
import co.edu.sena.service.dto.CustomerDTO;
import co.edu.sena.service.dto.GeneralObservationDTO;
import co.edu.sena.service.dto.ProjectGroupDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link GeneralObservation} and its DTO {@link GeneralObservationDTO}.
 */
@Mapper(componentModel = "spring")
public interface GeneralObservationMapper extends EntityMapper<GeneralObservationDTO, GeneralObservation> {
    @Mapping(target = "projectGroup", source = "projectGroup", qualifiedByName = "projectGroupId")
    @Mapping(target = "customer", source = "customer", qualifiedByName = "customerId")
    GeneralObservationDTO toDto(GeneralObservation s);

    @Named("projectGroupId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ProjectGroupDTO toDtoProjectGroupId(ProjectGroup projectGroup);

    @Named("customerId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CustomerDTO toDtoCustomerId(Customer customer);
}
