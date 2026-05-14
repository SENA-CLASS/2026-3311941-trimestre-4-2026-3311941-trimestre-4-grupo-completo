package com.mycompany.project_yml.repository;

import com.mycompany.project_yml.domain.TipoDocumento;
import com.mycompany.project_yml.domain.enumeration.Estado;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.mongodb.test.autoconfigure.DataMongoTest;
import org.springframework.data.mongodb.core.MongoTemplate;

import static org.junit.jupiter.api.Assertions.*;

@DataMongoTest
class TipoDocumentoRepositoryTest {

    @Autowired
    private TipoDocumentoRepository tipoDocumentoRepository;

    @Autowired
    private MongoTemplate mongoTemplate;


    @Test
    void insert(){
        mongoTemplate.dropCollection(TipoDocumento.class);

        TipoDocumento tipoDocumento = new TipoDocumento(null,"CC", "Cedula de ciudadania", Estado.ACTIVO);
        TipoDocumento guardado = tipoDocumentoRepository.insert(tipoDocumento);

        assertNotNull(guardado.getId());
        assertEquals("CC", guardado.getSigla());
    }

}
