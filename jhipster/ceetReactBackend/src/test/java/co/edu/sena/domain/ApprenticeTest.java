package co.edu.sena.domain;

import static co.edu.sena.domain.ApprenticeTestSamples.*;
import static co.edu.sena.domain.CourseTestSamples.*;
import static co.edu.sena.domain.CustomerTestSamples.*;
import static co.edu.sena.domain.MemberGroupTestSamples.*;
import static co.edu.sena.domain.TrainingStatusTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class ApprenticeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Apprentice.class);
        Apprentice apprentice1 = getApprenticeSample1();
        Apprentice apprentice2 = new Apprentice();
        assertThat(apprentice1).isNotEqualTo(apprentice2);

        apprentice2.setId(apprentice1.getId());
        assertThat(apprentice1).isEqualTo(apprentice2);

        apprentice2 = getApprenticeSample2();
        assertThat(apprentice1).isNotEqualTo(apprentice2);
    }

    @Test
    void memberGroupTest() {
        Apprentice apprentice = getApprenticeRandomSampleGenerator();
        MemberGroup memberGroupBack = getMemberGroupRandomSampleGenerator();

        apprentice.addMemberGroup(memberGroupBack);
        assertThat(apprentice.getMemberGroups()).containsOnly(memberGroupBack);
        assertThat(memberGroupBack.getApprentice()).isEqualTo(apprentice);

        apprentice.removeMemberGroup(memberGroupBack);
        assertThat(apprentice.getMemberGroups()).doesNotContain(memberGroupBack);
        assertThat(memberGroupBack.getApprentice()).isNull();

        apprentice.memberGroups(new HashSet<>(Set.of(memberGroupBack)));
        assertThat(apprentice.getMemberGroups()).containsOnly(memberGroupBack);
        assertThat(memberGroupBack.getApprentice()).isEqualTo(apprentice);

        apprentice.setMemberGroups(new HashSet<>());
        assertThat(apprentice.getMemberGroups()).doesNotContain(memberGroupBack);
        assertThat(memberGroupBack.getApprentice()).isNull();
    }

    @Test
    void customerTest() {
        Apprentice apprentice = getApprenticeRandomSampleGenerator();
        Customer customerBack = getCustomerRandomSampleGenerator();

        apprentice.setCustomer(customerBack);
        assertThat(apprentice.getCustomer()).isEqualTo(customerBack);

        apprentice.customer(null);
        assertThat(apprentice.getCustomer()).isNull();
    }

    @Test
    void trainingStatusTest() {
        Apprentice apprentice = getApprenticeRandomSampleGenerator();
        TrainingStatus trainingStatusBack = getTrainingStatusRandomSampleGenerator();

        apprentice.setTrainingStatus(trainingStatusBack);
        assertThat(apprentice.getTrainingStatus()).isEqualTo(trainingStatusBack);

        apprentice.trainingStatus(null);
        assertThat(apprentice.getTrainingStatus()).isNull();
    }

    @Test
    void courseTest() {
        Apprentice apprentice = getApprenticeRandomSampleGenerator();
        Course courseBack = getCourseRandomSampleGenerator();

        apprentice.setCourse(courseBack);
        assertThat(apprentice.getCourse()).isEqualTo(courseBack);

        apprentice.course(null);
        assertThat(apprentice.getCourse()).isNull();
    }
}
