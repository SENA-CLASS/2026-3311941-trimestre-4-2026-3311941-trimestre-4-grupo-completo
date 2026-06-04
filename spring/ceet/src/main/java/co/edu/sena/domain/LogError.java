package co.edu.sena.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serial;
import java.io.Serializable;
import java.time.ZonedDateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A LogError.
 */
@Document(collection = "log_error")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class LogError implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Size(max = 400)
    @Field("level_error")
    private String levelError;

    @NotNull
    @Size(max = 400)
    @Field("log_name")
    private String logName;

    @NotNull
    @Size(max = 400)
    @Field("message_error")
    private String messageError;

    @NotNull
    @Field("date_error")
    private ZonedDateTime dateError;

    @DBRef
    @Field("customer")
    @JsonIgnoreProperties(
        value = {
            "user", "apprentices", "logErrors", "logAudits", "generalObservations", "observationResponses", "instructors", "documentType",
        },
        allowSetters = true
    )
    private Customer customer;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public LogError id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLevelError() {
        return this.levelError;
    }

    public LogError levelError(String levelError) {
        this.setLevelError(levelError);
        return this;
    }

    public void setLevelError(String levelError) {
        this.levelError = levelError;
    }

    public String getLogName() {
        return this.logName;
    }

    public LogError logName(String logName) {
        this.setLogName(logName);
        return this;
    }

    public void setLogName(String logName) {
        this.logName = logName;
    }

    public String getMessageError() {
        return this.messageError;
    }

    public LogError messageError(String messageError) {
        this.setMessageError(messageError);
        return this;
    }

    public void setMessageError(String messageError) {
        this.messageError = messageError;
    }

    public ZonedDateTime getDateError() {
        return this.dateError;
    }

    public LogError dateError(ZonedDateTime dateError) {
        this.setDateError(dateError);
        return this;
    }

    public void setDateError(ZonedDateTime dateError) {
        this.dateError = dateError;
    }

    public Customer getCustomer() {
        return this.customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public LogError customer(Customer customer) {
        this.setCustomer(customer);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LogError)) {
            return false;
        }
        return getId() != null && getId().equals(((LogError) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LogError{" +
            "id=" + getId() +
            ", levelError='" + getLevelError() + "'" +
            ", logName='" + getLogName() + "'" +
            ", messageError='" + getMessageError() + "'" +
            ", dateError='" + getDateError() + "'" +
            "}";
    }
}
