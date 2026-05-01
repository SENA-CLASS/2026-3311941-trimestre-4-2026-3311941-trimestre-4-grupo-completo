package co.edu.sena.clases.tema28;

public class App {
    public static void main(String[] args) {
        Humano humano = new Humano();
        humano.hablar();
        humano.ver();
        humano.escuchar();
        humano.caminar();
        humano.usarSillaRuedas();


        Sordo humano1 = new Humano();
        humano1.hablar();
        humano1.ver();
        humano1.caminar();
        humano1.usarSillaRuedas();

        Ciego ciego = new Humano();
        ciego.escuchar();
        ciego.hablar();
        ciego.caminar();
        ciego.usarSillaRuedas();

        Invalido invalido = new Humano();
        invalido.escuchar();
        invalido.ver();
        invalido.hablar();
        invalido.respirar();
        invalido.usarSillaRuedas();


        Mudo mudo = new Humano();
        mudo.escuchar();
        mudo.ver();
        mudo.caminar();
        mudo.usarSillaRuedas();

        SordoMudo sordoMudo = new Humano();
        sordoMudo.caminar();
        sordoMudo.ver();
        sordoMudo.respirar();
        sordoMudo.usarSillaRuedas();









    }

    public static void funcionesHumano(InterfaceHumano i){
        System.out.println("Funciones del humano");

    }
}
