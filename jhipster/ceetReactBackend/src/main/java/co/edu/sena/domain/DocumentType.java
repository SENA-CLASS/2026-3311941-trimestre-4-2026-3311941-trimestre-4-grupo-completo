package co.edu.sena.domain;

import co.edu.sena.domain.enumeration.State;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A DocumentType.
 */
@Document(collection = "document_type")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DocumentType implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Size(max = 10)
    @Field("initials")
    private String initials;

    @NotNull
    @Size(max = 100)
    @Field("document_name")
    private String documentName;

    @NotNull
    @Field("state_document_type")
    private State stateDocumentType;

    @DBRef
    @Field("customer")
    @JsonIgnoreProperties(
        value = {
            "user",
            "apprentices",
            "logErrors",
            "logAudits",
            "generalObservations",
            "observationResponses",
            "instructors",
            "documentType",
        },
        allowSetters = true
    )
    private Set<Customer> customers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public DocumentType id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getInitials() {
        return this.initials;
    }

    public DocumentType initials(String initials) {
        this.setInitials(initials);
        return this;
    }

    public void setInitials(String initials) {
        this.initials = initials;
    }

    public String getDocumentName() {
        return this.documentName;
    }

    public DocumentType documentName(String documentName) {
        this.setDocumentName(documentName);
        return this;
    }

    public void setDocumentName(String documentName) {
        this.documentName = documentName;
    }

    public State getStateDocumentType() {
        return this.stateDocumentType;
    }

    public DocumentType stateDocumentType(State stateDocumentType) {
        this.setStateDocumentType(stateDocumentType);
        return this;
    }

    public void setStateDocumentType(State stateDocumentType) {
        this.stateDocumentType = stateDocumentType;
    }

    public Set<Customer> getCustomers() {
        return this.customers;
    }

    public void setCustomers(Set<Customer> customers) {
        if (this.customers != null) {
            this.customers.forEach(i -> i.setDocumentType(null));
        }
        if (customers != null) {
            customers.forEach(i -> i.setDocumentType(this));
        }
        this.customers = customers;
    }

    public DocumentType customers(Set<Customer> customers) {
        this.setCustomers(customers);
        return this;
    }

    public DocumentType addCustomer(Customer customer) {
        this.customers.add(customer);
        customer.setDocumentType(this);
        return this;
    }

    public DocumentType removeCustomer(Customer customer) {
        this.customers.remove(customer);
        customer.setDocumentType(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DocumentType)) {
            return false;
        }
        return getId() != null && getId().equals(((DocumentType) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DocumentType{" +
            "id=" + getId() +
            ", initials='" + getInitials() + "'" +
            ", documentName='" + getDocumentName() + "'" +
            ", stateDocumentType='" + getStateDocumentType() + "'" +
            "}";
    }
}
