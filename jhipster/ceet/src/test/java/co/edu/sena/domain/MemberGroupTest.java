package co.edu.sena.domain;

import static co.edu.sena.domain.ApprenticeTestSamples.*;
import static co.edu.sena.domain.MemberGroupTestSamples.*;
import static co.edu.sena.domain.ProjectGroupTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class MemberGroupTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MemberGroup.class);
        MemberGroup memberGroup1 = getMemberGroupSample1();
        MemberGroup memberGroup2 = new MemberGroup();
        assertThat(memberGroup1).isNotEqualTo(memberGroup2);

        memberGroup2.setId(memberGroup1.getId());
        assertThat(memberGroup1).isEqualTo(memberGroup2);

        memberGroup2 = getMemberGroupSample2();
        assertThat(memberGroup1).isNotEqualTo(memberGroup2);
    }

    @Test
    void projectGroupTest() {
        MemberGroup memberGroup = getMemberGroupRandomSampleGenerator();
        ProjectGroup projectGroupBack = getProjectGroupRandomSampleGenerator();

        memberGroup.setProjectGroup(projectGroupBack);
        assertThat(memberGroup.getProjectGroup()).isEqualTo(projectGroupBack);

        memberGroup.projectGroup(null);
        assertThat(memberGroup.getProjectGroup()).isNull();
    }

    @Test
    void apprenticeTest() {
        MemberGroup memberGroup = getMemberGroupRandomSampleGenerator();
        Apprentice apprenticeBack = getApprenticeRandomSampleGenerator();

        memberGroup.setApprentice(apprenticeBack);
        assertThat(memberGroup.getApprentice()).isEqualTo(apprenticeBack);

        memberGroup.apprentice(null);
        assertThat(memberGroup.getApprentice()).isNull();
    }
}
