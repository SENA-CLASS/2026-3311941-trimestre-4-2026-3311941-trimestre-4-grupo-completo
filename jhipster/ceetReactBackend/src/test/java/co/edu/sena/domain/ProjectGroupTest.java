package co.edu.sena.domain;

import static co.edu.sena.domain.CourseTestSamples.*;
import static co.edu.sena.domain.GeneralObservationTestSamples.*;
import static co.edu.sena.domain.GroupResponseTestSamples.*;
import static co.edu.sena.domain.MemberGroupTestSamples.*;
import static co.edu.sena.domain.ProjectGroupTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class ProjectGroupTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProjectGroup.class);
        ProjectGroup projectGroup1 = getProjectGroupSample1();
        ProjectGroup projectGroup2 = new ProjectGroup();
        assertThat(projectGroup1).isNotEqualTo(projectGroup2);

        projectGroup2.setId(projectGroup1.getId());
        assertThat(projectGroup1).isEqualTo(projectGroup2);

        projectGroup2 = getProjectGroupSample2();
        assertThat(projectGroup1).isNotEqualTo(projectGroup2);
    }

    @Test
    void generalObservationTest() {
        ProjectGroup projectGroup = getProjectGroupRandomSampleGenerator();
        GeneralObservation generalObservationBack = getGeneralObservationRandomSampleGenerator();

        projectGroup.addGeneralObservation(generalObservationBack);
        assertThat(projectGroup.getGeneralObservations()).containsOnly(generalObservationBack);
        assertThat(generalObservationBack.getProjectGroup()).isEqualTo(projectGroup);

        projectGroup.removeGeneralObservation(generalObservationBack);
        assertThat(projectGroup.getGeneralObservations()).doesNotContain(generalObservationBack);
        assertThat(generalObservationBack.getProjectGroup()).isNull();

        projectGroup.generalObservations(new HashSet<>(Set.of(generalObservationBack)));
        assertThat(projectGroup.getGeneralObservations()).containsOnly(generalObservationBack);
        assertThat(generalObservationBack.getProjectGroup()).isEqualTo(projectGroup);

        projectGroup.setGeneralObservations(new HashSet<>());
        assertThat(projectGroup.getGeneralObservations()).doesNotContain(generalObservationBack);
        assertThat(generalObservationBack.getProjectGroup()).isNull();
    }

    @Test
    void memberGroupTest() {
        ProjectGroup projectGroup = getProjectGroupRandomSampleGenerator();
        MemberGroup memberGroupBack = getMemberGroupRandomSampleGenerator();

        projectGroup.addMemberGroup(memberGroupBack);
        assertThat(projectGroup.getMemberGroups()).containsOnly(memberGroupBack);
        assertThat(memberGroupBack.getProjectGroup()).isEqualTo(projectGroup);

        projectGroup.removeMemberGroup(memberGroupBack);
        assertThat(projectGroup.getMemberGroups()).doesNotContain(memberGroupBack);
        assertThat(memberGroupBack.getProjectGroup()).isNull();

        projectGroup.memberGroups(new HashSet<>(Set.of(memberGroupBack)));
        assertThat(projectGroup.getMemberGroups()).containsOnly(memberGroupBack);
        assertThat(memberGroupBack.getProjectGroup()).isEqualTo(projectGroup);

        projectGroup.setMemberGroups(new HashSet<>());
        assertThat(projectGroup.getMemberGroups()).doesNotContain(memberGroupBack);
        assertThat(memberGroupBack.getProjectGroup()).isNull();
    }

    @Test
    void groupResponseTest() {
        ProjectGroup projectGroup = getProjectGroupRandomSampleGenerator();
        GroupResponse groupResponseBack = getGroupResponseRandomSampleGenerator();

        projectGroup.addGroupResponse(groupResponseBack);
        assertThat(projectGroup.getGroupResponses()).containsOnly(groupResponseBack);
        assertThat(groupResponseBack.getProjectGroup()).isEqualTo(projectGroup);

        projectGroup.removeGroupResponse(groupResponseBack);
        assertThat(projectGroup.getGroupResponses()).doesNotContain(groupResponseBack);
        assertThat(groupResponseBack.getProjectGroup()).isNull();

        projectGroup.groupResponses(new HashSet<>(Set.of(groupResponseBack)));
        assertThat(projectGroup.getGroupResponses()).containsOnly(groupResponseBack);
        assertThat(groupResponseBack.getProjectGroup()).isEqualTo(projectGroup);

        projectGroup.setGroupResponses(new HashSet<>());
        assertThat(projectGroup.getGroupResponses()).doesNotContain(groupResponseBack);
        assertThat(groupResponseBack.getProjectGroup()).isNull();
    }

    @Test
    void courseTest() {
        ProjectGroup projectGroup = getProjectGroupRandomSampleGenerator();
        Course courseBack = getCourseRandomSampleGenerator();

        projectGroup.setCourse(courseBack);
        assertThat(projectGroup.getCourse()).isEqualTo(courseBack);

        projectGroup.course(null);
        assertThat(projectGroup.getCourse()).isNull();
    }
}
