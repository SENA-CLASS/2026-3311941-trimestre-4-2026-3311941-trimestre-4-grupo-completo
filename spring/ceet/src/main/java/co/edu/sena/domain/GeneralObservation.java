package co.edu.sena.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serial;
import java.io.Serializable;
import java.time.ZonedDateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A GeneralObservation.
 */
@Document(collection = "general_observation")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class GeneralObservation implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("number")
    private Integer number;

    @NotNull
    @Size(max = 500)
    @Field("observation_general")
    private String observationGeneral;

    @NotNull
    @Size(max = 500)
    @Field("jury")
    private String jury;

    @NotNull
    @Field("date_audit")
    private ZonedDateTime dateAudit;

    @DBRef
    @Field("projectGroup")
    @JsonIgnoreProperties(value = { "generalObservations", "memberGroups", "groupResponses", "course" }, allowSetters = true)
    private ProjectGroup projectGroup;

    @DBRef
    @Field("customer")
    @JsonIgnoreProperties(
        value = {
            "user", "apprentices", "logErrors", "logAudits", "generalObservations", "observationResponses", "instructors", "documentType",
        },
        allowSetters = true
    )
    private Customer customer;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public GeneralObservation id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getNumber() {
        return this.number;
    }

    public GeneralObservation number(Integer number) {
        this.setNumber(number);
        return this;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public String getObservationGeneral() {
        return this.observationGeneral;
    }

    public GeneralObservation observationGeneral(String observationGeneral) {
        this.setObservationGeneral(observationGeneral);
        return this;
    }

    public void setObservationGeneral(String observationGeneral) {
        this.observationGeneral = observationGeneral;
    }

    public String getJury() {
        return this.jury;
    }

    public GeneralObservation jury(String jury) {
        this.setJury(jury);
        return this;
    }

    public void setJury(String jury) {
        this.jury = jury;
    }

    public ZonedDateTime getDateAudit() {
        return this.dateAudit;
    }

    public GeneralObservation dateAudit(ZonedDateTime dateAudit) {
        this.setDateAudit(dateAudit);
        return this;
    }

    public void setDateAudit(ZonedDateTime dateAudit) {
        this.dateAudit = dateAudit;
    }

    public ProjectGroup getProjectGroup() {
        return this.projectGroup;
    }

    public void setProjectGroup(ProjectGroup projectGroup) {
        this.projectGroup = projectGroup;
    }

    public GeneralObservation projectGroup(ProjectGroup projectGroup) {
        this.setProjectGroup(projectGroup);
        return this;
    }

    public Customer getCustomer() {
        return this.customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public GeneralObservation customer(Customer customer) {
        this.setCustomer(customer);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GeneralObservation)) {
            return false;
        }
        return getId() != null && getId().equals(((GeneralObservation) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "GeneralObservation{" +
            "id=" + getId() +
            ", number=" + getNumber() +
            ", observationGeneral='" + getObservationGeneral() + "'" +
            ", jury='" + getJury() + "'" +
            ", dateAudit='" + getDateAudit() + "'" +
            "}";
    }
}
