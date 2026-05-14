package com.mycompany.project_yml.domain;

import com.mycompany.project_yml.domain.enumeration.Estado;
import jakarta.annotation.Nonnull;
import jakarta.validation.constraints.Size;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serial;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Document(collection = "tipo_documento") // esta anotaacoin indicando que clase va se un documento en mongo
public class TipoDocumento implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id // indica que este campo es el identificador unico del documento en mongo
    private String id;

    @Nonnull
    @Indexed(unique = true, name = "idx_unique_sigla") // crea un indice unico en mongo para este campo
    @Field("sigla")
    @Size(max = 10)
    private String sigla;

    @Nonnull
    @Field("nombre_documento")
    @Size(max = 100)
    @Indexed(unique = true, name = "idx_unique_nombre_documento")
    private String nombreDocumento;

    @Nonnull
    @Field("estado")
    private Estado estado;

    @DBRef // indica que este campo es una referencia a otro documento en mongo
    @Field("clientes")
    private Set<Cliente> clientes = new HashSet<>();

    public TipoDocumento(String id, @Nonnull String sigla, @Nonnull String nombreDocumento, @Nonnull Estado estado) {
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

    @Nonnull
    public String getSigla() {
        return sigla;
    }

    public void setSigla(@Nonnull String sigla) {
        this.sigla = sigla;
    }

    @Nonnull
    public String getNombreDocumento() {
        return nombreDocumento;
    }

    public void setNombreDocumento(@Nonnull String nombreDocumento) {
        this.nombreDocumento = nombreDocumento;
    }

    @Nonnull
    public Estado getEstado() {
        return estado;
    }

    public void setEstado(@Nonnull Estado estado) {
        this.estado = estado;
    }

    @Override
    public final boolean equals(Object o) {
        if (!(o instanceof TipoDocumento that)) return false;

        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
