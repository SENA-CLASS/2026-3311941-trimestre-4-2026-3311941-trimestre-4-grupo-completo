package com.mycompany.project_yml.repository;

import com.mycompany.project_yml.domain.Cliente;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ClienteRepository extends MongoRepository<Cliente, String> {
}
