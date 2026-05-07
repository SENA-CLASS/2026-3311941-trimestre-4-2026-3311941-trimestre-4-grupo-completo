# Conceptos de Programación Orientada a Objetos (POO)

1. Clase(abstractas, concretas) sustantivos singulares, UpperCamelCase
2. Objeto loweCamelCase
3. visibilidad(+ public, - private, ~package, #protected)
    Para los atributos y metodos es:
   - public: accesible desde cualquier parte del programa
   - private: accesible solo dentro de la clase donde se define
   - package (default): accesible solo dentro del mismo paquete
   - protected: accesible dentro de la misma clase, subclases y clases del mismo paquete
    Para las clases la visibilidad es:
   - public: accesible desde cualquier parte del programa
   - package (default): accesible solo dentro del mismo paquete
    Para las clases internas en ingles inner class:
   - public: accesible desde cualquier parte del programa
   - private: accesible solo dentro de la clase donde se define
   - protected: accesible dentro de la misma clase, subclases y clases del mismo paquete
   - package (default): accesible solo dentro del mismo paquete
4. Atributo(+ public, - private, ~package, #protected en java se llaman modificadores de acceso) puede primitivo o referencia,
5. Método(+ public, - private, ~package, #protected) acciones verbos,
6. encapsulamiento
    - encapsulamiento: ocultar los detalles de implementación de una clase y exponer solo lo necesario a través de métodos públicos.
7. métodos mutadores(setter) y accesores(getter)
    - mutadores (setters): métodos que permiten modificar el valor de un atributo.
    - accesores (getters): métodos que permiten obtener el valor de un atributo.
8. constructor: sirve para crear los objetos
9. constructor genérico esta de forma invisible a menos que se cree un constructor con parámetros
10. constructor con parametros: permite inicializar los atributos de un objeto al momento de su creación
11. sobrecarga de constructores (puede tener muchos constructores con firmas diferentes) polimorfismo estatico.
12. sobrecarga de métodos polimorfismo estatico
13. atributos estáticos lowerCamelCase
    - atributos estáticos: pertenecen a la clase en sí, no a instancias individuales
14. atributos final UPPER_SNAKE_CASE
    - atributos final: son constantes, su valor no puede cambiar una vez asignado  
15. métodos estático
    - métodos estáticos: pertenecen a la clase en sí, no a instancias individuales, se accede a ellos con el nombre de la clase
    - usados para utilidades, funciones que no dependen del estado de una instancia específica
16. Generalización (herencia)
17. clases finales: nadie puede heredar de ella no existe en UML
18. sobre escritura de métodos es un polimorfismo dinamico
19. clases abstractas: no se pueden instanciar, pueden contener métodos abstractos (sin implementación) y métodos concretos (con implementación)
        - se utilizan para definir una plantilla común para un grupo de clases relacionadas, permitiendo compartir
20. métodos abstractos
21. métodos finales: métodos que no se puedes sobrescribir
22. dependencias
    - alta cohesión bajo acoplamiento
23. super(), super, this
24. Polimorfismo
25. casting, autocasting (Narrowing, Widening)
26. asociación (asociación, composición, agregación) simples
27. Wrappers (boxing, unboxing, autounboxing)
28. Realiziacion
29. Interfaces (Implementación) metodo default
30. clases anidadas
    30.1 Nested classes
    30.1.1. static (static nested classes)
    30.1.2. non static (Non-static nested classes or inner classes)
31. clases anónimas
32. 30.2. Anonymous Classes
    31.3. inner class into methods
33. sobreescritura del metodo equals, hashcode
34. Collections (List, Set)

   1- List: ordenada, permite duplicados (ArrayList)
   2- Set: no ordenada, no permite duplicados (HashSet)
35. metodo toString()
