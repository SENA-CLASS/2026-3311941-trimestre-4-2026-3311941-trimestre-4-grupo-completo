package com.mycompany.project_yml.repository;

import com.mycompany.project_yml.domain.*;
import com.mycompany.project_yml.domain.enumeration.Estado;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.mongodb.test.autoconfigure.DataMongoTest;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

@DataMongoTest
class ProductoRepositoryTest {

    @Autowired
    private FacturaRepository facturaRepository;

    @Autowired
    private TipoDocumentoRepository tipoDocumentoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ProductoRepository productoRepository;


    @Test
    void insert(){
        tipoDocumentoRepository.deleteAll();
        clienteRepository.deleteAll();
        facturaRepository.deleteAll();
        productoRepository.deleteAll();

        TipoDocumento tipoDocumentoCedula = tipoDocumentoRepository.insert(
                new TipoDocumento(null, "CC", "Cedula de ciudadania", Estado.ACTIVO)
        );

        Cliente cliente = new Cliente(null, "123456789", "John", "Doe", "Smith", "Johnson");
        Cliente cliente2 = new Cliente(null, "99999", "John", "Doe", "Smith", "Johnson");

        assertNotNull(tipoDocumentoCedula);

        cliente.setTipoDocumento(tipoDocumentoCedula);
        cliente2.setTipoDocumento(tipoDocumentoCedula);

        Cliente clienteGuardado = clienteRepository.insert(cliente);
        clienteRepository.insert(cliente2);

        Factura factura1 = new Factura(null, 1L, 2026,new Date(), 23800.0, 38000, 20000);
        Factura factura2 = new Factura(null, 2L, 2026,new Date(), 23800.0, 38000, 20000);
        Factura factura3 = new Factura(null, 3L, 2026,new Date(), 23800.0, 38000, 20000);
        Factura factura4 = new Factura(null, 4L, 2026,new Date(), 23800.0, 38000, 20000);

        Producto producto1 = new Producto(null,"hgdfgjhgkfasd","coca cola 250", 3000, 100,"http://example.com/coca-cola.jpg","coca cola 250 ml");
        Producto producto2 = new Producto(null,"hjgkhghjghjghjghjg","coca cola litro", 3000, 100,"http://example.com/coca-cola.jpg","coca cola 250 ml");
        Producto producto3 = new Producto(null,"jhghjgkhghjghjgkj","coca cola 2 litros", 3000, 100,"http://example.com/coca-cola.jpg","coca cola 250 ml");

        productoRepository.insert(producto1);
        productoRepository.insert(producto2);
        productoRepository.insert(producto3);

        factura1.getProductos().add(new ProductoEmbedded(producto1.getSerial(),producto1.getNombreProducto(),producto1.getPrecio(), 10));
        factura1.getProductos().add(new ProductoEmbedded(producto2.getSerial(),producto2.getNombreProducto(),producto2.getPrecio(), 50));
        factura1.getProductos().add(new ProductoEmbedded(producto3.getSerial(),producto3.getNombreProducto(),producto3.getPrecio(), 30));
        factura1.getProductos().add(new ProductoEmbedded(producto3.getSerial(),producto3.getNombreProducto(),producto3.getPrecio(), 30));

        producto1.setCantidadStock(producto1.getCantidadStock() - 10);
        producto2.setCantidadStock(producto2.getCantidadStock() - 50);
        producto3.setCantidadStock(producto3.getCantidadStock() - 30);

        productoRepository.save(producto1);
        productoRepository.save(producto2);
        productoRepository.save(producto3);

        facturaRepository.insert(factura1);
        facturaRepository.insert(factura2);
        facturaRepository.insert(factura3);
        facturaRepository.insert(factura4);


        clienteGuardado.getFacturaSet().add(factura1);
        clienteGuardado.getFacturaSet().add(factura2);
        clienteGuardado.getFacturaSet().add(factura3);
        clienteGuardado.getFacturaSet().add(factura4);



        clienteRepository.save(clienteGuardado);






    }


}