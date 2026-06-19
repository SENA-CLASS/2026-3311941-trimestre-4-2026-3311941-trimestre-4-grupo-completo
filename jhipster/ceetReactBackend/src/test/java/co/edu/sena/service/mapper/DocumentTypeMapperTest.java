package co.edu.sena.service.mapper;

import static co.edu.sena.domain.DocumentTypeAsserts.*;
import static co.edu.sena.domain.DocumentTypeTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class DocumentTypeMapperTest {

    private DocumentTypeMapper documentTypeMapper;

    @BeforeEach
    void setUp() {
        documentTypeMapper = new DocumentTypeMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getDocumentTypeSample1();
        var actual = documentTypeMapper.toEntity(documentTypeMapper.toDto(expected));
        assertDocumentTypeAllPropertiesEquals(expected, actual);
    }
}
