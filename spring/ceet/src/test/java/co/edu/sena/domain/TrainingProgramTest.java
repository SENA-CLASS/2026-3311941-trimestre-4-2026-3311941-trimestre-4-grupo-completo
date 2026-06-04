package co.edu.sena.domain;

import static co.edu.sena.domain.CheckListTestSamples.*;
import static co.edu.sena.domain.CourseTestSamples.*;
import static co.edu.sena.domain.LearningCompetenceTestSamples.*;
import static co.edu.sena.domain.LevelEducationTestSamples.*;
import static co.edu.sena.domain.ProjectTestSamples.*;
import static co.edu.sena.domain.TrainingProgramTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class TrainingProgramTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TrainingProgram.class);
        TrainingProgram trainingProgram1 = getTrainingProgramSample1();
        TrainingProgram trainingProgram2 = new TrainingProgram();
        assertThat(trainingProgram1).isNotEqualTo(trainingProgram2);

        trainingProgram2.setId(trainingProgram1.getId());
        assertThat(trainingProgram1).isEqualTo(trainingProgram2);

        trainingProgram2 = getTrainingProgramSample2();
        assertThat(trainingProgram1).isNotEqualTo(trainingProgram2);
    }

    @Test
    void courseTest() {
        TrainingProgram trainingProgram = getTrainingProgramRandomSampleGenerator();
        Course courseBack = getCourseRandomSampleGenerator();

        trainingProgram.addCourse(courseBack);
        assertThat(trainingProgram.getCourses()).containsOnly(courseBack);
        assertThat(courseBack.getTrainingProgram()).isEqualTo(trainingProgram);

        trainingProgram.removeCourse(courseBack);
        assertThat(trainingProgram.getCourses()).doesNotContain(courseBack);
        assertThat(courseBack.getTrainingProgram()).isNull();

        trainingProgram.courses(new HashSet<>(Set.of(courseBack)));
        assertThat(trainingProgram.getCourses()).containsOnly(courseBack);
        assertThat(courseBack.getTrainingProgram()).isEqualTo(trainingProgram);

        trainingProgram.setCourses(new HashSet<>());
        assertThat(trainingProgram.getCourses()).doesNotContain(courseBack);
        assertThat(courseBack.getTrainingProgram()).isNull();
    }

    @Test
    void learningCompetenceTest() {
        TrainingProgram trainingProgram = getTrainingProgramRandomSampleGenerator();
        LearningCompetence learningCompetenceBack = getLearningCompetenceRandomSampleGenerator();

        trainingProgram.addLearningCompetence(learningCompetenceBack);
        assertThat(trainingProgram.getLearningCompetences()).containsOnly(learningCompetenceBack);
        assertThat(learningCompetenceBack.getTrainingProgram()).isEqualTo(trainingProgram);

        trainingProgram.removeLearningCompetence(learningCompetenceBack);
        assertThat(trainingProgram.getLearningCompetences()).doesNotContain(learningCompetenceBack);
        assertThat(learningCompetenceBack.getTrainingProgram()).isNull();

        trainingProgram.learningCompetences(new HashSet<>(Set.of(learningCompetenceBack)));
        assertThat(trainingProgram.getLearningCompetences()).containsOnly(learningCompetenceBack);
        assertThat(learningCompetenceBack.getTrainingProgram()).isEqualTo(trainingProgram);

        trainingProgram.setLearningCompetences(new HashSet<>());
        assertThat(trainingProgram.getLearningCompetences()).doesNotContain(learningCompetenceBack);
        assertThat(learningCompetenceBack.getTrainingProgram()).isNull();
    }

    @Test
    void projectTest() {
        TrainingProgram trainingProgram = getTrainingProgramRandomSampleGenerator();
        Project projectBack = getProjectRandomSampleGenerator();

        trainingProgram.addProject(projectBack);
        assertThat(trainingProgram.getProjects()).containsOnly(projectBack);
        assertThat(projectBack.getTrainingProgram()).isEqualTo(trainingProgram);

        trainingProgram.removeProject(projectBack);
        assertThat(trainingProgram.getProjects()).doesNotContain(projectBack);
        assertThat(projectBack.getTrainingProgram()).isNull();

        trainingProgram.projects(new HashSet<>(Set.of(projectBack)));
        assertThat(trainingProgram.getProjects()).containsOnly(projectBack);
        assertThat(projectBack.getTrainingProgram()).isEqualTo(trainingProgram);

        trainingProgram.setProjects(new HashSet<>());
        assertThat(trainingProgram.getProjects()).doesNotContain(projectBack);
        assertThat(projectBack.getTrainingProgram()).isNull();
    }

    @Test
    void checkListTest() {
        TrainingProgram trainingProgram = getTrainingProgramRandomSampleGenerator();
        CheckList checkListBack = getCheckListRandomSampleGenerator();

        trainingProgram.addCheckList(checkListBack);
        assertThat(trainingProgram.getCheckLists()).containsOnly(checkListBack);
        assertThat(checkListBack.getTrainingProgram()).isEqualTo(trainingProgram);

        trainingProgram.removeCheckList(checkListBack);
        assertThat(trainingProgram.getCheckLists()).doesNotContain(checkListBack);
        assertThat(checkListBack.getTrainingProgram()).isNull();

        trainingProgram.checkLists(new HashSet<>(Set.of(checkListBack)));
        assertThat(trainingProgram.getCheckLists()).containsOnly(checkListBack);
        assertThat(checkListBack.getTrainingProgram()).isEqualTo(trainingProgram);

        trainingProgram.setCheckLists(new HashSet<>());
        assertThat(trainingProgram.getCheckLists()).doesNotContain(checkListBack);
        assertThat(checkListBack.getTrainingProgram()).isNull();
    }

    @Test
    void levelEducationTest() {
        TrainingProgram trainingProgram = getTrainingProgramRandomSampleGenerator();
        LevelEducation levelEducationBack = getLevelEducationRandomSampleGenerator();

        trainingProgram.setLevelEducation(levelEducationBack);
        assertThat(trainingProgram.getLevelEducation()).isEqualTo(levelEducationBack);

        trainingProgram.levelEducation(null);
        assertThat(trainingProgram.getLevelEducation()).isNull();
    }
}
