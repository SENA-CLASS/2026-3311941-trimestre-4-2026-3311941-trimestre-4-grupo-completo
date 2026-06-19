package co.edu.sena.domain;

import static co.edu.sena.domain.CustomerTestSamples.*;
import static co.edu.sena.domain.DocumentTypeTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class DocumentTypeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DocumentType.class);
        DocumentType documentType1 = getDocumentTypeSample1();
        DocumentType documentType2 = new DocumentType();
        assertThat(documentType1).isNotEqualTo(documentType2);

        documentType2.setId(documentType1.getId());
        assertThat(documentType1).isEqualTo(documentType2);

        documentType2 = getDocumentTypeSample2();
        assertThat(documentType1).isNotEqualTo(documentType2);
    }

    @Test
    void customerTest() {
        DocumentType documentType = getDocumentTypeRandomSampleGenerator();
        Customer customerBack = getCustomerRandomSampleGenerator();

        documentType.addCustomer(customerBack);
        assertThat(documentType.getCustomers()).containsOnly(customerBack);
        assertThat(customerBack.getDocumentType()).isEqualTo(documentType);

        documentType.removeCustomer(customerBack);
        assertThat(documentType.getCustomers()).doesNotContain(customerBack);
        assertThat(customerBack.getDocumentType()).isNull();

        documentType.customers(new HashSet<>(Set.of(customerBack)));
        assertThat(documentType.getCustomers()).containsOnly(customerBack);
        assertThat(customerBack.getDocumentType()).isEqualTo(documentType);

        documentType.setCustomers(new HashSet<>());
        assertThat(documentType.getCustomers()).doesNotContain(customerBack);
        assertThat(customerBack.getDocumentType()).isNull();
    }
}
