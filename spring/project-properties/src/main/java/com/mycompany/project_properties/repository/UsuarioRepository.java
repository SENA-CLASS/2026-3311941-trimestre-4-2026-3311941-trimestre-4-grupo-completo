package com.mycompany.project_properties.repository;

import com.mycompany.project_properties.domain.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UsuarioRepository extends MongoRepository<Usuario, String> {
}
