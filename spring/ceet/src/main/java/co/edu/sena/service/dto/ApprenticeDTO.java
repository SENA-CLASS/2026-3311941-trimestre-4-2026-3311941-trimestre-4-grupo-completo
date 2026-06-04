package co.edu.sena.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.Apprentice} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ApprenticeDTO implements Serializable {

    private String id;

    @NotNull
    private CustomerDTO customer;

    @NotNull
    private TrainingStatusDTO trainingStatus;

    @NotNull
    private CourseDTO course;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public CustomerDTO getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerDTO customer) {
        this.customer = customer;
    }

    public TrainingStatusDTO getTrainingStatus() {
        return trainingStatus;
    }

    public void setTrainingStatus(TrainingStatusDTO trainingStatus) {
        this.trainingStatus = trainingStatus;
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
        if (!(o instanceof ApprenticeDTO)) {
            return false;
        }

        ApprenticeDTO apprenticeDTO = (ApprenticeDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, apprenticeDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ApprenticeDTO{" +
            "id='" + getId() + "'" +
            ", customer=" + getCustomer() +
            ", trainingStatus=" + getTrainingStatus() +
            ", course=" + getCourse() +
            "}";
    }
}
