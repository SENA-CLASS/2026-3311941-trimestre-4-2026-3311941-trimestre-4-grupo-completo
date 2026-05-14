package com.mycompany.project_yml.domain;

import jakarta.annotation.Nonnull;
import jakarta.validation.constraints.Size;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serial;
import java.io.Serializable;

@Document(collection = "cliente")
@CompoundIndex(
        name = "idx_unique_cliente",
        def = "{'numero_documento': 1, 'tipo_documento': 1}",
        unique = true
)
public class Cliente implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Nonnull
    @Size(max = 50)
    @Field("numero_documento")
    private String numeroDocumento;

    @Nonnull
    @Size(max = 50)
    @Field("primer_nombre")
    private String primerNombre;

    @Size(max = 50)
    @Field("segundo_nombre")
    private String segundoNombre;

    @Nonnull
    @Size(max = 50)
    @Field("primer_apellido")
    private String primerApellido;

    @Size(max = 50)
    @Field("segundo_apellido")
    private String segundoApelligo;

    @Field("tipo_documento")
    private TipoDocumentoEmbedded tipoDocumentoEmbedded;

    @DocumentReference
    @Field("cuenta")
    private Cuenta cuenta;

    public Cliente(String id, @Nonnull String numeroDocumento, @Nonnull String primerNombre, String segundoNombre, @Nonnull String primerApellido, String segundoApelligo) {
        this.id = id;
        this.numeroDocumento = numeroDocumento;
        this.primerNombre = primerNombre;
        this.segundoNombre = segundoNombre;
        this.primerApellido = primerApellido;
        this.segundoApelligo = segundoApelligo;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Nonnull
    public String getNumeroDocumento() {
        return numeroDocumento;
    }

    public void setNumeroDocumento(@Nonnull String numeroDocumento) {
        this.numeroDocumento = numeroDocumento;
    }

    public String getPrimerNombre() {
        return primerNombre;
    }

    public void setPrimerNombre(String primerNombre) {
        this.primerNombre = primerNombre;
    }

    public String getSegundoNombre() {
        return segundoNombre;
    }

    public void setSegundoNombre(String segundoNombre) {
        this.segundoNombre = segundoNombre;
    }

    public String getPrimerApellido() {
        return primerApellido;
    }

    public void setPrimerApellido(String primerApellido) {
        this.primerApellido = primerApellido;
    }

    public String getSegundoApelligo() {
        return segundoApelligo;
    }

    public void setSegundoApelligo(String segundoApelligo) {
        this.segundoApelligo = segundoApelligo;
    }

    public TipoDocumentoEmbedded getTipoDocumentoEmbedded() {
        return tipoDocumentoEmbedded;
    }

    public void setTipoDocumentoEmbedded(TipoDocumentoEmbedded tipoDocumentoEmbedded) {
        this.tipoDocumentoEmbedded = tipoDocumentoEmbedded;
    }

    public Cuenta getCuenta() {
        return cuenta;
    }

    public void setCuenta(Cuenta cuenta) {
        this.cuenta = cuenta;
    }
}
