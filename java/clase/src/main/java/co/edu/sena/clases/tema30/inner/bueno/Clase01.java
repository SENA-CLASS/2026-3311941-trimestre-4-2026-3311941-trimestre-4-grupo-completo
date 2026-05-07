package co.edu.sena.clases.tema30.inner.bueno;

public class Clase01 {

    public IntefaceClase02 creadorClase02(){
        return new Clase02();
    }

    private class Clase02 implements IntefaceClase02{

        public IntefaceClase03 creadorClase03(){
            return new Clase03();
        }

        private class Clase03 implements IntefaceClase03{

        }


    }
}
