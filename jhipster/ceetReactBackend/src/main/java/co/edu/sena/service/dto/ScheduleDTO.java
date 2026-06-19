package co.edu.sena.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Duration;
import java.util.Objects;

/**
 * A DTO for the {@link co.edu.sena.domain.Schedule} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ScheduleDTO implements Serializable {

    private String id;

    @NotNull
    private Duration startTime;

    @NotNull
    private Duration endTime;

    @NotNull
    private ScheduleVersionDTO scheduleVersion;

    @NotNull
    private ModalityDTO modality;

    @NotNull
    private DayDTO day;

    @NotNull
    private CourseTrimesterDTO courseTrimester;

    @NotNull
    private ClassroomDTO classroom;

    @NotNull
    private InstructorDTO instructor;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Duration getStartTime() {
        return startTime;
    }

    public void setStartTime(Duration startTime) {
        this.startTime = startTime;
    }

    public Duration getEndTime() {
        return endTime;
    }

    public void setEndTime(Duration endTime) {
        this.endTime = endTime;
    }

    public ScheduleVersionDTO getScheduleVersion() {
        return scheduleVersion;
    }

    public void setScheduleVersion(ScheduleVersionDTO scheduleVersion) {
        this.scheduleVersion = scheduleVersion;
    }

    public ModalityDTO getModality() {
        return modality;
    }

    public void setModality(ModalityDTO modality) {
        this.modality = modality;
    }

    public DayDTO getDay() {
        return day;
    }

    public void setDay(DayDTO day) {
        this.day = day;
    }

    public CourseTrimesterDTO getCourseTrimester() {
        return courseTrimester;
    }

    public void setCourseTrimester(CourseTrimesterDTO courseTrimester) {
        this.courseTrimester = courseTrimester;
    }

    public ClassroomDTO getClassroom() {
        return classroom;
    }

    public void setClassroom(ClassroomDTO classroom) {
        this.classroom = classroom;
    }

    public InstructorDTO getInstructor() {
        return instructor;
    }

    public void setInstructor(InstructorDTO instructor) {
        this.instructor = instructor;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ScheduleDTO)) {
            return false;
        }

        ScheduleDTO scheduleDTO = (ScheduleDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, scheduleDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ScheduleDTO{" +
            "id='" + getId() + "'" +
            ", startTime='" + getStartTime() + "'" +
            ", endTime='" + getEndTime() + "'" +
            ", scheduleVersion=" + getScheduleVersion() +
            ", modality=" + getModality() +
            ", day=" + getDay() +
            ", courseTrimester=" + getCourseTrimester() +
            ", classroom=" + getClassroom() +
            ", instructor=" + getInstructor() +
            "}";
    }
}
