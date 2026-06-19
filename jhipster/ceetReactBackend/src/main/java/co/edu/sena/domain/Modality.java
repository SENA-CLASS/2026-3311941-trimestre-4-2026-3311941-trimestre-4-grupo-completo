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
 * A Modality.
 */
@Document(collection = "modality")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Modality implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Size(max = 40)
    @Field("modality_name")
    private String modalityName;

    @NotNull
    @Size(max = 50)
    @Field("modality_color")
    private String modalityColor;

    @NotNull
    @Field("modality_state")
    private State modalityState;

    @DBRef
    @Field("schedule")
    @JsonIgnoreProperties(
        value = { "scheduleVersion", "modality", "day", "courseTrimester", "classroom", "instructor" },
        allowSetters = true
    )
    private Set<Schedule> schedules = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Modality id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getModalityName() {
        return this.modalityName;
    }

    public Modality modalityName(String modalityName) {
        this.setModalityName(modalityName);
        return this;
    }

    public void setModalityName(String modalityName) {
        this.modalityName = modalityName;
    }

    public String getModalityColor() {
        return this.modalityColor;
    }

    public Modality modalityColor(String modalityColor) {
        this.setModalityColor(modalityColor);
        return this;
    }

    public void setModalityColor(String modalityColor) {
        this.modalityColor = modalityColor;
    }

    public State getModalityState() {
        return this.modalityState;
    }

    public Modality modalityState(State modalityState) {
        this.setModalityState(modalityState);
        return this;
    }

    public void setModalityState(State modalityState) {
        this.modalityState = modalityState;
    }

    public Set<Schedule> getSchedules() {
        return this.schedules;
    }

    public void setSchedules(Set<Schedule> schedules) {
        if (this.schedules != null) {
            this.schedules.forEach(i -> i.setModality(null));
        }
        if (schedules != null) {
            schedules.forEach(i -> i.setModality(this));
        }
        this.schedules = schedules;
    }

    public Modality schedules(Set<Schedule> schedules) {
        this.setSchedules(schedules);
        return this;
    }

    public Modality addSchedule(Schedule schedule) {
        this.schedules.add(schedule);
        schedule.setModality(this);
        return this;
    }

    public Modality removeSchedule(Schedule schedule) {
        this.schedules.remove(schedule);
        schedule.setModality(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Modality)) {
            return false;
        }
        return getId() != null && getId().equals(((Modality) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Modality{" +
            "id=" + getId() +
            ", modalityName='" + getModalityName() + "'" +
            ", modalityColor='" + getModalityColor() + "'" +
            ", modalityState='" + getModalityState() + "'" +
            "}";
    }
}
