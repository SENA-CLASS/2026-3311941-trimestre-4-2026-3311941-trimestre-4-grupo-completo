package co.edu.sena.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.GeneralObservation} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class GeneralObservationDTO implements Serializable {

    private String id;

    @NotNull
    private Integer number;

    @NotNull
    @Size(max = 500)
    private String observationGeneral;

    @NotNull
    @Size(max = 500)
    private String jury;

    @NotNull
    private ZonedDateTime dateAudit;

    @NotNull
    private ProjectGroupDTO projectGroup;

    @NotNull
    private CustomerDTO customer;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public String getObservationGeneral() {
        return observationGeneral;
    }

    public void setObservationGeneral(String observationGeneral) {
        this.observationGeneral = observationGeneral;
    }

    public String getJury() {
        return jury;
    }

    public void setJury(String jury) {
        this.jury = jury;
    }

    public ZonedDateTime getDateAudit() {
        return dateAudit;
    }

    public void setDateAudit(ZonedDateTime dateAudit) {
        this.dateAudit = dateAudit;
    }

    public ProjectGroupDTO getProjectGroup() {
        return projectGroup;
    }

    public void setProjectGroup(ProjectGroupDTO projectGroup) {
        this.projectGroup = projectGroup;
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
        if (!(o instanceof GeneralObservationDTO)) {
            return false;
        }

        GeneralObservationDTO generalObservationDTO = (GeneralObservationDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, generalObservationDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "GeneralObservationDTO{" +
            "id='" + getId() + "'" +
            ", number=" + getNumber() +
            ", observationGeneral='" + getObservationGeneral() + "'" +
            ", jury='" + getJury() + "'" +
            ", dateAudit='" + getDateAudit() + "'" +
            ", projectGroup=" + getProjectGroup() +
            ", customer=" + getCustomer() +
            "}";
    }
}
