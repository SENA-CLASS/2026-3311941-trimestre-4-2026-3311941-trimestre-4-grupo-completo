package com.mycompany.project_yml.service;

import com.mycompany.project_yml.domain.TipoDocumento;
import com.mycompany.project_yml.service.dto.TipoDocumentoDTO;

import java.util.List;
import java.util.Optional;

public interface TipoDocumentoService {
    TipoDocumentoDTO save(TipoDocumentoDTO tipoDocumento);
    TipoDocumentoDTO update(TipoDocumentoDTO tipoDocumento);
    Optional<TipoDocumentoDTO> findOne(String id);
    List<TipoDocumentoDTO> findAll();
    void delete(String id);
}