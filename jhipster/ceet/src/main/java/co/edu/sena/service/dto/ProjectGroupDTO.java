package co.edu.sena.service.dto;

import co.edu.sena.domain.enumeration.State;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.ProjectGroup} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ProjectGroupDTO implements Serializable {

    private String id;

    @NotNull
    private Integer groupNumber;

    @NotNull
    @Size(max = 300)
    private String projectName;

    @NotNull
    private State projectGroupState;

    @NotNull
    private CourseDTO course;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getGroupNumber() {
        return groupNumber;
    }

    public void setGroupNumber(Integer groupNumber) {
        this.groupNumber = groupNumber;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public State getProjectGroupState() {
        return projectGroupState;
    }

    public void setProjectGroupState(State projectGroupState) {
        this.projectGroupState = projectGroupState;
    }

    public CourseDTO getCourse() {
        return course;
    }

    public void setCourse(CourseDTO course) {
        this.course = course;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProjectGroupDTO)) {
            return false;
        }

        ProjectGroupDTO projectGroupDTO = (ProjectGroupDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, projectGroupDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProjectGroupDTO{" +
            "id='" + getId() + "'" +
            ", groupNumber=" + getGroupNumber() +
            ", projectName='" + getProjectName() + "'" +
            ", projectGroupState='" + getProjectGroupState() + "'" +
            ", course=" + getCourse() +
            "}";
    }
}
