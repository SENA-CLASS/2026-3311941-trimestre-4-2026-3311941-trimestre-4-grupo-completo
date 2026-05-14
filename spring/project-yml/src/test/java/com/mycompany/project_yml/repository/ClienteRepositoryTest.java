package com.mycompany.project_yml.repository;

import com.mycompany.project_yml.domain.Cliente;
import com.mycompany.project_yml.domain.TipoDocumento;
import com.mycompany.project_yml.domain.TipoDocumentoEmbedded;
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
        mongoTemplate.dropCollection(TipoDocumento.class);

        TipoDocumento tipoDocumentoCedula = tipoDocumentoRepository.insert(
                new TipoDocumento(null, "CC", "Cedula de ciudadania", Estado.ACTIVO)
        );

        Cliente cliente = new Cliente(null, "123456789", "John", "Doe", "Smith", "Johnson");
        Cliente cliente2 = new Cliente(null, "1234567890", "John", "Doe", "Smith", "Johnson");
        //Cliente cliente2 = new Cliente(null, "99999", "John", "Doe", "Smith", "Johnson");

        assertNotNull(tipoDocumentoCedula);

        TipoDocumentoEmbedded tipoDocumentoEmbedded = new TipoDocumentoEmbedded(tipoDocumentoCedula.getSigla(), tipoDocumentoCedula.getNombreDocumento());

        cliente.setTipoDocumentoEmbedded(tipoDocumentoEmbedded);
        cliente2.setTipoDocumentoEmbedded(tipoDocumentoEmbedded);

        Cliente clienteGuardado = clienteRepository.insert(cliente);
        Cliente clienteGuardado2 = clienteRepository.insert(cliente2);

        assertNotNull(clienteGuardado.getId());
        assertNotNull(clienteGuardado2.getId());
        assertNotNull(clienteGuardado.getTipoDocumentoEmbedded());
        assertNotNull(clienteGuardado2.getTipoDocumentoEmbedded());
        assertEquals("CC", clienteGuardado.getTipoDocumentoEmbedded().getSigla());
        assertEquals("CC", clienteGuardado2.getTipoDocumentoEmbedded().getSigla());
        assertEquals(2, clienteRepository.count());

    }

}