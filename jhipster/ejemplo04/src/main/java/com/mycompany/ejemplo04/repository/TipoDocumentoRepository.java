package com.mycompany.ejemplo04.repository;

import com.mycompany.ejemplo04.domain.TipoDocumento;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the TipoDocumento entity.
 */
@Repository
public interface TipoDocumentoRepository extends MongoRepository<TipoDocumento, String> {}
