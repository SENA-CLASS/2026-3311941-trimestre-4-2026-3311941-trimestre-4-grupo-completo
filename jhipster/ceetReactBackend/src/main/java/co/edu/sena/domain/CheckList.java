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
 * A CheckList.
 */
@Document(collection = "check_list")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CheckList implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Size(max = 50)
    @Field("list_name")
    private String listName;

    @NotNull
    @Field("list_state")
    private State listState;

    @DBRef
    @Field("checkListCourse")
    @JsonIgnoreProperties(value = { "course", "checkList" }, allowSetters = true)
    private Set<CheckListCourse> checkListCourses = new HashSet<>();

    @DBRef
    @Field("itemList")
    @JsonIgnoreProperties(value = { "groupResponses", "checkList", "learningResult" }, allowSetters = true)
    private Set<ItemList> itemLists = new HashSet<>();

    @DBRef
    @Field("trainingProgram")
    @JsonIgnoreProperties(value = { "courses", "learningCompetences", "projects", "checkLists", "levelEducation" }, allowSetters = true)
    private TrainingProgram trainingProgram;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public CheckList id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getListName() {
        return this.listName;
    }

    public CheckList listName(String listName) {
        this.setListName(listName);
        return this;
    }

    public void setListName(String listName) {
        this.listName = listName;
    }

    public State getListState() {
        return this.listState;
    }

    public CheckList listState(State listState) {
        this.setListState(listState);
        return this;
    }

    public void setListState(State listState) {
        this.listState = listState;
    }

    public Set<CheckListCourse> getCheckListCourses() {
        return this.checkListCourses;
    }

    public void setCheckListCourses(Set<CheckListCourse> checkListCourses) {
        if (this.checkListCourses != null) {
            this.checkListCourses.forEach(i -> i.setCheckList(null));
        }
        if (checkListCourses != null) {
            checkListCourses.forEach(i -> i.setCheckList(this));
        }
        this.checkListCourses = checkListCourses;
    }

    public CheckList checkListCourses(Set<CheckListCourse> checkListCourses) {
        this.setCheckListCourses(checkListCourses);
        return this;
    }

    public CheckList addCheckListCourse(CheckListCourse checkListCourse) {
        this.checkListCourses.add(checkListCourse);
        checkListCourse.setCheckList(this);
        return this;
    }

    public CheckList removeCheckListCourse(CheckListCourse checkListCourse) {
        this.checkListCourses.remove(checkListCourse);
        checkListCourse.setCheckList(null);
        return this;
    }

    public Set<ItemList> getItemLists() {
        return this.itemLists;
    }

    public void setItemLists(Set<ItemList> itemLists) {
        if (this.itemLists != null) {
            this.itemLists.forEach(i -> i.setCheckList(null));
        }
        if (itemLists != null) {
            itemLists.forEach(i -> i.setCheckList(this));
        }
        this.itemLists = itemLists;
    }

    public CheckList itemLists(Set<ItemList> itemLists) {
        this.setItemLists(itemLists);
        return this;
    }

    public CheckList addItemList(ItemList itemList) {
        this.itemLists.add(itemList);
        itemList.setCheckList(this);
        return this;
    }

    public CheckList removeItemList(ItemList itemList) {
        this.itemLists.remove(itemList);
        itemList.setCheckList(null);
        return this;
    }

    public TrainingProgram getTrainingProgram() {
        return this.trainingProgram;
    }

    public void setTrainingProgram(TrainingProgram trainingProgram) {
        this.trainingProgram = trainingProgram;
    }

    public CheckList trainingProgram(TrainingProgram trainingProgram) {
        this.setTrainingProgram(trainingProgram);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CheckList)) {
            return false;
        }
        return getId() != null && getId().equals(((CheckList) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CheckList{" +
            "id=" + getId() +
            ", listName='" + getListName() + "'" +
            ", listState='" + getListState() + "'" +
            "}";
    }
}
