package co.edu.sena.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serial;
import java.io.Serializable;
import java.time.Duration;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Schedule.
 */
@Document(collection = "schedule")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Schedule implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("start_time")
    private Duration startTime;

    @NotNull
    @Field("end_time")
    private Duration endTime;

    @DBRef
    @Field("scheduleVersion")
    @JsonIgnoreProperties(value = { "schedules", "currentQuarter" }, allowSetters = true)
    private ScheduleVersion scheduleVersion;

    @DBRef
    @Field("modality")
    @JsonIgnoreProperties(value = { "schedules" }, allowSetters = true)
    private Modality modality;

    @DBRef
    @Field("day")
    @JsonIgnoreProperties(value = { "schedules", "workingDays" }, allowSetters = true)
    private Day day;

    @DBRef
    @Field("courseTrimester")
    @JsonIgnoreProperties(value = { "viewedResults", "schedules", "course", "trimester" }, allowSetters = true)
    private CourseTrimester courseTrimester;

    @DBRef
    @Field("classroom")
    @JsonIgnoreProperties(value = { "classroomLimitations", "schedules", "classroomType", "campus" }, allowSetters = true)
    private Classroom classroom;

    @DBRef
    @Field("instructor")
    @JsonIgnoreProperties(value = { "areaInstructors", "bondingInstructors", "schedules", "customer" }, allowSetters = true)
    private Instructor instructor;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Schedule id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Duration getStartTime() {
        return this.startTime;
    }

    public Schedule startTime(Duration startTime) {
        this.setStartTime(startTime);
        return this;
    }

    public void setStartTime(Duration startTime) {
        this.startTime = startTime;
    }

    public Duration getEndTime() {
        return this.endTime;
    }

    public Schedule endTime(Duration endTime) {
        this.setEndTime(endTime);
        return this;
    }

    public void setEndTime(Duration endTime) {
        this.endTime = endTime;
    }

    public ScheduleVersion getScheduleVersion() {
        return this.scheduleVersion;
    }

    public void setScheduleVersion(ScheduleVersion scheduleVersion) {
        this.scheduleVersion = scheduleVersion;
    }

    public Schedule scheduleVersion(ScheduleVersion scheduleVersion) {
        this.setScheduleVersion(scheduleVersion);
        return this;
    }

    public Modality getModality() {
        return this.modality;
    }

    public void setModality(Modality modality) {
        this.modality = modality;
    }

    public Schedule modality(Modality modality) {
        this.setModality(modality);
        return this;
    }

    public Day getDay() {
        return this.day;
    }

    public void setDay(Day day) {
        this.day = day;
    }

    public Schedule day(Day day) {
        this.setDay(day);
        return this;
    }

    public CourseTrimester getCourseTrimester() {
        return this.courseTrimester;
    }

    public void setCourseTrimester(CourseTrimester courseTrimester) {
        this.courseTrimester = courseTrimester;
    }

    public Schedule courseTrimester(CourseTrimester courseTrimester) {
        this.setCourseTrimester(courseTrimester);
        return this;
    }

    public Classroom getClassroom() {
        return this.classroom;
    }

    public void setClassroom(Classroom classroom) {
        this.classroom = classroom;
    }

    public Schedule classroom(Classroom classroom) {
        this.setClassroom(classroom);
        return this;
    }

    public Instructor getInstructor() {
        return this.instructor;
    }

    public void setInstructor(Instructor instructor) {
        this.instructor = instructor;
    }

    public Schedule instructor(Instructor instructor) {
        this.setInstructor(instructor);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Schedule)) {
            return false;
        }
        return getId() != null && getId().equals(((Schedule) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Schedule{" +
            "id=" + getId() +
            ", startTime='" + getStartTime() + "'" +
            ", endTime='" + getEndTime() + "'" +
            "}";
    }
}
