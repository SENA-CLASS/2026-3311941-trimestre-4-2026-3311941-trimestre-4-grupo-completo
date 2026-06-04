package co.edu.sena.service.dto;

import co.edu.sena.domain.enumeration.State;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.Campus} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CampusDTO implements Serializable {

    private String id;

    @NotNull
    @Size(max = 50)
    private String campusName;

    @NotNull
    @Size(max = 400)
    private String campusAddress;

    @NotNull
    private State campusState;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCampusName() {
        return campusName;
    }

    public void setCampusName(String campusName) {
        this.campusName = campusName;
    }

    public String getCampusAddress() {
        return campusAddress;
    }

    public void setCampusAddress(String campusAddress) {
        this.campusAddress = campusAddress;
    }

    public State getCampusState() {
        return campusState;
    }

    public void setCampusState(State campusState) {
        this.campusState = campusState;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CampusDTO)) {
            return false;
        }

        CampusDTO campusDTO = (CampusDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, campusDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CampusDTO{" +
            "id='" + getId() + "'" +
            ", campusName='" + getCampusName() + "'" +
            ", campusAddress='" + getCampusAddress() + "'" +
            ", campusState='" + getCampusState() + "'" +
            "}";
    }
}
