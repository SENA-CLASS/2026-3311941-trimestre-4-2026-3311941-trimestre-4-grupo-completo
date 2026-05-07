package co.edu.sena.clases.tema30.statics;

public class App {
    public static void main(String[] args) {
        Clase01.Clase02 objetoClase02 = new Clase01.Clase02();
        System.out.println("Objeto de la clase 02: " + objetoClase02);
        System.out.println("nombre simple de la clase a la cual pertenece este objeto es: " + objetoClase02.getClass().getSimpleName());

        Televisor televisorBuilder = Televisor.Builder
                .aTelevisor()
                .withMarca("sony")
                .withAnio(2026)
                .withTamanio(24)
                .build();

        System.out.println("Televisor: " + televisorBuilder);
        System.out.println(televisorBuilder.getMarca());

        Impresora impresora = Impresora.builder()
                .marca("HP")
                .tipoTinta("Tinta")
                .id(1)
                .build();

        System.out.println(impresora.getId());
        System.out.println(impresora.getMarca());

        Impresora e = new Impresora(1, "epson", "pirata");
        System.out.println(e.getId());
        System.out.println(e.getMarca());
        System.out.println(e.getTipoTinta());


    }
}
