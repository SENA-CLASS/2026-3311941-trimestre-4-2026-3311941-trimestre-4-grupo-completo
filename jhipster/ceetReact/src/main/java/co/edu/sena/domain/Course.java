package co.edu.sena.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Course.
 */
@Document(collection = "course")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Course implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Size(max = 100)
    @Field("course_number")
    private String courseNumber;

    @NotNull
    @Field("start_date")
    private LocalDate startDate;

    @NotNull
    @Field("end_date")
    private LocalDate endDate;

    @NotNull
    @Size(max = 40)
    @Field("route")
    private String route;

    @DBRef
    @Field("apprentice")
    @JsonIgnoreProperties(value = { "memberGroups", "customer", "trainingStatus", "course" }, allowSetters = true)
    private Set<Apprentice> apprentices = new HashSet<>();

    @DBRef
    @Field("courseTrimester")
    @JsonIgnoreProperties(value = { "viewedResults", "schedules", "course", "trimester" }, allowSetters = true)
    private Set<CourseTrimester> courseTrimesters = new HashSet<>();

    @DBRef
    @Field("coursePlanning")
    @JsonIgnoreProperties(value = { "course", "planning" }, allowSetters = true)
    private Set<CoursePlanning> coursePlannings = new HashSet<>();

    @DBRef
    @Field("projectGroup")
    @JsonIgnoreProperties(value = { "generalObservations", "memberGroups", "groupResponses", "course" }, allowSetters = true)
    private Set<ProjectGroup> projectGroups = new HashSet<>();

    @DBRef
    @Field("checkListCourse")
    @JsonIgnoreProperties(value = { "course", "checkList" }, allowSetters = true)
    private Set<CheckListCourse> checkListCourses = new HashSet<>();

    @DBRef
    @Field("courseStatus")
    @JsonIgnoreProperties(value = { "courses" }, allowSetters = true)
    private CourseStatus courseStatus;

    @DBRef
    @Field("workingDayCourse")
    @JsonIgnoreProperties(value = { "courses", "trimesters" }, allowSetters = true)
    private WorkingDayCourse workingDayCourse;

    @DBRef
    @Field("trainingProgram")
    @JsonIgnoreProperties(value = { "courses", "learningCompetences", "projects", "checkLists", "levelEducation" }, allowSetters = true)
    private TrainingProgram trainingProgram;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Course id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCourseNumber() {
        return this.courseNumber;
    }

    public Course courseNumber(String courseNumber) {
        this.setCourseNumber(courseNumber);
        return this;
    }

    public void setCourseNumber(String courseNumber) {
        this.courseNumber = courseNumber;
    }

    public LocalDate getStartDate() {
        return this.startDate;
    }

    public Course startDate(LocalDate startDate) {
        this.setStartDate(startDate);
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return this.endDate;
    }

    public Course endDate(LocalDate endDate) {
        this.setEndDate(endDate);
        return this;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getRoute() {
        return this.route;
    }

    public Course route(String route) {
        this.setRoute(route);
        return this;
    }

    public void setRoute(String route) {
        this.route = route;
    }

    public Set<Apprentice> getApprentices() {
        return this.apprentices;
    }

    public void setApprentices(Set<Apprentice> apprentices) {
        if (this.apprentices != null) {
            this.apprentices.forEach(i -> i.setCourse(null));
        }
        if (apprentices != null) {
            apprentices.forEach(i -> i.setCourse(this));
        }
        this.apprentices = apprentices;
    }

    public Course apprentices(Set<Apprentice> apprentices) {
        this.setApprentices(apprentices);
        return this;
    }

    public Course addApprentice(Apprentice apprentice) {
        this.apprentices.add(apprentice);
        apprentice.setCourse(this);
        return this;
    }

    public Course removeApprentice(Apprentice apprentice) {
        this.apprentices.remove(apprentice);
        apprentice.setCourse(null);
        return this;
    }

    public Set<CourseTrimester> getCourseTrimesters() {
        return this.courseTrimesters;
    }

    public void setCourseTrimesters(Set<CourseTrimester> courseTrimesters) {
        if (this.courseTrimesters != null) {
            this.courseTrimesters.forEach(i -> i.setCourse(null));
        }
        if (courseTrimesters != null) {
            courseTrimesters.forEach(i -> i.setCourse(this));
        }
        this.courseTrimesters = courseTrimesters;
    }

    public Course courseTrimesters(Set<CourseTrimester> courseTrimesters) {
        this.setCourseTrimesters(courseTrimesters);
        return this;
    }

    public Course addCourseTrimester(CourseTrimester courseTrimester) {
        this.courseTrimesters.add(courseTrimester);
        courseTrimester.setCourse(this);
        return this;
    }

    public Course removeCourseTrimester(CourseTrimester courseTrimester) {
        this.courseTrimesters.remove(courseTrimester);
        courseTrimester.setCourse(null);
        return this;
    }

    public Set<CoursePlanning> getCoursePlannings() {
        return this.coursePlannings;
    }

    public void setCoursePlannings(Set<CoursePlanning> coursePlannings) {
        if (this.coursePlannings != null) {
            this.coursePlannings.forEach(i -> i.setCourse(null));
        }
        if (coursePlannings != null) {
            coursePlannings.forEach(i -> i.setCourse(this));
        }
        this.coursePlannings = coursePlannings;
    }

    public Course coursePlannings(Set<CoursePlanning> coursePlannings) {
        this.setCoursePlannings(coursePlannings);
        return this;
    }

    public Course addCoursePlanning(CoursePlanning coursePlanning) {
        this.coursePlannings.add(coursePlanning);
        coursePlanning.setCourse(this);
        return this;
    }

    public Course removeCoursePlanning(CoursePlanning coursePlanning) {
        this.coursePlannings.remove(coursePlanning);
        coursePlanning.setCourse(null);
        return this;
    }

    public Set<ProjectGroup> getProjectGroups() {
        return this.projectGroups;
    }

    public void setProjectGroups(Set<ProjectGroup> projectGroups) {
        if (this.projectGroups != null) {
            this.projectGroups.forEach(i -> i.setCourse(null));
        }
        if (projectGroups != null) {
            projectGroups.forEach(i -> i.setCourse(this));
        }
        this.projectGroups = projectGroups;
    }

    public Course projectGroups(Set<ProjectGroup> projectGroups) {
        this.setProjectGroups(projectGroups);
        return this;
    }

    public Course addProjectGroup(ProjectGroup projectGroup) {
        this.projectGroups.add(projectGroup);
        projectGroup.setCourse(this);
        return this;
    }

    public Course removeProjectGroup(ProjectGroup projectGroup) {
        this.projectGroups.remove(projectGroup);
        projectGroup.setCourse(null);
        return this;
    }

    public Set<CheckListCourse> getCheckListCourses() {
        return this.checkListCourses;
    }

    public void setCheckListCourses(Set<CheckListCourse> checkListCourses) {
        if (this.checkListCourses != null) {
            this.checkListCourses.forEach(i -> i.setCourse(null));
        }
        if (checkListCourses != null) {
            checkListCourses.forEach(i -> i.setCourse(this));
        }
        this.checkListCourses = checkListCourses;
    }

    public Course checkListCourses(Set<CheckListCourse> checkListCourses) {
        this.setCheckListCourses(checkListCourses);
        return this;
    }

    public Course addCheckListCourse(CheckListCourse checkListCourse) {
        this.checkListCourses.add(checkListCourse);
        checkListCourse.setCourse(this);
        return this;
    }

    public Course removeCheckListCourse(CheckListCourse checkListCourse) {
        this.checkListCourses.remove(checkListCourse);
        checkListCourse.setCourse(null);
        return this;
    }

    public CourseStatus getCourseStatus() {
        return this.courseStatus;
    }

    public void setCourseStatus(CourseStatus courseStatus) {
        this.courseStatus = courseStatus;
    }

    public Course courseStatus(CourseStatus courseStatus) {
        this.setCourseStatus(courseStatus);
        return this;
    }

    public WorkingDayCourse getWorkingDayCourse() {
        return this.workingDayCourse;
    }

    public void setWorkingDayCourse(WorkingDayCourse workingDayCourse) {
        this.workingDayCourse = workingDayCourse;
    }

    public Course workingDayCourse(WorkingDayCourse workingDayCourse) {
        this.setWorkingDayCourse(workingDayCourse);
        return this;
    }

    public TrainingProgram getTrainingProgram() {
        return this.trainingProgram;
    }

    public void setTrainingProgram(TrainingProgram trainingProgram) {
        this.trainingProgram = trainingProgram;
    }

    public Course trainingProgram(TrainingProgram trainingProgram) {
        this.setTrainingProgram(trainingProgram);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Course)) {
            return false;
        }
        return getId() != null && getId().equals(((Course) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Course{" +
            "id=" + getId() +
            ", courseNumber='" + getCourseNumber() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", route='" + getRoute() + "'" +
            "}";
    }
}
