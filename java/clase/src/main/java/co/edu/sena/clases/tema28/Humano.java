package co.edu.sena.clases.tema28;

public class Humano implements Ciego, Sordo, Mudo, Invalido, SordoMudo {
    @Override
    public void hablar() {
        System.out.println("estoy hablando");
    }

    @Override
    public void escuchar() {
        System.out.println("Estoy escuchando");
    }

    @Override
    public void caminar() {
        System.out.println("Estoy caminando");
    }

    @Override
    public void ver() {
        System.out.println("Estoy viendo");
    }

    @Override
    public void usarSillaRuedas(){

    }


}
