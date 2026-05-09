package com.mycompany.project_yml.repository;


import com.mycompany.project_yml.domain.TipoDocumento;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TipoDocumentoRepository extends MongoRepository<TipoDocumento, String> {
}
