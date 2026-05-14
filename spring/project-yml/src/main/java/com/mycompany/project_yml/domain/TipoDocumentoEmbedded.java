package com.mycompany.project_yml.domain;

import java.io.Serial;
import java.io.Serializable;

public class TipoDocumentoEmbedded implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private String sigla;
    private String nombreDocumento;

    public TipoDocumentoEmbedded(String sigla, String nombreDocumento) {
        this.sigla = sigla;
        this.nombreDocumento = nombreDocumento;
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
}
