package co.edu.sena.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serial;
import java.io.Serializable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A BondingCompetence.
 */
@Document(collection = "bonding_competence")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class BondingCompetence implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @DBRef
    @Field("bondingInstructor")
    @JsonIgnoreProperties(value = { "boundingSchedules", "bondingCompetences", "year", "instructor", "bonding" }, allowSetters = true)
    private BondingInstructor bondingInstructor;

    @DBRef
    @Field("learningCompetence")
    @JsonIgnoreProperties(value = { "learningResults", "bondingCompetences", "trainingProgram" }, allowSetters = true)
    private LearningCompetence learningCompetence;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public BondingCompetence id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public BondingInstructor getBondingInstructor() {
        return this.bondingInstructor;
    }

    public void setBondingInstructor(BondingInstructor bondingInstructor) {
        this.bondingInstructor = bondingInstructor;
    }

    public BondingCompetence bondingInstructor(BondingInstructor bondingInstructor) {
        this.setBondingInstructor(bondingInstructor);
        return this;
    }

    public LearningCompetence getLearningCompetence() {
        return this.learningCompetence;
    }

    public void setLearningCompetence(LearningCompetence learningCompetence) {
        this.learningCompetence = learningCompetence;
    }

    public BondingCompetence learningCompetence(LearningCompetence learningCompetence) {
        this.setLearningCompetence(learningCompetence);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BondingCompetence)) {
            return false;
        }
        return getId() != null && getId().equals(((BondingCompetence) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BondingCompetence{" +
            "id=" + getId() +
            "}";
    }
}
