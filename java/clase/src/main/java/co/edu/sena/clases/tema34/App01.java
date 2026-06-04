package co.edu.sena.clases.tema34;

public class App01 {
    public static void main(String[] args) {
        TipoDocumento cedula = new TipoDocumento(1, "CC", "Cedula de ciudadania", "activo");
        TipoDocumento nit = new TipoDocumento(2, "NIT", "Numero de identificacion tributaria", "activo");

        Cuenta cuenta01 = new Cuenta(1, "123456789", "Perez", "Gomez", "Juan", "Carlos", cedula);
        cedula.getCuentas().add(cuenta01);

        System.out.println(cuenta01.toString());

    }
}
