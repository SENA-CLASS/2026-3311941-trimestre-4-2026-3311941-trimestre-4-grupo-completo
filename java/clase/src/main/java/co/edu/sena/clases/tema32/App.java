package co.edu.sena.clases.tema32;

public class App {
    public static void main(String[] args) {
        Control controlSony = new Control() {
            @Override
            public void encender() {
                System.out.println("Encendiendo TV Sony");
            }

            @Override
            public void apagar() {
                System.out.println("Apagando TV Sony");
            }

            @Override
            public void subirVolumen() {
                System.out.println("Subiendo volumen TV Sony");
            }

            @Override
            public void bajarVolumen() {
                System.out.println("Bajando volumen TV Sony");
            }

            @Override
            public void subirCanal() {
                System.out.println("Subiendo canal TV Sony");
            }

            @Override
            public void bajarCanal() {
                System.out.println("Bajando canal TV Sony");
            }
        };

        System.out.println(controlSony);


    }
}
