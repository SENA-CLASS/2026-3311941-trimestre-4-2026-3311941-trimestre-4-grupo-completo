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
 * A Bonding.
 */
@Document(collection = "bonding")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Bonding implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Size(max = 40)
    @Field("bonding_type")
    private String bondingType;

    @NotNull
    @Field("working_hours")
    private Integer workingHours;

    @NotNull
    @Field("bonding_state")
    private State bondingState;

    @DBRef
    @Field("bondingInstructor")
    @JsonIgnoreProperties(value = { "boundingSchedules", "bondingCompetences", "year", "instructor", "bonding" }, allowSetters = true)
    private Set<BondingInstructor> bondingInstructors = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Bonding id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBondingType() {
        return this.bondingType;
    }

    public Bonding bondingType(String bondingType) {
        this.setBondingType(bondingType);
        return this;
    }

    public void setBondingType(String bondingType) {
        this.bondingType = bondingType;
    }

    public Integer getWorkingHours() {
        return this.workingHours;
    }

    public Bonding workingHours(Integer workingHours) {
        this.setWorkingHours(workingHours);
        return this;
    }

    public void setWorkingHours(Integer workingHours) {
        this.workingHours = workingHours;
    }

    public State getBondingState() {
        return this.bondingState;
    }

    public Bonding bondingState(State bondingState) {
        this.setBondingState(bondingState);
        return this;
    }

    public void setBondingState(State bondingState) {
        this.bondingState = bondingState;
    }

    public Set<BondingInstructor> getBondingInstructors() {
        return this.bondingInstructors;
    }

    public void setBondingInstructors(Set<BondingInstructor> bondingInstructors) {
        if (this.bondingInstructors != null) {
            this.bondingInstructors.forEach(i -> i.setBonding(null));
        }
        if (bondingInstructors != null) {
            bondingInstructors.forEach(i -> i.setBonding(this));
        }
        this.bondingInstructors = bondingInstructors;
    }

    public Bonding bondingInstructors(Set<BondingInstructor> bondingInstructors) {
        this.setBondingInstructors(bondingInstructors);
        return this;
    }

    public Bonding addBondingInstructor(BondingInstructor bondingInstructor) {
        this.bondingInstructors.add(bondingInstructor);
        bondingInstructor.setBonding(this);
        return this;
    }

    public Bonding removeBondingInstructor(BondingInstructor bondingInstructor) {
        this.bondingInstructors.remove(bondingInstructor);
        bondingInstructor.setBonding(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Bonding)) {
            return false;
        }
        return getId() != null && getId().equals(((Bonding) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Bonding{" +
            "id=" + getId() +
            ", bondingType='" + getBondingType() + "'" +
            ", workingHours=" + getWorkingHours() +
            ", bondingState='" + getBondingState() + "'" +
            "}";
    }
}
