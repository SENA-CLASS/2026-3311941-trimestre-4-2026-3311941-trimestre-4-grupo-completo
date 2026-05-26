package com.mycompany.project_yml.service.mapper;

import com.mycompany.project_yml.domain.TipoDocumento;
import com.mycompany.project_yml.service.dto.TipoDocumentoDTO;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TipoDocumentoMapper extends EntityMapper<TipoDocumentoDTO, TipoDocumento> {
}
