package com.mycompany.project_yml.service.mapper;

import com.mycompany.project_yml.domain.TipoDocumento;
import com.mycompany.project_yml.service.dto.TipoDocumentoDTO;

import java.util.List;

public interface TipoDocumentoMapper {
    TipoDocumento toEntity(TipoDocumentoDTO tipoDocumentoDTO);
    TipoDocumentoDTO toDto(TipoDocumento tipoDocumento);
    List<TipoDocumentoDTO> toDto(List<TipoDocumento> tipoDocumentos);
}
