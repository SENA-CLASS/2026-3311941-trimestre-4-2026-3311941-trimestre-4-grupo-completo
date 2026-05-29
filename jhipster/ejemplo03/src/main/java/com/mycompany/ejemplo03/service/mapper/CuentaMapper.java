package com.mycompany.ejemplo03.service.mapper;

import com.mycompany.ejemplo03.domain.Cuenta;
import com.mycompany.ejemplo03.domain.TipoDocumento;
import com.mycompany.ejemplo03.domain.User;
import com.mycompany.ejemplo03.service.dto.CuentaDTO;
import com.mycompany.ejemplo03.service.dto.TipoDocumentoDTO;
import com.mycompany.ejemplo03.service.dto.UserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Cuenta} and its DTO {@link CuentaDTO}.
 */
@Mapper(componentModel = "spring")
public interface CuentaMapper extends EntityMapper<CuentaDTO, Cuenta> {
    @Mapping(target = "tipoDocumento", source = "tipoDocumento", qualifiedByName = "tipoDocumentoNombreDocumento")
    @Mapping(target = "user", source = "user", qualifiedByName = "userLogin")
    CuentaDTO toDto(Cuenta s);

    @Named("tipoDocumentoNombreDocumento")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "nombreDocumento", source = "nombreDocumento")
    TipoDocumentoDTO toDtoTipoDocumentoNombreDocumento(TipoDocumento tipoDocumento);

    @Named("userLogin")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "login", source = "login")
    UserDTO toDtoUserLogin(User user);
}
