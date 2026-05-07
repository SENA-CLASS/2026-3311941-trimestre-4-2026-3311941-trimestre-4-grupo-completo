package co.edu.sena.clases.tema30.inner;

public class App {
    public static void main(String[] args) {
        Clase01 clase01 = new Clase01();
        Clase01.Clase02 clase02 = clase01.new Clase02();
        Clase01.Clase02.Clase03 clase03 = clase02.new Clase03();


    }
}
