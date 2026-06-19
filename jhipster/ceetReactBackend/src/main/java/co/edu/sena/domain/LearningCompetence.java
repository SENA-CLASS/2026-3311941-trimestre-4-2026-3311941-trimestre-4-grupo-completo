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
 * A LearningCompetence.
 */
@Document(collection = "learning_competence")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class LearningCompetence implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Size(max = 50)
    @Field("competence_code")
    private String competenceCode;

    @NotNull
    @Size(max = 1000)
    @Field("competition_denomination")
    private String competitionDenomination;

    @DBRef
    @Field("learningResult")
    @JsonIgnoreProperties(
        value = { "quarterSchedules", "classroomLimitations", "itemLists", "viewedResults", "learningCompetence" },
        allowSetters = true
    )
    private Set<LearningResult> learningResults = new HashSet<>();

    @DBRef
    @Field("bondingCompetence")
    @JsonIgnoreProperties(value = { "bondingInstructor", "learningCompetence" }, allowSetters = true)
    private Set<BondingCompetence> bondingCompetences = new HashSet<>();

    @DBRef
    @Field("trainingProgram")
    @JsonIgnoreProperties(value = { "courses", "learningCompetences", "projects", "checkLists", "levelEducation" }, allowSetters = true)
    private TrainingProgram trainingProgram;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public LearningCompetence id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCompetenceCode() {
        return this.competenceCode;
    }

    public LearningCompetence competenceCode(String competenceCode) {
        this.setCompetenceCode(competenceCode);
        return this;
    }

    public void setCompetenceCode(String competenceCode) {
        this.competenceCode = competenceCode;
    }

    public String getCompetitionDenomination() {
        return this.competitionDenomination;
    }

    public LearningCompetence competitionDenomination(String competitionDenomination) {
        this.setCompetitionDenomination(competitionDenomination);
        return this;
    }

    public void setCompetitionDenomination(String competitionDenomination) {
        this.competitionDenomination = competitionDenomination;
    }

    public Set<LearningResult> getLearningResults() {
        return this.learningResults;
    }

    public void setLearningResults(Set<LearningResult> learningResults) {
        if (this.learningResults != null) {
            this.learningResults.forEach(i -> i.setLearningCompetence(null));
        }
        if (learningResults != null) {
            learningResults.forEach(i -> i.setLearningCompetence(this));
        }
        this.learningResults = learningResults;
    }

    public LearningCompetence learningResults(Set<LearningResult> learningResults) {
        this.setLearningResults(learningResults);
        return this;
    }

    public LearningCompetence addLearningResult(LearningResult learningResult) {
        this.learningResults.add(learningResult);
        learningResult.setLearningCompetence(this);
        return this;
    }

    public LearningCompetence removeLearningResult(LearningResult learningResult) {
        this.learningResults.remove(learningResult);
        learningResult.setLearningCompetence(null);
        return this;
    }

    public Set<BondingCompetence> getBondingCompetences() {
        return this.bondingCompetences;
    }

    public void setBondingCompetences(Set<BondingCompetence> bondingCompetences) {
        if (this.bondingCompetences != null) {
            this.bondingCompetences.forEach(i -> i.setLearningCompetence(null));
        }
        if (bondingCompetences != null) {
            bondingCompetences.forEach(i -> i.setLearningCompetence(this));
        }
        this.bondingCompetences = bondingCompetences;
    }

    public LearningCompetence bondingCompetences(Set<BondingCompetence> bondingCompetences) {
        this.setBondingCompetences(bondingCompetences);
        return this;
    }

    public LearningCompetence addBondingCompetence(BondingCompetence bondingCompetence) {
        this.bondingCompetences.add(bondingCompetence);
        bondingCompetence.setLearningCompetence(this);
        return this;
    }

    public LearningCompetence removeBondingCompetence(BondingCompetence bondingCompetence) {
        this.bondingCompetences.remove(bondingCompetence);
        bondingCompetence.setLearningCompetence(null);
        return this;
    }

    public TrainingProgram getTrainingProgram() {
        return this.trainingProgram;
    }

    public void setTrainingProgram(TrainingProgram trainingProgram) {
        this.trainingProgram = trainingProgram;
    }

    public LearningCompetence trainingProgram(TrainingProgram trainingProgram) {
        this.setTrainingProgram(trainingProgram);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LearningCompetence)) {
            return false;
        }
        return getId() != null && getId().equals(((LearningCompetence) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LearningCompetence{" +
            "id=" + getId() +
            ", competenceCode='" + getCompetenceCode() + "'" +
            ", competitionDenomination='" + getCompetitionDenomination() + "'" +
            "}";
    }
}
