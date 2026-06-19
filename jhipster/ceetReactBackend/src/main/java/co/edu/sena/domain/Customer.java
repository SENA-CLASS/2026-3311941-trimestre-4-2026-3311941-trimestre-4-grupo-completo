package co.edu.sena.domain;

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
 * A Customer.
 */
@Document(collection = "customer")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Customer implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Size(max = 50)
    @Field("document_number")
    private String documentNumber;

    @NotNull
    @Size(max = 50)
    @Field("first_name")
    private String firstName;

    @Size(max = 50)
    @Field("second_name")
    private String secondName;

    @NotNull
    @Size(max = 50)
    @Field("fisrt_last_name")
    private String fisrtLastName;

    @Size(max = 50)
    @Field("second_last_name")
    private String secondLastName;

    @DBRef
    @Field("user")
    private User user;

    @DBRef
    @Field("apprentice")
    @JsonIgnoreProperties(value = { "memberGroups", "customer", "trainingStatus", "course" }, allowSetters = true)
    private Set<Apprentice> apprentices = new HashSet<>();

    @DBRef
    @Field("logError")
    @JsonIgnoreProperties(value = { "customer" }, allowSetters = true)
    private Set<LogError> logErrors = new HashSet<>();

    @DBRef
    @Field("logAudit")
    @JsonIgnoreProperties(value = { "customer" }, allowSetters = true)
    private Set<LogAudit> logAudits = new HashSet<>();

    @DBRef
    @Field("generalObservation")
    @JsonIgnoreProperties(value = { "projectGroup", "customer" }, allowSetters = true)
    private Set<GeneralObservation> generalObservations = new HashSet<>();

    @DBRef
    @Field("observationResponse")
    @JsonIgnoreProperties(value = { "groupResponse", "customer" }, allowSetters = true)
    private Set<ObservationResponse> observationResponses = new HashSet<>();

    @DBRef
    @Field("instructor")
    @JsonIgnoreProperties(value = { "areaInstructors", "bondingInstructors", "schedules", "customer" }, allowSetters = true)
    private Set<Instructor> instructors = new HashSet<>();

    @DBRef
    @Field("documentType")
    @JsonIgnoreProperties(value = { "customers" }, allowSetters = true)
    private DocumentType documentType;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Customer id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDocumentNumber() {
        return this.documentNumber;
    }

    public Customer documentNumber(String documentNumber) {
        this.setDocumentNumber(documentNumber);
        return this;
    }

    public void setDocumentNumber(String documentNumber) {
        this.documentNumber = documentNumber;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public Customer firstName(String firstName) {
        this.setFirstName(firstName);
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSecondName() {
        return this.secondName;
    }

    public Customer secondName(String secondName) {
        this.setSecondName(secondName);
        return this;
    }

    public void setSecondName(String secondName) {
        this.secondName = secondName;
    }

    public String getFisrtLastName() {
        return this.fisrtLastName;
    }

    public Customer fisrtLastName(String fisrtLastName) {
        this.setFisrtLastName(fisrtLastName);
        return this;
    }

    public void setFisrtLastName(String fisrtLastName) {
        this.fisrtLastName = fisrtLastName;
    }

    public String getSecondLastName() {
        return this.secondLastName;
    }

    public Customer secondLastName(String secondLastName) {
        this.setSecondLastName(secondLastName);
        return this;
    }

    public void setSecondLastName(String secondLastName) {
        this.secondLastName = secondLastName;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Customer user(User user) {
        this.setUser(user);
        return this;
    }

    public Set<Apprentice> getApprentices() {
        return this.apprentices;
    }

    public void setApprentices(Set<Apprentice> apprentices) {
        if (this.apprentices != null) {
            this.apprentices.forEach(i -> i.setCustomer(null));
        }
        if (apprentices != null) {
            apprentices.forEach(i -> i.setCustomer(this));
        }
        this.apprentices = apprentices;
    }

    public Customer apprentices(Set<Apprentice> apprentices) {
        this.setApprentices(apprentices);
        return this;
    }

    public Customer addApprentice(Apprentice apprentice) {
        this.apprentices.add(apprentice);
        apprentice.setCustomer(this);
        return this;
    }

    public Customer removeApprentice(Apprentice apprentice) {
        this.apprentices.remove(apprentice);
        apprentice.setCustomer(null);
        return this;
    }

    public Set<LogError> getLogErrors() {
        return this.logErrors;
    }

    public void setLogErrors(Set<LogError> logErrors) {
        if (this.logErrors != null) {
            this.logErrors.forEach(i -> i.setCustomer(null));
        }
        if (logErrors != null) {
            logErrors.forEach(i -> i.setCustomer(this));
        }
        this.logErrors = logErrors;
    }

    public Customer logErrors(Set<LogError> logErrors) {
        this.setLogErrors(logErrors);
        return this;
    }

    public Customer addLogError(LogError logError) {
        this.logErrors.add(logError);
        logError.setCustomer(this);
        return this;
    }

    public Customer removeLogError(LogError logError) {
        this.logErrors.remove(logError);
        logError.setCustomer(null);
        return this;
    }

    public Set<LogAudit> getLogAudits() {
        return this.logAudits;
    }

    public void setLogAudits(Set<LogAudit> logAudits) {
        if (this.logAudits != null) {
            this.logAudits.forEach(i -> i.setCustomer(null));
        }
        if (logAudits != null) {
            logAudits.forEach(i -> i.setCustomer(this));
        }
        this.logAudits = logAudits;
    }

    public Customer logAudits(Set<LogAudit> logAudits) {
        this.setLogAudits(logAudits);
        return this;
    }

    public Customer addLogAudit(LogAudit logAudit) {
        this.logAudits.add(logAudit);
        logAudit.setCustomer(this);
        return this;
    }

    public Customer removeLogAudit(LogAudit logAudit) {
        this.logAudits.remove(logAudit);
        logAudit.setCustomer(null);
        return this;
    }

    public Set<GeneralObservation> getGeneralObservations() {
        return this.generalObservations;
    }

    public void setGeneralObservations(Set<GeneralObservation> generalObservations) {
        if (this.generalObservations != null) {
            this.generalObservations.forEach(i -> i.setCustomer(null));
        }
        if (generalObservations != null) {
            generalObservations.forEach(i -> i.setCustomer(this));
        }
        this.generalObservations = generalObservations;
    }

    public Customer generalObservations(Set<GeneralObservation> generalObservations) {
        this.setGeneralObservations(generalObservations);
        return this;
    }

    public Customer addGeneralObservation(GeneralObservation generalObservation) {
        this.generalObservations.add(generalObservation);
        generalObservation.setCustomer(this);
        return this;
    }

    public Customer removeGeneralObservation(GeneralObservation generalObservation) {
        this.generalObservations.remove(generalObservation);
        generalObservation.setCustomer(null);
        return this;
    }

    public Set<ObservationResponse> getObservationResponses() {
        return this.observationResponses;
    }

    public void setObservationResponses(Set<ObservationResponse> observationResponses) {
        if (this.observationResponses != null) {
            this.observationResponses.forEach(i -> i.setCustomer(null));
        }
        if (observationResponses != null) {
            observationResponses.forEach(i -> i.setCustomer(this));
        }
        this.observationResponses = observationResponses;
    }

    public Customer observationResponses(Set<ObservationResponse> observationResponses) {
        this.setObservationResponses(observationResponses);
        return this;
    }

    public Customer addObservationResponse(ObservationResponse observationResponse) {
        this.observationResponses.add(observationResponse);
        observationResponse.setCustomer(this);
        return this;
    }

    public Customer removeObservationResponse(ObservationResponse observationResponse) {
        this.observationResponses.remove(observationResponse);
        observationResponse.setCustomer(null);
        return this;
    }

    public Set<Instructor> getInstructors() {
        return this.instructors;
    }

    public void setInstructors(Set<Instructor> instructors) {
        if (this.instructors != null) {
            this.instructors.forEach(i -> i.setCustomer(null));
        }
        if (instructors != null) {
            instructors.forEach(i -> i.setCustomer(this));
        }
        this.instructors = instructors;
    }

    public Customer instructors(Set<Instructor> instructors) {
        this.setInstructors(instructors);
        return this;
    }

    public Customer addInstructor(Instructor instructor) {
        this.instructors.add(instructor);
        instructor.setCustomer(this);
        return this;
    }

    public Customer removeInstructor(Instructor instructor) {
        this.instructors.remove(instructor);
        instructor.setCustomer(null);
        return this;
    }

    public DocumentType getDocumentType() {
        return this.documentType;
    }

    public void setDocumentType(DocumentType documentType) {
        this.documentType = documentType;
    }

    public Customer documentType(DocumentType documentType) {
        this.setDocumentType(documentType);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Customer)) {
            return false;
        }
        return getId() != null && getId().equals(((Customer) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Customer{" +
            "id=" + getId() +
            ", documentNumber='" + getDocumentNumber() + "'" +
            ", firstName='" + getFirstName() + "'" +
            ", secondName='" + getSecondName() + "'" +
            ", fisrtLastName='" + getFisrtLastName() + "'" +
            ", secondLastName='" + getSecondLastName() + "'" +
            "}";
    }
}
