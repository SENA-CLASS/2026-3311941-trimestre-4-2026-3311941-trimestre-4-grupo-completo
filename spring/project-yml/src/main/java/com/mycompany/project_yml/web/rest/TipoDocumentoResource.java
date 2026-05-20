package com.mycompany.project_yml.web.rest;

import com.mycompany.project_yml.domain.TipoDocumento;
import com.mycompany.project_yml.repository.TipoDocumentoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class TipoDocumentoResource {

    private final TipoDocumentoRepository tipoDocumentoRepository;

    private static final Logger LOG = LoggerFactory.getLogger(TipoDocumentoResource.class);

    public TipoDocumentoResource(TipoDocumentoRepository tipoDocumentoRepository) {
        this.tipoDocumentoRepository = tipoDocumentoRepository;
    }

    // POST /api/document-types
    @PostMapping("/tipo-documentos") // endpoint to create a new document type
    public ResponseEntity<TipoDocumento> createTipoDocumento(@RequestBody TipoDocumento tipoDocumento) throws URISyntaxException {
        LOG.debug("se crea: {}", tipoDocumento);
        if (tipoDocumento.getId() != null) {
            return ResponseEntity.badRequest().build();
        } else {
            TipoDocumento tipoDocumentoSaved = tipoDocumentoRepository.insert(tipoDocumento);
            return ResponseEntity.created(new URI("api/tipo-documentos/" + tipoDocumentoSaved.getId())).body(tipoDocumentoSaved);
        }
    }

    // PUT /api/document-types
    @PutMapping("/tipo-documentos/{id}")// endpoint to update an existing document type
    public ResponseEntity<TipoDocumento> updateTipoDocumento(
            @PathVariable(value = "id", required = false) final String id,
            @RequestBody TipoDocumento tipoDocumento) {
        LOG.debug("se actualiza: {}", tipoDocumento);
        if (id == null) {
            return ResponseEntity.badRequest().build();
        }
        if (!tipoDocumento.getId().equals(id)) {
            return ResponseEntity.badRequest().build();
        }
        Optional<TipoDocumento> tipoDocumentoUpdated = tipoDocumentoRepository.findById(id);
        if (tipoDocumentoUpdated.isPresent()) {
            TipoDocumento tipoDocumentoSaved = tipoDocumentoRepository.save(tipoDocumento);
            return ResponseEntity.ok().body(tipoDocumentoSaved);
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    // GET /api/document-types
    @GetMapping("/tipo-documentos") // endpoint to get all document types
    public ResponseEntity<List<TipoDocumento>> getTipoDocumento() {
        List<TipoDocumento> tipoDocumentos = tipoDocumentoRepository.findAll();
        return ResponseEntity.ok().body(tipoDocumentos);
    }

    // GET /api/document-types/{id}
    @GetMapping("/tipo-documentos/{id}") // endpoint to get a document type by id
    public String getTipoDocumentoById(@PathVariable("id") Long id) {
        return "GET DOCUMENT TYPE BY ID: " + id;
    }

    // DELETE /api/document-types/{id}
    @DeleteMapping("/tipo-documentos/{id}") // endpoint to delete a document type by id
    public String deleteTipoDocumento(@PathVariable("id") Long id) {
        return "DELETE DOCUMENT TYPE BY ID: " + id;
    }


}
