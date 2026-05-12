package com.mycompany.project_yml.domain;

import jakarta.annotation.Nonnull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serial;
import java.io.Serializable;

@Document(collection = "tipo_documento") // esta anotaacoin indicando que clase va se un documento en mongo
public class TipoDocumento implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id // indica que este campo es el identificador unico del documento en mongo
    private String id;

    @Nonnull
    @Indexed(unique = true, name = "idx_unique_sigla") // crea un indice unico en mongo para este campo
    @Field("sigla")
    private String sigla;

    @Nonnull
    @Field("nombre_documento")
    @Indexed(unique = true, name = "idx_unique_nombre_documento")
    private String nombreDocumento;

    @Nonnull
    @Field("estado")
    private String estado;

    public TipoDocumento(String id, String sigla, String nombreDocumento, String estado) {
        this.id = id;
        this.sigla = sigla;
        this.nombreDocumento = nombreDocumento;
        this.estado = estado;
    }

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

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}
