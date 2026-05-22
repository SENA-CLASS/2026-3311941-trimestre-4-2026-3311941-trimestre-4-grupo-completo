package com.mycompany.project_yml.service.dto;

import com.mycompany.project_yml.domain.enumeration.Estado;

import java.io.Serial;
import java.io.Serializable;

public class TipoDocumentoDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private String id;
    private String sigla;
    private String nombreDocumento;
    private Estado estado;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSigla() {
        return sigla;
    }

    public void setSigla(String sigla) {
        this.sigla = sigla;
    }

    public String getNombreDocumento() {
        return nombreDocumento;
    }

    public void setNombreDocumento(String nombreDocumento) {
        this.nombreDocumento = nombreDocumento;
    }

    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }
}
