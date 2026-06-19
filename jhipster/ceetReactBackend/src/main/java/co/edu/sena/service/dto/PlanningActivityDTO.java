package co.edu.sena.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.PlanningActivity} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class PlanningActivityDTO implements Serializable {

    private String id;

    @NotNull
    private QuarterScheduleDTO quarterSchedule;

    @NotNull
    private ProjectActivityDTO projectActivity;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public QuarterScheduleDTO getQuarterSchedule() {
        return quarterSchedule;
    }

    public void setQuarterSchedule(QuarterScheduleDTO quarterSchedule) {
        this.quarterSchedule = quarterSchedule;
    }

    public ProjectActivityDTO getProjectActivity() {
        return projectActivity;
    }

    public void setProjectActivity(ProjectActivityDTO projectActivity) {
        this.projectActivity = projectActivity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PlanningActivityDTO)) {
            return false;
        }

        PlanningActivityDTO planningActivityDTO = (PlanningActivityDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, planningActivityDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PlanningActivityDTO{" +
            "id='" + getId() + "'" +
            ", quarterSchedule=" + getQuarterSchedule() +
            ", projectActivity=" + getProjectActivity() +
            "}";
    }
}
