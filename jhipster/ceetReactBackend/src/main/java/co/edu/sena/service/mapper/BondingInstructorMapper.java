package co.edu.sena.service.mapper;

import co.edu.sena.domain.Bonding;
import co.edu.sena.domain.BondingInstructor;
import co.edu.sena.domain.Instructor;
import co.edu.sena.domain.Year;
import co.edu.sena.service.dto.BondingDTO;
import co.edu.sena.service.dto.BondingInstructorDTO;
import co.edu.sena.service.dto.InstructorDTO;
import co.edu.sena.service.dto.YearDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link BondingInstructor} and its DTO {@link BondingInstructorDTO}.
 */
@Mapper(componentModel = "spring")
public interface BondingInstructorMapper extends EntityMapper<BondingInstructorDTO, BondingInstructor> {
    @Mapping(target = "year", source = "year", qualifiedByName = "yearYearNumber")
    @Mapping(target = "instructor", source = "instructor", qualifiedByName = "instructorId")
    @Mapping(target = "bonding", source = "bonding", qualifiedByName = "bondingBondingType")
    BondingInstructorDTO toDto(BondingInstructor s);

    @Named("yearYearNumber")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "yearNumber", source = "yearNumber")
    YearDTO toDtoYearYearNumber(Year year);

    @Named("instructorId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    InstructorDTO toDtoInstructorId(Instructor instructor);

    @Named("bondingBondingType")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "bondingType", source = "bondingType")
    BondingDTO toDtoBondingBondingType(Bonding bonding);
}
