package co.edu.sena.domain;

import static co.edu.sena.domain.CustomerTestSamples.*;
import static co.edu.sena.domain.LogAuditTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class LogAuditTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LogAudit.class);
        LogAudit logAudit1 = getLogAuditSample1();
        LogAudit logAudit2 = new LogAudit();
        assertThat(logAudit1).isNotEqualTo(logAudit2);

        logAudit2.setId(logAudit1.getId());
        assertThat(logAudit1).isEqualTo(logAudit2);

        logAudit2 = getLogAuditSample2();
        assertThat(logAudit1).isNotEqualTo(logAudit2);
    }

    @Test
    void customerTest() {
        LogAudit logAudit = getLogAuditRandomSampleGenerator();
        Customer customerBack = getCustomerRandomSampleGenerator();

        logAudit.setCustomer(customerBack);
        assertThat(logAudit.getCustomer()).isEqualTo(customerBack);

        logAudit.customer(null);
        assertThat(logAudit.getCustomer()).isNull();
    }
}
