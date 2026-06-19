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
 * A CourseTrimester.
 */
@Document(collection = "course_trimester")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CourseTrimester implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @DBRef
    @Field("viewedResult")
    @JsonIgnoreProperties(value = { "courseTrimester", "planning", "learningResult" }, allowSetters = true)
    private Set<ViewedResult> viewedResults = new HashSet<>();

    @DBRef
    @Field("schedule")
    @JsonIgnoreProperties(
        value = { "scheduleVersion", "modality", "day", "courseTrimester", "classroom", "instructor" },
        allowSetters = true
    )
    private Set<Schedule> schedules = new HashSet<>();

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
    private Course course;

    @DBRef
    @Field("trimester")
    @JsonIgnoreProperties(value = { "courseTrimesters", "quarterSchedules", "workingDayCourse", "levelEducations" }, allowSetters = true)
    private Trimester trimester;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public CourseTrimester id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Set<ViewedResult> getViewedResults() {
        return this.viewedResults;
    }

    public void setViewedResults(Set<ViewedResult> viewedResults) {
        if (this.viewedResults != null) {
            this.viewedResults.forEach(i -> i.setCourseTrimester(null));
        }
        if (viewedResults != null) {
            viewedResults.forEach(i -> i.setCourseTrimester(this));
        }
        this.viewedResults = viewedResults;
    }

    public CourseTrimester viewedResults(Set<ViewedResult> viewedResults) {
        this.setViewedResults(viewedResults);
        return this;
    }

    public CourseTrimester addViewedResult(ViewedResult viewedResult) {
        this.viewedResults.add(viewedResult);
        viewedResult.setCourseTrimester(this);
        return this;
    }

    public CourseTrimester removeViewedResult(ViewedResult viewedResult) {
        this.viewedResults.remove(viewedResult);
        viewedResult.setCourseTrimester(null);
        return this;
    }

    public Set<Schedule> getSchedules() {
        return this.schedules;
    }

    public void setSchedules(Set<Schedule> schedules) {
        if (this.schedules != null) {
            this.schedules.forEach(i -> i.setCourseTrimester(null));
        }
        if (schedules != null) {
            schedules.forEach(i -> i.setCourseTrimester(this));
        }
        this.schedules = schedules;
    }

    public CourseTrimester schedules(Set<Schedule> schedules) {
        this.setSchedules(schedules);
        return this;
    }

    public CourseTrimester addSchedule(Schedule schedule) {
        this.schedules.add(schedule);
        schedule.setCourseTrimester(this);
        return this;
    }

    public CourseTrimester removeSchedule(Schedule schedule) {
        this.schedules.remove(schedule);
        schedule.setCourseTrimester(null);
        return this;
    }

    public Course getCourse() {
        return this.course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public CourseTrimester course(Course course) {
        this.setCourse(course);
        return this;
    }

    public Trimester getTrimester() {
        return this.trimester;
    }

    public void setTrimester(Trimester trimester) {
        this.trimester = trimester;
    }

    public CourseTrimester trimester(Trimester trimester) {
        this.setTrimester(trimester);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CourseTrimester)) {
            return false;
        }
        return getId() != null && getId().equals(((CourseTrimester) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CourseTrimester{" +
            "id=" + getId() +
            "}";
    }
}
