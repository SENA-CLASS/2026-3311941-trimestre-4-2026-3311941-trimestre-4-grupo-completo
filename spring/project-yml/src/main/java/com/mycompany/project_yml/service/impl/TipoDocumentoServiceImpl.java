package com.mycompany.project_yml.service.impl;

import com.mycompany.project_yml.domain.TipoDocumento;
import com.mycompany.project_yml.repository.TipoDocumentoRepository;
import com.mycompany.project_yml.service.TipoDocumentoService;
import com.mycompany.project_yml.service.dto.TipoDocumentoDTO;
import com.mycompany.project_yml.service.mapper.TipoDocumentoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TipoDocumentoServiceImpl implements TipoDocumentoService {

    private final TipoDocumentoRepository tipoDocumentoRepository;

    private final TipoDocumentoMapper tipoDocumentoMapper;


    public TipoDocumentoServiceImpl(TipoDocumentoRepository tipoDocumentoRepository, TipoDocumentoMapper tipoDocumentoMapper) {
        this.tipoDocumentoRepository = tipoDocumentoRepository;
        this.tipoDocumentoMapper = tipoDocumentoMapper;
    }

    @Override
    public TipoDocumentoDTO save(TipoDocumentoDTO tipoDocumentoDTO){
        TipoDocumento tipoDocumento = tipoDocumentoRepository.insert(tipoDocumentoMapper.toEntity(tipoDocumentoDTO));
        return tipoDocumentoMapper.toDto(tipoDocumento);
    }

    @Override
    public TipoDocumentoDTO update(TipoDocumentoDTO tipoDocumentoDTO){
        TipoDocumento tipoDocumento = tipoDocumentoRepository.save(tipoDocumentoMapper.toEntity(tipoDocumentoDTO));
        return tipoDocumentoMapper.toDto(tipoDocumento);
    }

    @Override
    public Optional<TipoDocumentoDTO> findOne(String id){
        return tipoDocumentoRepository.findById(id).map(tipoDocumentoMapper::toDto);
    }

    @Override
    public List<TipoDocumentoDTO> findAll(){
        return tipoDocumentoRepository.findAll().stream().map(tipoDocumentoMapper::toDto).toList();
    }

    @Override
    public void delete(String id){
        tipoDocumentoRepository.deleteById(id);
    }
}
