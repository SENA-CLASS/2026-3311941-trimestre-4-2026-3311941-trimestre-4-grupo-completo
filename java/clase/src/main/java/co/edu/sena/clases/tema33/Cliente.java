package co.edu.sena.clases.tema33;

public class Cliente {
    private int id; // llave sustituta o surrogate
    private String nombres;
    private String apellidos;
    private String email;// llave natural

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

        return id == cliente.id;
    }

    @Override
    public int hashCode() {
        return id;
    }
}
