package com.mycompany.project_yml.web.rest;

import com.mycompany.project_yml.domain.TipoDocumento;
import com.mycompany.project_yml.repository.TipoDocumentoRepository;
import com.mycompany.project_yml.service.TipoDocumentoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class TipoDocumentoResource {

    private final TipoDocumentoService tipoDocumentoService;

    private static final Logger LOG = LoggerFactory.getLogger(TipoDocumentoResource.class);

    public TipoDocumentoResource(TipoDocumentoService tipoDocumentoService) {
        this.tipoDocumentoService = tipoDocumentoService;
    }

    // POST /api/document-types
    @PostMapping("/tipo-documentos") // endpoint to create a new document type
    public ResponseEntity<TipoDocumento> createTipoDocumento(@RequestBody TipoDocumento tipoDocumento) throws URISyntaxException {
        LOG.debug("se crea: {}", tipoDocumento);
        if (tipoDocumento.getId() != null) {
            return ResponseEntity.badRequest().build();
        } else {
            TipoDocumento tipoDocumentoSaved = tipoDocumentoService.save(tipoDocumento);
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
        Optional<TipoDocumento> tipoDocumentoUpdated = tipoDocumentoService.findOne(id);
        if (tipoDocumentoUpdated.isPresent()) {
            TipoDocumento tipoDocumentoSaved = tipoDocumentoService.update(tipoDocumento);
            return ResponseEntity.ok().body(tipoDocumentoSaved);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // GET /api/document-types
    @GetMapping("/tipo-documentos") // endpoint to get all document types
    public ResponseEntity<List<TipoDocumento>> getTipoDocumento() {
        LOG.debug("se buscan todos los tipos de documentos");
        List<TipoDocumento> tipoDocumentos = tipoDocumentoService.findAll();
        return ResponseEntity.ok().body(tipoDocumentos);
    }

    // GET /api/document-types/{id}
    @GetMapping("/tipo-documentos/{id}") // endpoint to get a document type by id
    public ResponseEntity<TipoDocumento> getTipoDocumentoById(@PathVariable("id") String id) {
        LOG.debug("se busca el id: {}", id);
        if(id == null){
            return ResponseEntity.badRequest().build();
        }else{
            Optional<TipoDocumento> tipoDocumento = tipoDocumentoService.findOne(id);
            return tipoDocumento.map(documento -> ResponseEntity.ok().body(documento)).orElseGet(() -> ResponseEntity.badRequest().build());
        }
    }

    // DELETE /api/document-types/{id}
    @DeleteMapping("/tipo-documentos/{id}") // endpoint to delete a document type by id
    public ResponseEntity<Void> deleteTipoDocumento(@PathVariable("id") String id) {
        LOG.debug("se borro el id: {}", id);
        tipoDocumentoService.delete(id);
        return ResponseEntity.noContent().build();
    }


}
