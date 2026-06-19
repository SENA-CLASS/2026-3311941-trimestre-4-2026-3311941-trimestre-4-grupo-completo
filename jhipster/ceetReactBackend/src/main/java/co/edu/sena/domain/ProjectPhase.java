package co.edu.sena.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A ProjectPhase.
 */
@Document(collection = "project_phase")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ProjectPhase implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Size(max = 40)
    @Field("project_phase_code")
    private String projectPhaseCode;

    @NotNull
    @Size(max = 40)
    @Field("project_phase_state")
    private String projectPhaseState;

    @DBRef
    @Field("projectActivity")
    @JsonIgnoreProperties(value = { "planningActivities", "projectPhase" }, allowSetters = true)
    private Set<ProjectActivity> projectActivities = new HashSet<>();

    @DBRef
    @Field("project")
    @JsonIgnoreProperties(value = { "projectPhases", "trainingProgram" }, allowSetters = true)
    private Project project;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public ProjectPhase id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProjectPhaseCode() {
        return this.projectPhaseCode;
    }

    public ProjectPhase projectPhaseCode(String projectPhaseCode) {
        this.setProjectPhaseCode(projectPhaseCode);
        return this;
    }

    public void setProjectPhaseCode(String projectPhaseCode) {
        this.projectPhaseCode = projectPhaseCode;
    }

    public String getProjectPhaseState() {
        return this.projectPhaseState;
    }

    public ProjectPhase projectPhaseState(String projectPhaseState) {
        this.setProjectPhaseState(projectPhaseState);
        return this;
    }

    public void setProjectPhaseState(String projectPhaseState) {
        this.projectPhaseState = projectPhaseState;
    }

    public Set<ProjectActivity> getProjectActivities() {
        return this.projectActivities;
    }

    public void setProjectActivities(Set<ProjectActivity> projectActivities) {
        if (this.projectActivities != null) {
            this.projectActivities.forEach(i -> i.setProjectPhase(null));
        }
        if (projectActivities != null) {
            projectActivities.forEach(i -> i.setProjectPhase(this));
        }
        this.projectActivities = projectActivities;
    }

    public ProjectPhase projectActivities(Set<ProjectActivity> projectActivities) {
        this.setProjectActivities(projectActivities);
        return this;
    }

    public ProjectPhase addProjectActivity(ProjectActivity projectActivity) {
        this.projectActivities.add(projectActivity);
        projectActivity.setProjectPhase(this);
        return this;
    }

    public ProjectPhase removeProjectActivity(ProjectActivity projectActivity) {
        this.projectActivities.remove(projectActivity);
        projectActivity.setProjectPhase(null);
        return this;
    }

    public Project getProject() {
        return this.project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public ProjectPhase project(Project project) {
        this.setProject(project);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProjectPhase)) {
            return false;
        }
        return getId() != null && getId().equals(((ProjectPhase) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProjectPhase{" +
            "id=" + getId() +
            ", projectPhaseCode='" + getProjectPhaseCode() + "'" +
            ", projectPhaseState='" + getProjectPhaseState() + "'" +
            "}";
    }
}
