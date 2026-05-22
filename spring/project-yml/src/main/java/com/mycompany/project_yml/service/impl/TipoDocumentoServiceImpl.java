package com.mycompany.project_yml.service.impl;

import com.mycompany.project_yml.domain.TipoDocumento;
import com.mycompany.project_yml.repository.TipoDocumentoRepository;
import com.mycompany.project_yml.service.TipoDocumentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TipoDocumentoServiceImpl implements TipoDocumentoService {

    private final TipoDocumentoRepository tipoDocumentoRepository;

    public TipoDocumentoServiceImpl(TipoDocumentoRepository tipoDocumentoRepository) {
        this.tipoDocumentoRepository = tipoDocumentoRepository;
    }

    @Override
    public TipoDocumento save(TipoDocumento tipoDocumento){
        return tipoDocumentoRepository.insert(tipoDocumento);
    }

    public TipoDocumento update(TipoDocumento tipoDocumento){
        return tipoDocumentoRepository.save(tipoDocumento);
    }

    @Override
    public Optional<TipoDocumento> findOne(String id){
        return tipoDocumentoRepository.findById(id);
    }
}
