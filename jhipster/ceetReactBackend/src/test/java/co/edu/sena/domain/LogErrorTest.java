package co.edu.sena.domain;

import static co.edu.sena.domain.CustomerTestSamples.*;
import static co.edu.sena.domain.LogErrorTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class LogErrorTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LogError.class);
        LogError logError1 = getLogErrorSample1();
        LogError logError2 = new LogError();
        assertThat(logError1).isNotEqualTo(logError2);

        logError2.setId(logError1.getId());
        assertThat(logError1).isEqualTo(logError2);

        logError2 = getLogErrorSample2();
        assertThat(logError1).isNotEqualTo(logError2);
    }

    @Test
    void customerTest() {
        LogError logError = getLogErrorRandomSampleGenerator();
        Customer customerBack = getCustomerRandomSampleGenerator();

        logError.setCustomer(customerBack);
        assertThat(logError.getCustomer()).isEqualTo(customerBack);

        logError.customer(null);
        assertThat(logError.getCustomer()).isNull();
    }
}
