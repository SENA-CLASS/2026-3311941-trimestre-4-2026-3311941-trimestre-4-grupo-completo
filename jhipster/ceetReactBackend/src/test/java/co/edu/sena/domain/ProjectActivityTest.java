package co.edu.sena.domain;

import static co.edu.sena.domain.PlanningActivityTestSamples.*;
import static co.edu.sena.domain.ProjectActivityTestSamples.*;
import static co.edu.sena.domain.ProjectPhaseTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class ProjectActivityTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProjectActivity.class);
        ProjectActivity projectActivity1 = getProjectActivitySample1();
        ProjectActivity projectActivity2 = new ProjectActivity();
        assertThat(projectActivity1).isNotEqualTo(projectActivity2);

        projectActivity2.setId(projectActivity1.getId());
        assertThat(projectActivity1).isEqualTo(projectActivity2);

        projectActivity2 = getProjectActivitySample2();
        assertThat(projectActivity1).isNotEqualTo(projectActivity2);
    }

    @Test
    void planningActivityTest() {
        ProjectActivity projectActivity = getProjectActivityRandomSampleGenerator();
        PlanningActivity planningActivityBack = getPlanningActivityRandomSampleGenerator();

        projectActivity.addPlanningActivity(planningActivityBack);
        assertThat(projectActivity.getPlanningActivities()).containsOnly(planningActivityBack);
        assertThat(planningActivityBack.getProjectActivity()).isEqualTo(projectActivity);

        projectActivity.removePlanningActivity(planningActivityBack);
        assertThat(projectActivity.getPlanningActivities()).doesNotContain(planningActivityBack);
        assertThat(planningActivityBack.getProjectActivity()).isNull();

        projectActivity.planningActivities(new HashSet<>(Set.of(planningActivityBack)));
        assertThat(projectActivity.getPlanningActivities()).containsOnly(planningActivityBack);
        assertThat(planningActivityBack.getProjectActivity()).isEqualTo(projectActivity);

        projectActivity.setPlanningActivities(new HashSet<>());
        assertThat(projectActivity.getPlanningActivities()).doesNotContain(planningActivityBack);
        assertThat(planningActivityBack.getProjectActivity()).isNull();
    }

    @Test
    void projectPhaseTest() {
        ProjectActivity projectActivity = getProjectActivityRandomSampleGenerator();
        ProjectPhase projectPhaseBack = getProjectPhaseRandomSampleGenerator();

        projectActivity.setProjectPhase(projectPhaseBack);
        assertThat(projectActivity.getProjectPhase()).isEqualTo(projectPhaseBack);

        projectActivity.projectPhase(null);
        assertThat(projectActivity.getProjectPhase()).isNull();
    }
}
