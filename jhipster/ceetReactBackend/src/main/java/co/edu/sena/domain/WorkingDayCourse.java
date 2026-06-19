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
 * A WorkingDayCourse.
 */
@Document(collection = "working_day_course")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class WorkingDayCourse implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Size(max = 20)
    @Field("working_day_acronym")
    private String workingDayAcronym;

    @NotNull
    @Size(max = 40)
    @Field("working_day_name")
    private String workingDayName;

    @NotNull
    @Size(max = 100)
    @Field("description")
    private String description;

    @Size(max = 100)
    @Field("image_url")
    private String imageUrl;

    @NotNull
    @Field("state_working_day")
    private State stateWorkingDay;

    @DBRef
    @Field("course")
    @JsonIgnoreProperties(
        value = {
            "apprentices",
            "courseTrimesters",
            "coursePlannings",
            "projectGroups",
            "checkListCourses",
            "courseStatus",
            "workingDayCourse",
            "trainingProgram",
        },
        allowSetters = true
    )
    private Set<Course> courses = new HashSet<>();

    @DBRef
    @Field("trimester")
    @JsonIgnoreProperties(value = { "courseTrimesters", "quarterSchedules", "workingDayCourse", "levelEducations" }, allowSetters = true)
    private Set<Trimester> trimesters = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public WorkingDayCourse id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getWorkingDayAcronym() {
        return this.workingDayAcronym;
    }

    public WorkingDayCourse workingDayAcronym(String workingDayAcronym) {
        this.setWorkingDayAcronym(workingDayAcronym);
        return this;
    }

    public void setWorkingDayAcronym(String workingDayAcronym) {
        this.workingDayAcronym = workingDayAcronym;
    }

    public String getWorkingDayName() {
        return this.workingDayName;
    }

    public WorkingDayCourse workingDayName(String workingDayName) {
        this.setWorkingDayName(workingDayName);
        return this;
    }

    public void setWorkingDayName(String workingDayName) {
        this.workingDayName = workingDayName;
    }

    public String getDescription() {
        return this.description;
    }

    public WorkingDayCourse description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return this.imageUrl;
    }

    public WorkingDayCourse imageUrl(String imageUrl) {
        this.setImageUrl(imageUrl);
        return this;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public State getStateWorkingDay() {
        return this.stateWorkingDay;
    }

    public WorkingDayCourse stateWorkingDay(State stateWorkingDay) {
        this.setStateWorkingDay(stateWorkingDay);
        return this;
    }

    public void setStateWorkingDay(State stateWorkingDay) {
        this.stateWorkingDay = stateWorkingDay;
    }

    public Set<Course> getCourses() {
        return this.courses;
    }

    public void setCourses(Set<Course> courses) {
        if (this.courses != null) {
            this.courses.forEach(i -> i.setWorkingDayCourse(null));
        }
        if (courses != null) {
            courses.forEach(i -> i.setWorkingDayCourse(this));
        }
        this.courses = courses;
    }

    public WorkingDayCourse courses(Set<Course> courses) {
        this.setCourses(courses);
        return this;
    }

    public WorkingDayCourse addCourse(Course course) {
        this.courses.add(course);
        course.setWorkingDayCourse(this);
        return this;
    }

    public WorkingDayCourse removeCourse(Course course) {
        this.courses.remove(course);
        course.setWorkingDayCourse(null);
        return this;
    }

    public Set<Trimester> getTrimesters() {
        return this.trimesters;
    }

    public void setTrimesters(Set<Trimester> trimesters) {
        if (this.trimesters != null) {
            this.trimesters.forEach(i -> i.setWorkingDayCourse(null));
        }
        if (trimesters != null) {
            trimesters.forEach(i -> i.setWorkingDayCourse(this));
        }
        this.trimesters = trimesters;
    }

    public WorkingDayCourse trimesters(Set<Trimester> trimesters) {
        this.setTrimesters(trimesters);
        return this;
    }

    public WorkingDayCourse addTrimester(Trimester trimester) {
        this.trimesters.add(trimester);
        trimester.setWorkingDayCourse(this);
        return this;
    }

    public WorkingDayCourse removeTrimester(Trimester trimester) {
        this.trimesters.remove(trimester);
        trimester.setWorkingDayCourse(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WorkingDayCourse)) {
            return false;
        }
        return getId() != null && getId().equals(((WorkingDayCourse) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WorkingDayCourse{" +
            "id=" + getId() +
            ", workingDayAcronym='" + getWorkingDayAcronym() + "'" +
            ", workingDayName='" + getWorkingDayName() + "'" +
            ", description='" + getDescription() + "'" +
            ", imageUrl='" + getImageUrl() + "'" +
            ", stateWorkingDay='" + getStateWorkingDay() + "'" +
            "}";
    }
}
