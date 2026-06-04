package co.edu.sena.clases.tema34;

import java.util.HashSet;
import java.util.Set;

public class TipoDocumento {
    private int id;
    private String sigla;
    private String nombreDocumento;
    private String estado;

    private Set<Cuenta> cuentas = new HashSet<>();

    public TipoDocumento(int id, String sigla, String nombreDocumento, String estado) {
        this.id = id;
        this.sigla = sigla;
        this.nombreDocumento = nombreDocumento;
        this.estado = estado;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
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

    public Set<Cuenta> getCuentas() {
        return cuentas;
    }

    public void setCuentas(Set<Cuenta> cuentas) {
        this.cuentas = cuentas;
    }

    @Override
    public final boolean equals(Object o) {
        if (!(o instanceof TipoDocumento that)) return false;

        return id == that.id;
    }

    @Override
    public int hashCode() {
        return id;
    }

    @Override
    public String toString() {
        return "TipoDocumento{" +
                "id=" + id +
                ", sigla='" + sigla + '\'' +
                ", nombreDocumento='" + nombreDocumento + '\'' +
                ", estado='" + estado + '\'' +
                '}';
    }
}
