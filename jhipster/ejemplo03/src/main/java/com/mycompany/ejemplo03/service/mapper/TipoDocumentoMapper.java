package com.mycompany.ejemplo03.service.mapper;

import com.mycompany.ejemplo03.domain.TipoDocumento;
import com.mycompany.ejemplo03.service.dto.TipoDocumentoDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link TipoDocumento} and its DTO {@link TipoDocumentoDTO}.
 */
@Mapper(componentModel = "spring")
public interface TipoDocumentoMapper extends EntityMapper<TipoDocumentoDTO, TipoDocumento> {}
