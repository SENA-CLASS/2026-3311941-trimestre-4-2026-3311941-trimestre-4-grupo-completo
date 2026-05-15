package com.mycompany.project_yml.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;

@Document
public class Producto implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Indexed(unique = true, name = "idx_unique_serial")
    private String serial;
    private String nombreProducto;
    private double precio;
    private int cantidadStock;
    private String urlImagen;
    private String descipcion;

    public Producto(String id, String serial, String nombreProducto, double precio, int cantidadStock, String urlImagen, String descipcion) {
        this.id = id;
        this.serial = serial;
        this.nombreProducto = nombreProducto;
        this.precio = precio;
        this.cantidadStock = cantidadStock;
        this.urlImagen = urlImagen;
        this.descipcion = descipcion;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSerial() {
        return serial;
    }

    public void setSerial(String serial) {
        this.serial = serial;
    }

    public String getNombreProducto() {
        return nombreProducto;
    }

    public void setNombreProducto(String nombreProducto) {
        this.nombreProducto = nombreProducto;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public int getCantidadStock() {
        return cantidadStock;
    }

    public void setCantidadStock(int cantidadStock) {
        this.cantidadStock = cantidadStock;
    }

    public String getUrlImagen() {
        return urlImagen;
    }

    public void setUrlImagen(String urlImagen) {
        this.urlImagen = urlImagen;
    }

    public String getDescipcion() {
        return descipcion;
    }

    public void setDescipcion(String descipcion) {
        this.descipcion = descipcion;
    }

    @Override
    public final boolean equals(Object o) {
        if (!(o instanceof Producto producto)) return false;

        return Objects.equals(id, producto.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
