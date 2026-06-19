package co.edu.sena.domain;

import co.edu.sena.domain.enumeration.State;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serial;
import java.io.Serializable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A CheckListCourse.
 */
@Document(collection = "check_list_course")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CheckListCourse implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("check_list_state")
    private State checkListState;

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
    @Field("checkList")
    @JsonIgnoreProperties(value = { "checkListCourses", "itemLists", "trainingProgram" }, allowSetters = true)
    private CheckList checkList;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public CheckListCourse id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public State getCheckListState() {
        return this.checkListState;
    }

    public CheckListCourse checkListState(State checkListState) {
        this.setCheckListState(checkListState);
        return this;
    }

    public void setCheckListState(State checkListState) {
        this.checkListState = checkListState;
    }

    public Course getCourse() {
        return this.course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public CheckListCourse course(Course course) {
        this.setCourse(course);
        return this;
    }

    public CheckList getCheckList() {
        return this.checkList;
    }

    public void setCheckList(CheckList checkList) {
        this.checkList = checkList;
    }

    public CheckListCourse checkList(CheckList checkList) {
        this.setCheckList(checkList);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CheckListCourse)) {
            return false;
        }
        return getId() != null && getId().equals(((CheckListCourse) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CheckListCourse{" +
            "id=" + getId() +
            ", checkListState='" + getCheckListState() + "'" +
            "}";
    }
}
