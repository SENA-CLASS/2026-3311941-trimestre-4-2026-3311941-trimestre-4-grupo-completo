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
 * A TrainingStatus.
 */
@Document(collection = "training_status")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TrainingStatus implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Size(max = 40)
    @Field("status_name")
    private String statusName;

    @NotNull
    @Field("state_training")
    private State stateTraining;

    @DBRef
    @Field("apprentice")
    @JsonIgnoreProperties(value = { "memberGroups", "customer", "trainingStatus", "course" }, allowSetters = true)
    private Set<Apprentice> apprentices = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public TrainingStatus id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStatusName() {
        return this.statusName;
    }

    public TrainingStatus statusName(String statusName) {
        this.setStatusName(statusName);
        return this;
    }

    public void setStatusName(String statusName) {
        this.statusName = statusName;
    }

    public State getStateTraining() {
        return this.stateTraining;
    }

    public TrainingStatus stateTraining(State stateTraining) {
        this.setStateTraining(stateTraining);
        return this;
    }

    public void setStateTraining(State stateTraining) {
        this.stateTraining = stateTraining;
    }

    public Set<Apprentice> getApprentices() {
        return this.apprentices;
    }

    public void setApprentices(Set<Apprentice> apprentices) {
        if (this.apprentices != null) {
            this.apprentices.forEach(i -> i.setTrainingStatus(null));
        }
        if (apprentices != null) {
            apprentices.forEach(i -> i.setTrainingStatus(this));
        }
        this.apprentices = apprentices;
    }

    public TrainingStatus apprentices(Set<Apprentice> apprentices) {
        this.setApprentices(apprentices);
        return this;
    }

    public TrainingStatus addApprentice(Apprentice apprentice) {
        this.apprentices.add(apprentice);
        apprentice.setTrainingStatus(this);
        return this;
    }

    public TrainingStatus removeApprentice(Apprentice apprentice) {
        this.apprentices.remove(apprentice);
        apprentice.setTrainingStatus(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TrainingStatus)) {
            return false;
        }
        return getId() != null && getId().equals(((TrainingStatus) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TrainingStatus{" +
            "id=" + getId() +
            ", statusName='" + getStatusName() + "'" +
            ", stateTraining='" + getStateTraining() + "'" +
            "}";
    }
}
