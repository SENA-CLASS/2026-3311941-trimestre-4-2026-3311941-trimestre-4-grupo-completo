package co.edu.sena.domain;

import co.edu.sena.domain.enumeration.Limitation;
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
 * A Classroom.
 */
@Document(collection = "classroom")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Classroom implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Size(max = 50)
    @Field("classroom_number")
    private String classroomNumber;

    @NotNull
    @Size(max = 1000)
    @Field("classroom_description")
    private String classroomDescription;

    @NotNull
    @Field("classroom_state")
    private State classroomState;

    @NotNull
    @Field("limitation")
    private Limitation limitation;

    @DBRef
    @Field("classroomLimitation")
    @JsonIgnoreProperties(value = { "classroom", "learningResult" }, allowSetters = true)
    private Set<ClassroomLimitation> classroomLimitations = new HashSet<>();

    @DBRef
    @Field("schedule")
    @JsonIgnoreProperties(
        value = { "scheduleVersion", "modality", "day", "courseTrimester", "classroom", "instructor" },
        allowSetters = true
    )
    private Set<Schedule> schedules = new HashSet<>();

    @DBRef
    @Field("classroomType")
    @JsonIgnoreProperties(value = { "classrooms" }, allowSetters = true)
    private ClassroomType classroomType;

    @DBRef
    @Field("campus")
    @JsonIgnoreProperties(value = { "classrooms" }, allowSetters = true)
    private Campus campus;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Classroom id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getClassroomNumber() {
        return this.classroomNumber;
    }

    public Classroom classroomNumber(String classroomNumber) {
        this.setClassroomNumber(classroomNumber);
        return this;
    }

    public void setClassroomNumber(String classroomNumber) {
        this.classroomNumber = classroomNumber;
    }

    public String getClassroomDescription() {
        return this.classroomDescription;
    }

    public Classroom classroomDescription(String classroomDescription) {
        this.setClassroomDescription(classroomDescription);
        return this;
    }

    public void setClassroomDescription(String classroomDescription) {
        this.classroomDescription = classroomDescription;
    }

    public State getClassroomState() {
        return this.classroomState;
    }

    public Classroom classroomState(State classroomState) {
        this.setClassroomState(classroomState);
        return this;
    }

    public void setClassroomState(State classroomState) {
        this.classroomState = classroomState;
    }

    public Limitation getLimitation() {
        return this.limitation;
    }

    public Classroom limitation(Limitation limitation) {
        this.setLimitation(limitation);
        return this;
    }

    public void setLimitation(Limitation limitation) {
        this.limitation = limitation;
    }

    public Set<ClassroomLimitation> getClassroomLimitations() {
        return this.classroomLimitations;
    }

    public void setClassroomLimitations(Set<ClassroomLimitation> classroomLimitations) {
        if (this.classroomLimitations != null) {
            this.classroomLimitations.forEach(i -> i.setClassroom(null));
        }
        if (classroomLimitations != null) {
            classroomLimitations.forEach(i -> i.setClassroom(this));
        }
        this.classroomLimitations = classroomLimitations;
    }

    public Classroom classroomLimitations(Set<ClassroomLimitation> classroomLimitations) {
        this.setClassroomLimitations(classroomLimitations);
        return this;
    }

    public Classroom addClassroomLimitation(ClassroomLimitation classroomLimitation) {
        this.classroomLimitations.add(classroomLimitation);
        classroomLimitation.setClassroom(this);
        return this;
    }

    public Classroom removeClassroomLimitation(ClassroomLimitation classroomLimitation) {
        this.classroomLimitations.remove(classroomLimitation);
        classroomLimitation.setClassroom(null);
        return this;
    }

    public Set<Schedule> getSchedules() {
        return this.schedules;
    }

    public void setSchedules(Set<Schedule> schedules) {
        if (this.schedules != null) {
            this.schedules.forEach(i -> i.setClassroom(null));
        }
        if (schedules != null) {
            schedules.forEach(i -> i.setClassroom(this));
        }
        this.schedules = schedules;
    }

    public Classroom schedules(Set<Schedule> schedules) {
        this.setSchedules(schedules);
        return this;
    }

    public Classroom addSchedule(Schedule schedule) {
        this.schedules.add(schedule);
        schedule.setClassroom(this);
        return this;
    }

    public Classroom removeSchedule(Schedule schedule) {
        this.schedules.remove(schedule);
        schedule.setClassroom(null);
        return this;
    }

    public ClassroomType getClassroomType() {
        return this.classroomType;
    }

    public void setClassroomType(ClassroomType classroomType) {
        this.classroomType = classroomType;
    }

    public Classroom classroomType(ClassroomType classroomType) {
        this.setClassroomType(classroomType);
        return this;
    }

    public Campus getCampus() {
        return this.campus;
    }

    public void setCampus(Campus campus) {
        this.campus = campus;
    }

    public Classroom campus(Campus campus) {
        this.setCampus(campus);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Classroom)) {
            return false;
        }
        return getId() != null && getId().equals(((Classroom) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Classroom{" +
            "id=" + getId() +
            ", classroomNumber='" + getClassroomNumber() + "'" +
            ", classroomDescription='" + getClassroomDescription() + "'" +
            ", classroomState='" + getClassroomState() + "'" +
            ", limitation='" + getLimitation() + "'" +
            "}";
    }
}
