package co.edu.sena.clases.tema27;

public class App {
    public static void main(String[] args) {
        int a= 10;
        System.out.println(a);
        Integer aa = a; // Boxing, el proceso de convertir un tipo primitivo a su clase envolvente
        System.out.println(aa);

        Float bb = 7.8f;
        System.out.println(bb);
        float b = bb;// Unboxing, el proceso de convertir una clase envolvente a su tipo primitivo
        System.out.println(b);


        Botella botella = new Botella("plastico");
        System.out.println(botella.getMaterial());

        Botella botella1 = botella;

        botella.setMaterial("vidrio");

        System.out.println(botella.getMaterial());
        System.out.println(botella1.getMaterial());

        System.out.println(botella.hashCode());
        System.out.println(botella1.hashCode());

        String texto1 = new String("hola mundo");
        String texto2 = new String("hola mundo");

        System.out.println(texto1.hashCode());
        System.out.println(texto2.hashCode());

        Cliente cliente = new Cliente(1, "juan", "perez", "juan@gmail.com");
        System.out.println(cliente.hashCode());

        Usuario usuario = new Usuario(1, "juan", "perez", "juan@gmail.com");
        System.out.println(usuario.hashCode());



        if(cliente.equals(usuario)) {
            System.out.println("son iguales");
        }else{
            System.out.println("son diferentes");
        }

        Usuario usuario1 = new Usuario(1, "juan", "perez", "juan@gmail.com");

        System.out.println("hash de usuario: "+usuario.hashCode());
        System.out.println("hash de usuario1: "+usuario1.hashCode());

         if(usuario.equals(usuario1)) {
            System.out.println("son iguales");
        }else {
             System.out.println("son diferentes");
         }





    }


}
