package com.mycompany.ejemplo04.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mycompany.ejemplo04.domain.enumeration.Estado;
import jakarta.validation.constraints.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A TipoDocumento.
 */
@Document(collection = "tipo_documento")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TipoDocumento implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Size(max = 20)
    @Field("sigla")
    private String sigla;

    @NotNull
    @Size(max = 100)
    @Field("nombre_documento")
    private String nombreDocumento;

    @NotNull
    @Field("estado")
    private Estado estado;

    @DBRef
    @Field("cuenta")
    @JsonIgnoreProperties(value = { "user", "tipoDocumento" }, allowSetters = true)
    private Set<Cuenta> cuentas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public TipoDocumento id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSigla() {
        return this.sigla;
    }

    public TipoDocumento sigla(String sigla) {
        this.setSigla(sigla);
        return this;
    }

    public void setSigla(String sigla) {
        this.sigla = sigla;
    }

    public String getNombreDocumento() {
        return this.nombreDocumento;
    }

    public TipoDocumento nombreDocumento(String nombreDocumento) {
        this.setNombreDocumento(nombreDocumento);
        return this;
    }

    public void setNombreDocumento(String nombreDocumento) {
        this.nombreDocumento = nombreDocumento;
    }

    public Estado getEstado() {
        return this.estado;
    }

    public TipoDocumento estado(Estado estado) {
        this.setEstado(estado);
        return this;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public Set<Cuenta> getCuentas() {
        return this.cuentas;
    }

    public void setCuentas(Set<Cuenta> cuentas) {
        if (this.cuentas != null) {
            this.cuentas.forEach(i -> i.setTipoDocumento(null));
        }
        if (cuentas != null) {
            cuentas.forEach(i -> i.setTipoDocumento(this));
        }
        this.cuentas = cuentas;
    }

    public TipoDocumento cuentas(Set<Cuenta> cuentas) {
        this.setCuentas(cuentas);
        return this;
    }

    public TipoDocumento addCuenta(Cuenta cuenta) {
        this.cuentas.add(cuenta);
        cuenta.setTipoDocumento(this);
        return this;
    }

    public TipoDocumento removeCuenta(Cuenta cuenta) {
        this.cuentas.remove(cuenta);
        cuenta.setTipoDocumento(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoDocumento)) {
            return false;
        }
        return getId() != null && getId().equals(((TipoDocumento) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TipoDocumento{" +
            "id=" + getId() +
            ", sigla='" + getSigla() + "'" +
            ", nombreDocumento='" + getNombreDocumento() + "'" +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}
