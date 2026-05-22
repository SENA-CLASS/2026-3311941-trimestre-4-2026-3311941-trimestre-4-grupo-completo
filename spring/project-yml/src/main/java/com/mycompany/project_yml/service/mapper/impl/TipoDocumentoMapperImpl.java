package com.mycompany.project_yml.service.mapper.impl;

import com.mycompany.project_yml.domain.TipoDocumento;
import com.mycompany.project_yml.service.dto.TipoDocumentoDTO;
import com.mycompany.project_yml.service.mapper.TipoDocumentoMapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class TipoDocumentoMapperImpl implements TipoDocumentoMapper {

    public TipoDocumento toEntity(TipoDocumentoDTO tipoDocumentoDTO) {
        if (tipoDocumentoDTO == null) return null;
        TipoDocumento entity = new TipoDocumento();
        entity.setId(tipoDocumentoDTO.getId());
        entity.setSigla(tipoDocumentoDTO.getSigla());
        entity.setNombreDocumento(tipoDocumentoDTO.getNombreDocumento());
        entity.setEstado(tipoDocumentoDTO.getEstado());
        return entity;
    }

    public TipoDocumentoDTO toDto(TipoDocumento tipoDocumento){
        if(tipoDocumento == null) {
            return null;
        }
        TipoDocumentoDTO dto = new TipoDocumentoDTO();
        dto.setId(tipoDocumento.getId());
        dto.setSigla(tipoDocumento.getSigla());
        dto.setNombreDocumento(tipoDocumento.getNombreDocumento());
        dto.setEstado(tipoDocumento.getEstado());
        return dto;
    }

    public List<TipoDocumentoDTO> toDto(List<TipoDocumento> tipoDocumentos){
        if(tipoDocumentos == null) return null;
        List<TipoDocumentoDTO> dtos = new ArrayList<>();
        for(TipoDocumento tipoDocumento : tipoDocumentos){ // forecha
            dtos.add(toDto(tipoDocumento));
        }
        return dtos;
    }
}
