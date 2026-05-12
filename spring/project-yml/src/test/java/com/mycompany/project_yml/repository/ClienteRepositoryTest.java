package com.mycompany.project_yml.repository;

import com.mycompany.project_yml.domain.Cliente;
import com.mycompany.project_yml.domain.TipoDocumento;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.mongodb.test.autoconfigure.DataMongoTest;

import static org.junit.jupiter.api.Assertions.*;

@DataMongoTest
class ClienteRepositoryTest {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private TipoDocumentoRepository tipoDocumentoRepository;

    @Test
    void insert(){
        Cliente cliente = new Cliente(null, "123456789", "John", "Doe", "Smith", "Johnson");

        TipoDocumento tipoDocumentoCedula = tipoDocumentoRepository.findBySigla("CC").orElse(null);

        assertNotNull(tipoDocumentoCedula);

        cliente.setTipoDocumento(tipoDocumentoCedula);

        Cliente savedCliente = clienteRepository.insert(cliente);

        ;

    }

}