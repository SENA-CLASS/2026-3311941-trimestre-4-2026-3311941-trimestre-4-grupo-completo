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
 * A Year.
 */
@Document(collection = "year")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Year implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("year_number")
    private Integer yearNumber;

    @NotNull
    @Field("year_state")
    private State yearState;

    @DBRef
    @Field("bondingInstructor")
    @JsonIgnoreProperties(value = { "boundingSchedules", "bondingCompetences", "year", "instructor", "bonding" }, allowSetters = true)
    private Set<BondingInstructor> bondingInstructors = new HashSet<>();

    @DBRef
    @Field("currentQuarter")
    @JsonIgnoreProperties(value = { "scheduleVersions", "year" }, allowSetters = true)
    private Set<CurrentQuarter> currentQuarters = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Year id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getYearNumber() {
        return this.yearNumber;
    }

    public Year yearNumber(Integer yearNumber) {
        this.setYearNumber(yearNumber);
        return this;
    }

    public void setYearNumber(Integer yearNumber) {
        this.yearNumber = yearNumber;
    }

    public State getYearState() {
        return this.yearState;
    }

    public Year yearState(State yearState) {
        this.setYearState(yearState);
        return this;
    }

    public void setYearState(State yearState) {
        this.yearState = yearState;
    }

    public Set<BondingInstructor> getBondingInstructors() {
        return this.bondingInstructors;
    }

    public void setBondingInstructors(Set<BondingInstructor> bondingInstructors) {
        if (this.bondingInstructors != null) {
            this.bondingInstructors.forEach(i -> i.setYear(null));
        }
        if (bondingInstructors != null) {
            bondingInstructors.forEach(i -> i.setYear(this));
        }
        this.bondingInstructors = bondingInstructors;
    }

    public Year bondingInstructors(Set<BondingInstructor> bondingInstructors) {
        this.setBondingInstructors(bondingInstructors);
        return this;
    }

    public Year addBondingInstructor(BondingInstructor bondingInstructor) {
        this.bondingInstructors.add(bondingInstructor);
        bondingInstructor.setYear(this);
        return this;
    }

    public Year removeBondingInstructor(BondingInstructor bondingInstructor) {
        this.bondingInstructors.remove(bondingInstructor);
        bondingInstructor.setYear(null);
        return this;
    }

    public Set<CurrentQuarter> getCurrentQuarters() {
        return this.currentQuarters;
    }

    public void setCurrentQuarters(Set<CurrentQuarter> currentQuarters) {
        if (this.currentQuarters != null) {
            this.currentQuarters.forEach(i -> i.setYear(null));
        }
        if (currentQuarters != null) {
            currentQuarters.forEach(i -> i.setYear(this));
        }
        this.currentQuarters = currentQuarters;
    }

    public Year currentQuarters(Set<CurrentQuarter> currentQuarters) {
        this.setCurrentQuarters(currentQuarters);
        return this;
    }

    public Year addCurrentQuarter(CurrentQuarter currentQuarter) {
        this.currentQuarters.add(currentQuarter);
        currentQuarter.setYear(this);
        return this;
    }

    public Year removeCurrentQuarter(CurrentQuarter currentQuarter) {
        this.currentQuarters.remove(currentQuarter);
        currentQuarter.setYear(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Year)) {
            return false;
        }
        return getId() != null && getId().equals(((Year) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Year{" +
            "id=" + getId() +
            ", yearNumber=" + getYearNumber() +
            ", yearState='" + getYearState() + "'" +
            "}";
    }
}
