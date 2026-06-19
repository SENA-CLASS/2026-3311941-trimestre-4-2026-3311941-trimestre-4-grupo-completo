package co.edu.sena.service.dto;

import co.edu.sena.domain.enumeration.State;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.Planning} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class PlanningDTO implements Serializable {

    private String id;

    @NotNull
    @Size(max = 40)
    private String planningCode;

    @NotNull
    private ZonedDateTime planningDate;

    @NotNull
    private State planningState;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPlanningCode() {
        return planningCode;
    }

    public void setPlanningCode(String planningCode) {
        this.planningCode = planningCode;
    }

    public ZonedDateTime getPlanningDate() {
        return planningDate;
    }

    public void setPlanningDate(ZonedDateTime planningDate) {
        this.planningDate = planningDate;
    }

    public State getPlanningState() {
        return planningState;
    }

    public void setPlanningState(State planningState) {
        this.planningState = planningState;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PlanningDTO)) {
            return false;
        }

        PlanningDTO planningDTO = (PlanningDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, planningDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PlanningDTO{" +
            "id='" + getId() + "'" +
            ", planningCode='" + getPlanningCode() + "'" +
            ", planningDate='" + getPlanningDate() + "'" +
            ", planningState='" + getPlanningState() + "'" +
            "}";
    }
}
