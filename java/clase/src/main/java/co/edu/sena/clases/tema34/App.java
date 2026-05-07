package co.edu.sena.clases.tema34;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class App {
    public static void main(String[] args) {
        List<String> lista = new ArrayList<>();
        lista.add("juan");
        lista.add("carlos");
        lista.add("maria");
        lista.add("juan");

        for (String nombre: lista){// for each
            System.out.println(nombre);
        }
        System.out.println("-----------------------------");
        Set<String> conjunto = new HashSet<>();
        conjunto.add("juan");
        conjunto.add("carlos");
        conjunto.add("maria");
        conjunto.add("Juan");

        for(String nombre: conjunto){
            System.out.println(nombre);
        }


        List<Usuario> listaUsuarios = new ArrayList<>();
        listaUsuarios.add(new Usuario(1, "juan", "123@gmail.com","dfghbn"));
        listaUsuarios.add(new Usuario(1, "juan", "123@gmail.com","dfghbn"));
        listaUsuarios.add(new Usuario(1, "juan", "123@gmail.com","dfghbn"));
        listaUsuarios.add(new Usuario(1, "juan", "123@gmail.com","dfghbn"));

        for (Usuario usuario: listaUsuarios){
            System.out.println(usuario);
        }
        System.out.println("-----------------------------");

        Set<Usuario> conjuntoUsuarios = new HashSet<>();
        conjuntoUsuarios.add(new Usuario(1, "juan", "123@gmail.com","dfghbn"));
        conjuntoUsuarios.add(new Usuario(1, "juan", "123@gmail.com","dfghbn"));
        conjuntoUsuarios.add(new Usuario(1, "juan", "123@gmail.com","dfghbn"));
        conjuntoUsuarios.add(new Usuario(1, "juan", "123@gmail.com","dfghbn"));
        conjuntoUsuarios.add(new Usuario(2, "juan", "123@gmail.com","dfghbn"));
        conjuntoUsuarios.add(new Usuario(1, "jose", "123@gmail.com","dfghbn"));


        for (Usuario usuario: conjuntoUsuarios){
            System.out.println(usuario);
        }

    }
}
