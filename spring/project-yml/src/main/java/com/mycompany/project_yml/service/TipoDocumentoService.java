package com.mycompany.project_yml.service;

import com.mycompany.project_yml.domain.TipoDocumento;

import java.util.List;
import java.util.Optional;

public interface TipoDocumentoService {
    TipoDocumento save(TipoDocumento tipoDocumento);
    TipoDocumento update(TipoDocumento tipoDocumento);
    Optional<TipoDocumento> findOne(String id);
    List<TipoDocumento> findAll();
    void delete(String id);
}
