package co.edu.sena.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.ObservationResponse} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ObservationResponseDTO implements Serializable {

    private String id;

    @NotNull
    private Integer numberObservation;

    @NotNull
    @Size(max = 400)
    private String obsevation;

    @NotNull
    @Size(max = 400)
    private String juries;

    @NotNull
    private ZonedDateTime dateObservation;

    @NotNull
    private GroupResponseDTO groupResponse;

    @NotNull
    private CustomerDTO customer;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getNumberObservation() {
        return numberObservation;
    }

    public void setNumberObservation(Integer numberObservation) {
        this.numberObservation = numberObservation;
    }

    public String getObsevation() {
        return obsevation;
    }

    public void setObsevation(String obsevation) {
        this.obsevation = obsevation;
    }

    public String getJuries() {
        return juries;
    }

    public void setJuries(String juries) {
        this.juries = juries;
    }

    public ZonedDateTime getDateObservation() {
        return dateObservation;
    }

    public void setDateObservation(ZonedDateTime dateObservation) {
        this.dateObservation = dateObservation;
    }

    public GroupResponseDTO getGroupResponse() {
        return groupResponse;
    }

    public void setGroupResponse(GroupResponseDTO groupResponse) {
        this.groupResponse = groupResponse;
    }

    public CustomerDTO getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerDTO customer) {
        this.customer = customer;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ObservationResponseDTO)) {
            return false;
        }

        ObservationResponseDTO observationResponseDTO = (ObservationResponseDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, observationResponseDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ObservationResponseDTO{" +
            "id='" + getId() + "'" +
            ", numberObservation=" + getNumberObservation() +
            ", obsevation='" + getObsevation() + "'" +
            ", juries='" + getJuries() + "'" +
            ", dateObservation='" + getDateObservation() + "'" +
            ", groupResponse=" + getGroupResponse() +
            ", customer=" + getCustomer() +
            "}";
    }
}
