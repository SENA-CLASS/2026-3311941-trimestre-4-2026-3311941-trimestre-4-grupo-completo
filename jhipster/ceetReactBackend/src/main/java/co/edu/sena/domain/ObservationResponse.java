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
 * A ObservationResponse.
 */
@Document(collection = "observation_response")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ObservationResponse implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("number_observation")
    private Integer numberObservation;

    @NotNull
    @Size(max = 400)
    @Field("obsevation")
    private String obsevation;

    @NotNull
    @Size(max = 400)
    @Field("juries")
    private String juries;

    @NotNull
    @Field("date_observation")
    private ZonedDateTime dateObservation;

    @DBRef
    @Field("groupResponse")
    @JsonIgnoreProperties(value = { "observationResponses", "projectGroup", "assessment", "itemList" }, allowSetters = true)
    private GroupResponse groupResponse;

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
    private Customer customer;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public ObservationResponse id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getNumberObservation() {
        return this.numberObservation;
    }

    public ObservationResponse numberObservation(Integer numberObservation) {
        this.setNumberObservation(numberObservation);
        return this;
    }

    public void setNumberObservation(Integer numberObservation) {
        this.numberObservation = numberObservation;
    }

    public String getObsevation() {
        return this.obsevation;
    }

    public ObservationResponse obsevation(String obsevation) {
        this.setObsevation(obsevation);
        return this;
    }

    public void setObsevation(String obsevation) {
        this.obsevation = obsevation;
    }

    public String getJuries() {
        return this.juries;
    }

    public ObservationResponse juries(String juries) {
        this.setJuries(juries);
        return this;
    }

    public void setJuries(String juries) {
        this.juries = juries;
    }

    public ZonedDateTime getDateObservation() {
        return this.dateObservation;
    }

    public ObservationResponse dateObservation(ZonedDateTime dateObservation) {
        this.setDateObservation(dateObservation);
        return this;
    }

    public void setDateObservation(ZonedDateTime dateObservation) {
        this.dateObservation = dateObservation;
    }

    public GroupResponse getGroupResponse() {
        return this.groupResponse;
    }

    public void setGroupResponse(GroupResponse groupResponse) {
        this.groupResponse = groupResponse;
    }

    public ObservationResponse groupResponse(GroupResponse groupResponse) {
        this.setGroupResponse(groupResponse);
        return this;
    }

    public Customer getCustomer() {
        return this.customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public ObservationResponse customer(Customer customer) {
        this.setCustomer(customer);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ObservationResponse)) {
            return false;
        }
        return getId() != null && getId().equals(((ObservationResponse) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ObservationResponse{" +
            "id=" + getId() +
            ", numberObservation=" + getNumberObservation() +
            ", obsevation='" + getObsevation() + "'" +
            ", juries='" + getJuries() + "'" +
            ", dateObservation='" + getDateObservation() + "'" +
            "}";
    }
}
