package com.mycompany.project_yml.repository;

import com.mycompany.project_yml.domain.Cuenta;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CuentaRepository extends MongoRepository<Cuenta, String> {
}
