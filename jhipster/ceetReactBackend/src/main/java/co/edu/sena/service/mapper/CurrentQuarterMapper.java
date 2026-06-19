package co.edu.sena.service.mapper;

import co.edu.sena.domain.CurrentQuarter;
import co.edu.sena.domain.Year;
import co.edu.sena.service.dto.CurrentQuarterDTO;
import co.edu.sena.service.dto.YearDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link CurrentQuarter} and its DTO {@link CurrentQuarterDTO}.
 */
@Mapper(componentModel = "spring")
public interface CurrentQuarterMapper extends EntityMapper<CurrentQuarterDTO, CurrentQuarter> {
    @Mapping(target = "year", source = "year", qualifiedByName = "yearYearNumber")
    CurrentQuarterDTO toDto(CurrentQuarter s);

    @Named("yearYearNumber")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "yearNumber", source = "yearNumber")
    YearDTO toDtoYearYearNumber(Year year);
}
