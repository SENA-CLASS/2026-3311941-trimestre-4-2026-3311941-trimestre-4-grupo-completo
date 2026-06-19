package co.edu.sena.domain;

import static co.edu.sena.domain.ProjectActivityTestSamples.*;
import static co.edu.sena.domain.ProjectPhaseTestSamples.*;
import static co.edu.sena.domain.ProjectTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class ProjectPhaseTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProjectPhase.class);
        ProjectPhase projectPhase1 = getProjectPhaseSample1();
        ProjectPhase projectPhase2 = new ProjectPhase();
        assertThat(projectPhase1).isNotEqualTo(projectPhase2);

        projectPhase2.setId(projectPhase1.getId());
        assertThat(projectPhase1).isEqualTo(projectPhase2);

        projectPhase2 = getProjectPhaseSample2();
        assertThat(projectPhase1).isNotEqualTo(projectPhase2);
    }

    @Test
    void projectActivityTest() {
        ProjectPhase projectPhase = getProjectPhaseRandomSampleGenerator();
        ProjectActivity projectActivityBack = getProjectActivityRandomSampleGenerator();

        projectPhase.addProjectActivity(projectActivityBack);
        assertThat(projectPhase.getProjectActivities()).containsOnly(projectActivityBack);
        assertThat(projectActivityBack.getProjectPhase()).isEqualTo(projectPhase);

        projectPhase.removeProjectActivity(projectActivityBack);
        assertThat(projectPhase.getProjectActivities()).doesNotContain(projectActivityBack);
        assertThat(projectActivityBack.getProjectPhase()).isNull();

        projectPhase.projectActivities(new HashSet<>(Set.of(projectActivityBack)));
        assertThat(projectPhase.getProjectActivities()).containsOnly(projectActivityBack);
        assertThat(projectActivityBack.getProjectPhase()).isEqualTo(projectPhase);

        projectPhase.setProjectActivities(new HashSet<>());
        assertThat(projectPhase.getProjectActivities()).doesNotContain(projectActivityBack);
        assertThat(projectActivityBack.getProjectPhase()).isNull();
    }

    @Test
    void projectTest() {
        ProjectPhase projectPhase = getProjectPhaseRandomSampleGenerator();
        Project projectBack = getProjectRandomSampleGenerator();

        projectPhase.setProject(projectBack);
        assertThat(projectPhase.getProject()).isEqualTo(projectBack);

        projectPhase.project(null);
        assertThat(projectPhase.getProject()).isNull();
    }
}
