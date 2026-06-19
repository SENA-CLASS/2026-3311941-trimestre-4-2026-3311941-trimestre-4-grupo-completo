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
 * A LevelEducation.
 */
@Document(collection = "level_education")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class LevelEducation implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Size(max = 40)
    @Field("level_name")
    private String levelName;

    @NotNull
    @Field("state_level_education")
    private State stateLevelEducation;

    @DBRef
    @Field("trainingProgram")
    @JsonIgnoreProperties(value = { "courses", "learningCompetences", "projects", "checkLists", "levelEducation" }, allowSetters = true)
    private Set<TrainingProgram> trainingPrograms = new HashSet<>();

    @DBRef
    @Field("trimester")
    @JsonIgnoreProperties(value = { "courseTrimesters", "quarterSchedules", "workingDayCourse", "levelEducations" }, allowSetters = true)
    private Set<Trimester> trimesters = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public LevelEducation id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLevelName() {
        return this.levelName;
    }

    public LevelEducation levelName(String levelName) {
        this.setLevelName(levelName);
        return this;
    }

    public void setLevelName(String levelName) {
        this.levelName = levelName;
    }

    public State getStateLevelEducation() {
        return this.stateLevelEducation;
    }

    public LevelEducation stateLevelEducation(State stateLevelEducation) {
        this.setStateLevelEducation(stateLevelEducation);
        return this;
    }

    public void setStateLevelEducation(State stateLevelEducation) {
        this.stateLevelEducation = stateLevelEducation;
    }

    public Set<TrainingProgram> getTrainingPrograms() {
        return this.trainingPrograms;
    }

    public void setTrainingPrograms(Set<TrainingProgram> trainingPrograms) {
        if (this.trainingPrograms != null) {
            this.trainingPrograms.forEach(i -> i.setLevelEducation(null));
        }
        if (trainingPrograms != null) {
            trainingPrograms.forEach(i -> i.setLevelEducation(this));
        }
        this.trainingPrograms = trainingPrograms;
    }

    public LevelEducation trainingPrograms(Set<TrainingProgram> trainingPrograms) {
        this.setTrainingPrograms(trainingPrograms);
        return this;
    }

    public LevelEducation addTrainingProgram(TrainingProgram trainingProgram) {
        this.trainingPrograms.add(trainingProgram);
        trainingProgram.setLevelEducation(this);
        return this;
    }

    public LevelEducation removeTrainingProgram(TrainingProgram trainingProgram) {
        this.trainingPrograms.remove(trainingProgram);
        trainingProgram.setLevelEducation(null);
        return this;
    }

    public Set<Trimester> getTrimesters() {
        return this.trimesters;
    }

    public void setTrimesters(Set<Trimester> trimesters) {
        if (this.trimesters != null) {
            this.trimesters.forEach(i -> i.setLevelEducations(null));
        }
        if (trimesters != null) {
            trimesters.forEach(i -> i.setLevelEducations(this));
        }
        this.trimesters = trimesters;
    }

    public LevelEducation trimesters(Set<Trimester> trimesters) {
        this.setTrimesters(trimesters);
        return this;
    }

    public LevelEducation addTrimester(Trimester trimester) {
        this.trimesters.add(trimester);
        trimester.setLevelEducations(this);
        return this;
    }

    public LevelEducation removeTrimester(Trimester trimester) {
        this.trimesters.remove(trimester);
        trimester.setLevelEducations(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LevelEducation)) {
            return false;
        }
        return getId() != null && getId().equals(((LevelEducation) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LevelEducation{" +
            "id=" + getId() +
            ", levelName='" + getLevelName() + "'" +
            ", stateLevelEducation='" + getStateLevelEducation() + "'" +
            "}";
    }
}
