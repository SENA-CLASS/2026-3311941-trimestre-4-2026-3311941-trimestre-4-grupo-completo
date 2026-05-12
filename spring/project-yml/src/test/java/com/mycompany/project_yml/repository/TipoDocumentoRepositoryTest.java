package com.mycompany.project_yml.repository;

import com.mycompany.project_yml.domain.TipoDocumento;
import com.mycompany.project_yml.domain.enumeration.Estado;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.mongodb.test.autoconfigure.DataMongoTest;

import static org.junit.jupiter.api.Assertions.*;

@DataMongoTest
class TipoDocumentoRepositoryTest {

    @Autowired
    private TipoDocumentoRepository tipoDocumentoRepository;


    @Test
    void insert(){
        TipoDocumento tipoDocumento = new TipoDocumento(null,"CC", "Cedula de ciudadania", Estado.ACTIVO);
        tipoDocumentoRepository.insert(tipoDocumento);



    }

}
