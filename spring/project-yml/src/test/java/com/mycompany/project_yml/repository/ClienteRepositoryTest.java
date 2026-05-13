package com.mycompany.project_yml.repository;

import com.mycompany.project_yml.domain.Cliente;
import com.mycompany.project_yml.domain.TipoDocumento;
import com.mycompany.project_yml.domain.enumeration.Estado;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.mongodb.test.autoconfigure.DataMongoTest;
import org.springframework.data.mongodb.core.MongoTemplate;

import static org.junit.jupiter.api.Assertions.*;

@DataMongoTest
class ClienteRepositoryTest {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private TipoDocumentoRepository tipoDocumentoRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Test
    void insert() {
        mongoTemplate.dropCollection(Cliente.class);
        tipoDocumentoRepository.deleteAll();

        TipoDocumento tipoDocumentoCedula = tipoDocumentoRepository.insert(
                new TipoDocumento(null, "CC", "Cedula de ciudadania", Estado.ACTIVO)
        );

        Cliente cliente = new Cliente(null, "123456789", "John", "Doe", "Smith", "Johnson");
        Cliente cliente2 = new Cliente(null, "99999", "John", "Doe", "Smith", "Johnson");

        assertNotNull(tipoDocumentoCedula);

        cliente.setTipoDocumento(tipoDocumentoCedula);
        cliente2.setTipoDocumento(tipoDocumentoCedula);

        Cliente clienteGuardado = clienteRepository.insert(cliente);
        Cliente clienteGuardado2 = clienteRepository.insert(cliente2);

        assertNotNull(clienteGuardado.getId());
        assertNotNull(clienteGuardado2.getId());
        assertNotNull(clienteGuardado.getTipoDocumento());
        assertNotNull(clienteGuardado2.getTipoDocumento());
        assertEquals("CC", clienteGuardado.getTipoDocumento().getSigla());
        assertEquals("CC", clienteGuardado2.getTipoDocumento().getSigla());
        assertEquals(2, clienteRepository.count());

    }

}