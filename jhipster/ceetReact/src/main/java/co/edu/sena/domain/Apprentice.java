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
 * A Apprentice.
 */
@Document(collection = "apprentice")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Apprentice implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @DBRef
    @Field("memberGroup")
    @JsonIgnoreProperties(value = { "projectGroup", "apprentice" }, allowSetters = true)
    private Set<MemberGroup> memberGroups = new HashSet<>();

    @DBRef
    @Field("customer")
    @JsonIgnoreProperties(
        value = {
            "user",
            "apprentices",
            "logErrors",
            "logAudits",
            "generalObservations",
            "observationResponses",
            "instructors",
            "documentType",
        },
        allowSetters = true
    )
    private Customer customer;

    @DBRef
    @Field("trainingStatus")
    @JsonIgnoreProperties(value = { "apprentices" }, allowSetters = true)
    private TrainingStatus trainingStatus;

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

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Apprentice id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Set<MemberGroup> getMemberGroups() {
        return this.memberGroups;
    }

    public void setMemberGroups(Set<MemberGroup> memberGroups) {
        if (this.memberGroups != null) {
            this.memberGroups.forEach(i -> i.setApprentice(null));
        }
        if (memberGroups != null) {
            memberGroups.forEach(i -> i.setApprentice(this));
        }
        this.memberGroups = memberGroups;
    }

    public Apprentice memberGroups(Set<MemberGroup> memberGroups) {
        this.setMemberGroups(memberGroups);
        return this;
    }

    public Apprentice addMemberGroup(MemberGroup memberGroup) {
        this.memberGroups.add(memberGroup);
        memberGroup.setApprentice(this);
        return this;
    }

    public Apprentice removeMemberGroup(MemberGroup memberGroup) {
        this.memberGroups.remove(memberGroup);
        memberGroup.setApprentice(null);
        return this;
    }

    public Customer getCustomer() {
        return this.customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Apprentice customer(Customer customer) {
        this.setCustomer(customer);
        return this;
    }

    public TrainingStatus getTrainingStatus() {
        return this.trainingStatus;
    }

    public void setTrainingStatus(TrainingStatus trainingStatus) {
        this.trainingStatus = trainingStatus;
    }

    public Apprentice trainingStatus(TrainingStatus trainingStatus) {
        this.setTrainingStatus(trainingStatus);
        return this;
    }

    public Course getCourse() {
        return this.course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Apprentice course(Course course) {
        this.setCourse(course);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Apprentice)) {
            return false;
        }
        return getId() != null && getId().equals(((Apprentice) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Apprentice{" +
            "id=" + getId() +
            "}";
    }
}
