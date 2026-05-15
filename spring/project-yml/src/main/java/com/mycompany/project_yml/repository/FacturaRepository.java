package com.mycompany.project_yml.repository;

import com.mycompany.project_yml.domain.Factura;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FacturaRepository extends MongoRepository<Factura, String> {
}
