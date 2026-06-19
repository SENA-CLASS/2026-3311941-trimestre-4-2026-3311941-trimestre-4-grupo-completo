package co.edu.sena.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.ProjectActivity} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ProjectActivityDTO implements Serializable {

    private String id;

    @NotNull
    private Integer activityNumber;

    @NotNull
    @Size(max = 400)
    private String activityDescription;

    @NotNull
    @Size(max = 40)
    private String projectActivityState;

    @NotNull
    private ProjectPhaseDTO projectPhase;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getActivityNumber() {
        return activityNumber;
    }

    public void setActivityNumber(Integer activityNumber) {
        this.activityNumber = activityNumber;
    }

    public String getActivityDescription() {
        return activityDescription;
    }

    public void setActivityDescription(String activityDescription) {
        this.activityDescription = activityDescription;
    }

    public String getProjectActivityState() {
        return projectActivityState;
    }

    public void setProjectActivityState(String projectActivityState) {
        this.projectActivityState = projectActivityState;
    }

    public ProjectPhaseDTO getProjectPhase() {
        return projectPhase;
    }

    public void setProjectPhase(ProjectPhaseDTO projectPhase) {
        this.projectPhase = projectPhase;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProjectActivityDTO)) {
            return false;
        }

        ProjectActivityDTO projectActivityDTO = (ProjectActivityDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, projectActivityDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProjectActivityDTO{" +
            "id='" + getId() + "'" +
            ", activityNumber=" + getActivityNumber() +
            ", activityDescription='" + getActivityDescription() + "'" +
            ", projectActivityState='" + getProjectActivityState() + "'" +
            ", projectPhase=" + getProjectPhase() +
            "}";
    }
}
