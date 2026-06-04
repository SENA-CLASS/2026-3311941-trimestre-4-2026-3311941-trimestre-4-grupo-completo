package co.edu.sena.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.ProjectPhase} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ProjectPhaseDTO implements Serializable {

    private String id;

    @NotNull
    @Size(max = 40)
    private String projectPhaseCode;

    @NotNull
    @Size(max = 40)
    private String projectPhaseState;

    @NotNull
    private ProjectDTO project;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProjectPhaseCode() {
        return projectPhaseCode;
    }

    public void setProjectPhaseCode(String projectPhaseCode) {
        this.projectPhaseCode = projectPhaseCode;
    }

    public String getProjectPhaseState() {
        return projectPhaseState;
    }

    public void setProjectPhaseState(String projectPhaseState) {
        this.projectPhaseState = projectPhaseState;
    }

    public ProjectDTO getProject() {
        return project;
    }

    public void setProject(ProjectDTO project) {
        this.project = project;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProjectPhaseDTO)) {
            return false;
        }

        ProjectPhaseDTO projectPhaseDTO = (ProjectPhaseDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, projectPhaseDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProjectPhaseDTO{" +
            "id='" + getId() + "'" +
            ", projectPhaseCode='" + getProjectPhaseCode() + "'" +
            ", projectPhaseState='" + getProjectPhaseState() + "'" +
            ", project=" + getProject() +
            "}";
    }
}
