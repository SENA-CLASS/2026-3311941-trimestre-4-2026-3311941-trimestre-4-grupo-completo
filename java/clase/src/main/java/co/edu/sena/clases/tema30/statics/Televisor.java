package co.edu.sena.clases.tema30.statics;

public class Televisor {
    private int id;
    private String marca;
    private float tamanio;
    private int anio;


    public static final class Builder {
        private int id;
        private String marca;
        private float tamanio;
        private int anio;

        private Builder() {
        }

        public static Builder aTelevisor() {
            return new Builder();
        }

        public Builder withId(int id) {
            this.id = id;
            return this;
        }

        public Builder withMarca(String marca) {
            this.marca = marca;
            return this;
        }

        public Builder withTamanio(float tamanio) {
            this.tamanio = tamanio;
            return this;
        }

        public Builder withAnio(int anio) {
            this.anio = anio;
            return this;
        }

        public Televisor build() {
            Televisor televisor = new Televisor();
            televisor.id = this.id;
            televisor.anio = this.anio;
            televisor.marca = this.marca;
            televisor.tamanio = this.tamanio;
            return televisor;
        }
    }

    public int getId() {
        return id;
    }

    public String getMarca() {
        return marca;
    }

    public float getTamanio() {
        return tamanio;
    }

    public int getAnio() {
        return anio;
    }
}
