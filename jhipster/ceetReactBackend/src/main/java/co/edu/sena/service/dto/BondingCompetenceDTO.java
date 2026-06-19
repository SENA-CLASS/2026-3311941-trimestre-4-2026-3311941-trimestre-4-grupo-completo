package co.edu.sena.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.BondingCompetence} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class BondingCompetenceDTO implements Serializable {

    private String id;

    @NotNull
    private BondingInstructorDTO bondingInstructor;

    @NotNull
    private LearningCompetenceDTO learningCompetence;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public BondingInstructorDTO getBondingInstructor() {
        return bondingInstructor;
    }

    public void setBondingInstructor(BondingInstructorDTO bondingInstructor) {
        this.bondingInstructor = bondingInstructor;
    }

    public LearningCompetenceDTO getLearningCompetence() {
        return learningCompetence;
    }

    public void setLearningCompetence(LearningCompetenceDTO learningCompetence) {
        this.learningCompetence = learningCompetence;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BondingCompetenceDTO)) {
            return false;
        }

        BondingCompetenceDTO bondingCompetenceDTO = (BondingCompetenceDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, bondingCompetenceDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BondingCompetenceDTO{" +
            "id='" + getId() + "'" +
            ", bondingInstructor=" + getBondingInstructor() +
            ", learningCompetence=" + getLearningCompetence() +
            "}";
    }
}
