package co.edu.sena.domain;

import co.edu.sena.domain.enumeration.State;
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
 * A Project.
 */
@Document(collection = "project")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Project implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Size(max = 40)
    @Field("project_code")
    private String projectCode;

    @NotNull
    @Size(max = 500)
    @Field("project_name")
    private String projectName;

    @NotNull
    @Field("project_state")
    private State projectState;

    @DBRef
    @Field("projectPhase")
    @JsonIgnoreProperties(value = { "projectActivities", "project" }, allowSetters = true)
    private Set<ProjectPhase> projectPhases = new HashSet<>();

    @DBRef
    @Field("trainingProgram")
    @JsonIgnoreProperties(value = { "courses", "learningCompetences", "projects", "checkLists", "levelEducation" }, allowSetters = true)
    private TrainingProgram trainingProgram;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Project id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProjectCode() {
        return this.projectCode;
    }

    public Project projectCode(String projectCode) {
        this.setProjectCode(projectCode);
        return this;
    }

    public void setProjectCode(String projectCode) {
        this.projectCode = projectCode;
    }

    public String getProjectName() {
        return this.projectName;
    }

    public Project projectName(String projectName) {
        this.setProjectName(projectName);
        return this;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public State getProjectState() {
        return this.projectState;
    }

    public Project projectState(State projectState) {
        this.setProjectState(projectState);
        return this;
    }

    public void setProjectState(State projectState) {
        this.projectState = projectState;
    }

    public Set<ProjectPhase> getProjectPhases() {
        return this.projectPhases;
    }

    public void setProjectPhases(Set<ProjectPhase> projectPhases) {
        if (this.projectPhases != null) {
            this.projectPhases.forEach(i -> i.setProject(null));
        }
        if (projectPhases != null) {
            projectPhases.forEach(i -> i.setProject(this));
        }
        this.projectPhases = projectPhases;
    }

    public Project projectPhases(Set<ProjectPhase> projectPhases) {
        this.setProjectPhases(projectPhases);
        return this;
    }

    public Project addProjectPhase(ProjectPhase projectPhase) {
        this.projectPhases.add(projectPhase);
        projectPhase.setProject(this);
        return this;
    }

    public Project removeProjectPhase(ProjectPhase projectPhase) {
        this.projectPhases.remove(projectPhase);
        projectPhase.setProject(null);
        return this;
    }

    public TrainingProgram getTrainingProgram() {
        return this.trainingProgram;
    }

    public void setTrainingProgram(TrainingProgram trainingProgram) {
        this.trainingProgram = trainingProgram;
    }

    public Project trainingProgram(TrainingProgram trainingProgram) {
        this.setTrainingProgram(trainingProgram);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Project)) {
            return false;
        }
        return getId() != null && getId().equals(((Project) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Project{" +
            "id=" + getId() +
            ", projectCode='" + getProjectCode() + "'" +
            ", projectName='" + getProjectName() + "'" +
            ", projectState='" + getProjectState() + "'" +
            "}";
    }
}
