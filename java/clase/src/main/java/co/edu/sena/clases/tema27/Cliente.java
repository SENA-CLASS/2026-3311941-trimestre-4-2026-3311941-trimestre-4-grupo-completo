package co.edu.sena.clases.tema27;

import java.util.Objects;

public class Cliente {
    private int id;
    private String nombres;
    private String apellidos;
    private String email;

    public Cliente(int id, String nombres, String apellidos, String email) {
        this.id = id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.email = email;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public final boolean equals(Object o) {
        if (!(o instanceof Cliente cliente)) return false;

        return id == cliente.id && Objects.equals(nombres, cliente.nombres) && Objects.equals(apellidos, cliente.apellidos) && Objects.equals(email, cliente.email);
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + Objects.hashCode(nombres);
        result = 31 * result + Objects.hashCode(apellidos);
        result = 31 * result + Objects.hashCode(email);
        return result;
    }
}
