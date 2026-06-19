package co.edu.sena.service.mapper;

import co.edu.sena.domain.Customer;
import co.edu.sena.domain.Instructor;
import co.edu.sena.service.dto.CustomerDTO;
import co.edu.sena.service.dto.InstructorDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Instructor} and its DTO {@link InstructorDTO}.
 */
@Mapper(componentModel = "spring")
public interface InstructorMapper extends EntityMapper<InstructorDTO, Instructor> {
    @Mapping(target = "customer", source = "customer", qualifiedByName = "customerId")
    InstructorDTO toDto(Instructor s);

    @Named("customerId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CustomerDTO toDtoCustomerId(Customer customer);
}
