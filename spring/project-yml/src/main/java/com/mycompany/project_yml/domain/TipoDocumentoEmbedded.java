package com.mycompany.project_yml.domain;

public class TipoDocumentoEmbedded {
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
