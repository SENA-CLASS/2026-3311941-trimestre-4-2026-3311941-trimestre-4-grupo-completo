package com.mycompany.ejemplo04.service.mapper;

import com.mycompany.ejemplo04.domain.Cuenta;
import com.mycompany.ejemplo04.domain.TipoDocumento;
import com.mycompany.ejemplo04.domain.User;
import com.mycompany.ejemplo04.service.dto.CuentaDTO;
import com.mycompany.ejemplo04.service.dto.TipoDocumentoDTO;
import com.mycompany.ejemplo04.service.dto.UserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Cuenta} and its DTO {@link CuentaDTO}.
 */
@Mapper(componentModel = "spring")
public interface CuentaMapper extends EntityMapper<CuentaDTO, Cuenta> {
    @Mapping(target = "user", source = "user", qualifiedByName = "userLogin")
    @Mapping(target = "tipoDocumento", source = "tipoDocumento", qualifiedByName = "tipoDocumentoNombreDocumento")
    CuentaDTO toDto(Cuenta s);

    @Named("userLogin")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "login", source = "login")
    UserDTO toDtoUserLogin(User user);

    @Named("tipoDocumentoNombreDocumento")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "nombreDocumento", source = "nombreDocumento")
    TipoDocumentoDTO toDtoTipoDocumentoNombreDocumento(TipoDocumento tipoDocumento);
}
