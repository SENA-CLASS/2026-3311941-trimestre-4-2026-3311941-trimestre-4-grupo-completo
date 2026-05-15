package com.mycompany.project_yml.domain;

import java.util.Objects;

public class ProductoEmbedded {
    private String serial;
    private String nombreProducto;
    private double precioVenta;
    private int cantidadVendida;

    public ProductoEmbedded(String serial, String nombreProducto, double precioVenta, int cantidadVendida) {
        this.serial = serial;
        this.nombreProducto = nombreProducto;
        this.precioVenta = precioVenta;
        this.cantidadVendida = cantidadVendida;
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

    public double getPrecioVenta() {
        return precioVenta;
    }

    public void setPrecioVenta(double precioVenta) {
        this.precioVenta = precioVenta;
    }

    public int getCantidadVendida() {
        return cantidadVendida;
    }

    public void setCantidadVendida(int cantidadVendida) {
        this.cantidadVendida = cantidadVendida;
    }

    @Override
    public final boolean equals(Object o) {
        if (!(o instanceof ProductoEmbedded that)) return false;

        return Objects.equals(serial, that.serial);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(serial);
    }
}
