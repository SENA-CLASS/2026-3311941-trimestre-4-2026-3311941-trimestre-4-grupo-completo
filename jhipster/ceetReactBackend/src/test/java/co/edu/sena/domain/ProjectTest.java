package co.edu.sena.domain;

import static co.edu.sena.domain.ProjectPhaseTestSamples.*;
import static co.edu.sena.domain.ProjectTestSamples.*;
import static co.edu.sena.domain.TrainingProgramTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class ProjectTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Project.class);
        Project project1 = getProjectSample1();
        Project project2 = new Project();
        assertThat(project1).isNotEqualTo(project2);

        project2.setId(project1.getId());
        assertThat(project1).isEqualTo(project2);

        project2 = getProjectSample2();
        assertThat(project1).isNotEqualTo(project2);
    }

    @Test
    void projectPhaseTest() {
        Project project = getProjectRandomSampleGenerator();
        ProjectPhase projectPhaseBack = getProjectPhaseRandomSampleGenerator();

        project.addProjectPhase(projectPhaseBack);
        assertThat(project.getProjectPhases()).containsOnly(projectPhaseBack);
        assertThat(projectPhaseBack.getProject()).isEqualTo(project);

        project.removeProjectPhase(projectPhaseBack);
        assertThat(project.getProjectPhases()).doesNotContain(projectPhaseBack);
        assertThat(projectPhaseBack.getProject()).isNull();

        project.projectPhases(new HashSet<>(Set.of(projectPhaseBack)));
        assertThat(project.getProjectPhases()).containsOnly(projectPhaseBack);
        assertThat(projectPhaseBack.getProject()).isEqualTo(project);

        project.setProjectPhases(new HashSet<>());
        assertThat(project.getProjectPhases()).doesNotContain(projectPhaseBack);
        assertThat(projectPhaseBack.getProject()).isNull();
    }

    @Test
    void trainingProgramTest() {
        Project project = getProjectRandomSampleGenerator();
        TrainingProgram trainingProgramBack = getTrainingProgramRandomSampleGenerator();

        project.setTrainingProgram(trainingProgramBack);
        assertThat(project.getTrainingProgram()).isEqualTo(trainingProgramBack);

        project.trainingProgram(null);
        assertThat(project.getTrainingProgram()).isNull();
    }
}
