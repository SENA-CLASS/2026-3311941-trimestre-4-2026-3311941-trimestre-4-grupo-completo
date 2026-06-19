package co.edu.sena.service.mapper;

import co.edu.sena.domain.Customer;
import co.edu.sena.domain.GroupResponse;
import co.edu.sena.domain.ObservationResponse;
import co.edu.sena.service.dto.CustomerDTO;
import co.edu.sena.service.dto.GroupResponseDTO;
import co.edu.sena.service.dto.ObservationResponseDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ObservationResponse} and its DTO {@link ObservationResponseDTO}.
 */
@Mapper(componentModel = "spring")
public interface ObservationResponseMapper extends EntityMapper<ObservationResponseDTO, ObservationResponse> {
    @Mapping(target = "groupResponse", source = "groupResponse", qualifiedByName = "groupResponseId")
    @Mapping(target = "customer", source = "customer", qualifiedByName = "customerId")
    ObservationResponseDTO toDto(ObservationResponse s);

    @Named("groupResponseId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    GroupResponseDTO toDtoGroupResponseId(GroupResponse groupResponse);

    @Named("customerId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CustomerDTO toDtoCustomerId(Customer customer);
}
