package co.edu.sena.domain;

import co.edu.sena.domain.enumeration.StateProgram;
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
 * A TrainingProgram.
 */
@Document(collection = "training_program")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TrainingProgram implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Size(max = 50)
    @Field("program_code")
    private String programCode;

    @NotNull
    @Size(max = 40)
    @Field("program_version")
    private String programVersion;

    @NotNull
    @Size(max = 500)
    @Field("program_name")
    private String programName;

    @NotNull
    @Size(max = 40)
    @Field("program_initials")
    private String programInitials;

    @NotNull
    @Field("program_state")
    private StateProgram programState;

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
    @Field("learningCompetence")
    @JsonIgnoreProperties(value = { "learningResults", "bondingCompetences", "trainingProgram" }, allowSetters = true)
    private Set<LearningCompetence> learningCompetences = new HashSet<>();

    @DBRef
    @Field("project")
    @JsonIgnoreProperties(value = { "projectPhases", "trainingProgram" }, allowSetters = true)
    private Set<Project> projects = new HashSet<>();

    @DBRef
    @Field("checkList")
    @JsonIgnoreProperties(value = { "checkListCourses", "itemLists", "trainingProgram" }, allowSetters = true)
    private Set<CheckList> checkLists = new HashSet<>();

    @DBRef
    @Field("levelEducation")
    @JsonIgnoreProperties(value = { "trainingPrograms", "trimesters" }, allowSetters = true)
    private LevelEducation levelEducation;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public TrainingProgram id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProgramCode() {
        return this.programCode;
    }

    public TrainingProgram programCode(String programCode) {
        this.setProgramCode(programCode);
        return this;
    }

    public void setProgramCode(String programCode) {
        this.programCode = programCode;
    }

    public String getProgramVersion() {
        return this.programVersion;
    }

    public TrainingProgram programVersion(String programVersion) {
        this.setProgramVersion(programVersion);
        return this;
    }

    public void setProgramVersion(String programVersion) {
        this.programVersion = programVersion;
    }

    public String getProgramName() {
        return this.programName;
    }

    public TrainingProgram programName(String programName) {
        this.setProgramName(programName);
        return this;
    }

    public void setProgramName(String programName) {
        this.programName = programName;
    }

    public String getProgramInitials() {
        return this.programInitials;
    }

    public TrainingProgram programInitials(String programInitials) {
        this.setProgramInitials(programInitials);
        return this;
    }

    public void setProgramInitials(String programInitials) {
        this.programInitials = programInitials;
    }

    public StateProgram getProgramState() {
        return this.programState;
    }

    public TrainingProgram programState(StateProgram programState) {
        this.setProgramState(programState);
        return this;
    }

    public void setProgramState(StateProgram programState) {
        this.programState = programState;
    }

    public Set<Course> getCourses() {
        return this.courses;
    }

    public void setCourses(Set<Course> courses) {
        if (this.courses != null) {
            this.courses.forEach(i -> i.setTrainingProgram(null));
        }
        if (courses != null) {
            courses.forEach(i -> i.setTrainingProgram(this));
        }
        this.courses = courses;
    }

    public TrainingProgram courses(Set<Course> courses) {
        this.setCourses(courses);
        return this;
    }

    public TrainingProgram addCourse(Course course) {
        this.courses.add(course);
        course.setTrainingProgram(this);
        return this;
    }

    public TrainingProgram removeCourse(Course course) {
        this.courses.remove(course);
        course.setTrainingProgram(null);
        return this;
    }

    public Set<LearningCompetence> getLearningCompetences() {
        return this.learningCompetences;
    }

    public void setLearningCompetences(Set<LearningCompetence> learningCompetences) {
        if (this.learningCompetences != null) {
            this.learningCompetences.forEach(i -> i.setTrainingProgram(null));
        }
        if (learningCompetences != null) {
            learningCompetences.forEach(i -> i.setTrainingProgram(this));
        }
        this.learningCompetences = learningCompetences;
    }

    public TrainingProgram learningCompetences(Set<LearningCompetence> learningCompetences) {
        this.setLearningCompetences(learningCompetences);
        return this;
    }

    public TrainingProgram addLearningCompetence(LearningCompetence learningCompetence) {
        this.learningCompetences.add(learningCompetence);
        learningCompetence.setTrainingProgram(this);
        return this;
    }

    public TrainingProgram removeLearningCompetence(LearningCompetence learningCompetence) {
        this.learningCompetences.remove(learningCompetence);
        learningCompetence.setTrainingProgram(null);
        return this;
    }

    public Set<Project> getProjects() {
        return this.projects;
    }

    public void setProjects(Set<Project> projects) {
        if (this.projects != null) {
            this.projects.forEach(i -> i.setTrainingProgram(null));
        }
        if (projects != null) {
            projects.forEach(i -> i.setTrainingProgram(this));
        }
        this.projects = projects;
    }

    public TrainingProgram projects(Set<Project> projects) {
        this.setProjects(projects);
        return this;
    }

    public TrainingProgram addProject(Project project) {
        this.projects.add(project);
        project.setTrainingProgram(this);
        return this;
    }

    public TrainingProgram removeProject(Project project) {
        this.projects.remove(project);
        project.setTrainingProgram(null);
        return this;
    }

    public Set<CheckList> getCheckLists() {
        return this.checkLists;
    }

    public void setCheckLists(Set<CheckList> checkLists) {
        if (this.checkLists != null) {
            this.checkLists.forEach(i -> i.setTrainingProgram(null));
        }
        if (checkLists != null) {
            checkLists.forEach(i -> i.setTrainingProgram(this));
        }
        this.checkLists = checkLists;
    }

    public TrainingProgram checkLists(Set<CheckList> checkLists) {
        this.setCheckLists(checkLists);
        return this;
    }

    public TrainingProgram addCheckList(CheckList checkList) {
        this.checkLists.add(checkList);
        checkList.setTrainingProgram(this);
        return this;
    }

    public TrainingProgram removeCheckList(CheckList checkList) {
        this.checkLists.remove(checkList);
        checkList.setTrainingProgram(null);
        return this;
    }

    public LevelEducation getLevelEducation() {
        return this.levelEducation;
    }

    public void setLevelEducation(LevelEducation levelEducation) {
        this.levelEducation = levelEducation;
    }

    public TrainingProgram levelEducation(LevelEducation levelEducation) {
        this.setLevelEducation(levelEducation);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TrainingProgram)) {
            return false;
        }
        return getId() != null && getId().equals(((TrainingProgram) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TrainingProgram{" +
            "id=" + getId() +
            ", programCode='" + getProgramCode() + "'" +
            ", programVersion='" + getProgramVersion() + "'" +
            ", programName='" + getProgramName() + "'" +
            ", programInitials='" + getProgramInitials() + "'" +
            ", programState='" + getProgramState() + "'" +
            "}";
    }
}
