package co.edu.sena.domain;

import static co.edu.sena.domain.ClassroomLimitationTestSamples.*;
import static co.edu.sena.domain.ClassroomTestSamples.*;
import static co.edu.sena.domain.LearningResultTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ClassroomLimitationTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ClassroomLimitation.class);
        ClassroomLimitation classroomLimitation1 = getClassroomLimitationSample1();
        ClassroomLimitation classroomLimitation2 = new ClassroomLimitation();
        assertThat(classroomLimitation1).isNotEqualTo(classroomLimitation2);

        classroomLimitation2.setId(classroomLimitation1.getId());
        assertThat(classroomLimitation1).isEqualTo(classroomLimitation2);

        classroomLimitation2 = getClassroomLimitationSample2();
        assertThat(classroomLimitation1).isNotEqualTo(classroomLimitation2);
    }

    @Test
    void classroomTest() {
        ClassroomLimitation classroomLimitation = getClassroomLimitationRandomSampleGenerator();
        Classroom classroomBack = getClassroomRandomSampleGenerator();

        classroomLimitation.setClassroom(classroomBack);
        assertThat(classroomLimitation.getClassroom()).isEqualTo(classroomBack);

        classroomLimitation.classroom(null);
        assertThat(classroomLimitation.getClassroom()).isNull();
    }

    @Test
    void learningResultTest() {
        ClassroomLimitation classroomLimitation = getClassroomLimitationRandomSampleGenerator();
        LearningResult learningResultBack = getLearningResultRandomSampleGenerator();

        classroomLimitation.setLearningResult(learningResultBack);
        assertThat(classroomLimitation.getLearningResult()).isEqualTo(learningResultBack);

        classroomLimitation.learningResult(null);
        assertThat(classroomLimitation.getLearningResult()).isNull();
    }
}
