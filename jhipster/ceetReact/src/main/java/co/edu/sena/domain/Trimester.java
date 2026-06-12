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
 * A Trimester.
 */
@Document(collection = "trimester")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Trimester implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("trimester_name")
    private Integer trimesterName;

    @Field("trimester_state")
    private String trimesterState;

    @DBRef
    @Field("courseTrimester")
    @JsonIgnoreProperties(value = { "viewedResults", "schedules", "course", "trimester" }, allowSetters = true)
    private Set<CourseTrimester> courseTrimesters = new HashSet<>();

    @DBRef
    @Field("quarterSchedule")
    @JsonIgnoreProperties(value = { "planningActivities", "learningResult", "planning", "trimester" }, allowSetters = true)
    private Set<QuarterSchedule> quarterSchedules = new HashSet<>();

    @DBRef
    @Field("workingDayCourse")
    @JsonIgnoreProperties(value = { "courses", "trimesters" }, allowSetters = true)
    private WorkingDayCourse workingDayCourse;

    @DBRef
    @Field("levelEducations")
    @JsonIgnoreProperties(value = { "trainingPrograms", "trimesters" }, allowSetters = true)
    private LevelEducation levelEducations;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Trimester id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getTrimesterName() {
        return this.trimesterName;
    }

    public Trimester trimesterName(Integer trimesterName) {
        this.setTrimesterName(trimesterName);
        return this;
    }

    public void setTrimesterName(Integer trimesterName) {
        this.trimesterName = trimesterName;
    }

    public String getTrimesterState() {
        return this.trimesterState;
    }

    public Trimester trimesterState(String trimesterState) {
        this.setTrimesterState(trimesterState);
        return this;
    }

    public void setTrimesterState(String trimesterState) {
        this.trimesterState = trimesterState;
    }

    public Set<CourseTrimester> getCourseTrimesters() {
        return this.courseTrimesters;
    }

    public void setCourseTrimesters(Set<CourseTrimester> courseTrimesters) {
        if (this.courseTrimesters != null) {
            this.courseTrimesters.forEach(i -> i.setTrimester(null));
        }
        if (courseTrimesters != null) {
            courseTrimesters.forEach(i -> i.setTrimester(this));
        }
        this.courseTrimesters = courseTrimesters;
    }

    public Trimester courseTrimesters(Set<CourseTrimester> courseTrimesters) {
        this.setCourseTrimesters(courseTrimesters);
        return this;
    }

    public Trimester addCourseTrimester(CourseTrimester courseTrimester) {
        this.courseTrimesters.add(courseTrimester);
        courseTrimester.setTrimester(this);
        return this;
    }

    public Trimester removeCourseTrimester(CourseTrimester courseTrimester) {
        this.courseTrimesters.remove(courseTrimester);
        courseTrimester.setTrimester(null);
        return this;
    }

    public Set<QuarterSchedule> getQuarterSchedules() {
        return this.quarterSchedules;
    }

    public void setQuarterSchedules(Set<QuarterSchedule> quarterSchedules) {
        if (this.quarterSchedules != null) {
            this.quarterSchedules.forEach(i -> i.setTrimester(null));
        }
        if (quarterSchedules != null) {
            quarterSchedules.forEach(i -> i.setTrimester(this));
        }
        this.quarterSchedules = quarterSchedules;
    }

    public Trimester quarterSchedules(Set<QuarterSchedule> quarterSchedules) {
        this.setQuarterSchedules(quarterSchedules);
        return this;
    }

    public Trimester addQuarterSchedule(QuarterSchedule quarterSchedule) {
        this.quarterSchedules.add(quarterSchedule);
        quarterSchedule.setTrimester(this);
        return this;
    }

    public Trimester removeQuarterSchedule(QuarterSchedule quarterSchedule) {
        this.quarterSchedules.remove(quarterSchedule);
        quarterSchedule.setTrimester(null);
        return this;
    }

    public WorkingDayCourse getWorkingDayCourse() {
        return this.workingDayCourse;
    }

    public void setWorkingDayCourse(WorkingDayCourse workingDayCourse) {
        this.workingDayCourse = workingDayCourse;
    }

    public Trimester workingDayCourse(WorkingDayCourse workingDayCourse) {
        this.setWorkingDayCourse(workingDayCourse);
        return this;
    }

    public LevelEducation getLevelEducations() {
        return this.levelEducations;
    }

    public void setLevelEducations(LevelEducation levelEducation) {
        this.levelEducations = levelEducation;
    }

    public Trimester levelEducations(LevelEducation levelEducation) {
        this.setLevelEducations(levelEducation);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Trimester)) {
            return false;
        }
        return getId() != null && getId().equals(((Trimester) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Trimester{" +
            "id=" + getId() +
            ", trimesterName=" + getTrimesterName() +
            ", trimesterState='" + getTrimesterState() + "'" +
            "}";
    }
}
