package co.edu.sena.clases.tema13;

public class ConstanteFisica {
    public static final double VELOCIDAD_LUZ = 299792458; // metros por segundo
    public static final double GRAVEDAD_TIERRA = 9.81; // metros por segundo al cuadrado
    public static final double MASA_ELECTRON = 9.10938356e-31; // kilogramos

    private ConstanteFisica() {
        // bloqueando la construcción de objetos de esta clase
    }

    public static double calcularEnergia(double masa) {
        return masa * VELOCIDAD_LUZ * VELOCIDAD_LUZ; // E = mc^2
    }
}
