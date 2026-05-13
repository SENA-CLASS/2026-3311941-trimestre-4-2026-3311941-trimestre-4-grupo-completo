package com.mycompany.project_yml.repository;

import com.mycompany.project_yml.domain.Cliente;
import com.mycompany.project_yml.domain.Cuenta;
import com.mycompany.project_yml.domain.TipoDocumento;
import com.mycompany.project_yml.domain.enumeration.Estado;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.mongodb.test.autoconfigure.DataMongoTest;
import org.springframework.data.mongodb.core.MongoTemplate;

import static org.junit.jupiter.api.Assertions.*;

@DataMongoTest
class CuentaRepositoryTest {

    @Autowired
    private CuentaRepository cuentaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private TipoDocumentoRepository tipoDocumentoRepository;

    @Autowired
    private MongoTemplate mongoTemplate;


    @Test
    void insert(){
        mongoTemplate.dropCollection(Cliente.class);
        mongoTemplate.dropCollection(Cuenta.class);
        tipoDocumentoRepository.deleteAll();

        TipoDocumento tipoDocumentoCedula = tipoDocumentoRepository.insert(
                new TipoDocumento(null, "CC", "Cedula de ciudadania", Estado.ACTIVO)
        );

        assertNotNull(tipoDocumentoCedula);

        Cliente cliente = new Cliente(null, "123456789", "John", "Doe", "Smith", "Johnson");
        Cliente cliente2 = new Cliente(null, "99999", "John", "Doe", "Smith", "Johnson");


        cliente.setTipoDocumento(tipoDocumentoCedula);
        cliente2.setTipoDocumento(tipoDocumentoCedula);

        Cliente clienteGuardado = clienteRepository.insert(cliente);
        Cliente clienteGuardado2 = clienteRepository.insert(cliente2);

        Cuenta cuenta01 = new Cuenta(null, "Cuenta de facebook", Estado.ACTIVO);
        Cuenta cuenta02 = new Cuenta(null, "Cuenta de X", Estado.ACTIVO);

        cuenta01.setCliente(clienteGuardado);
        cuenta02.setCliente(clienteGuardado2);

        cuentaRepository.insert(cuenta01);
        cuentaRepository.insert(cuenta02);


    }



}