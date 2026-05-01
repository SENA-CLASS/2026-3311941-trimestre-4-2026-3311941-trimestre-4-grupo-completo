package co.edu.sena.clases.tema28;

public interface InterfaceHumano {
    default void respirar(){
        System.out.println("Respirando...");
    }

    void usarSillaRuedas();
}
