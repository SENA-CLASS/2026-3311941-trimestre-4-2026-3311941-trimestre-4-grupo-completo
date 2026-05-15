package com.mycompany.project_yml.repository;

import com.mycompany.project_yml.domain.Producto;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductoRepository extends MongoRepository<Producto, String> {
}
