package co.edu.sena.domain;

import static co.edu.sena.domain.AreaInstructorTestSamples.*;
import static co.edu.sena.domain.AreaTestSamples.*;
import static co.edu.sena.domain.InstructorTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class AreaInstructorTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AreaInstructor.class);
        AreaInstructor areaInstructor1 = getAreaInstructorSample1();
        AreaInstructor areaInstructor2 = new AreaInstructor();
        assertThat(areaInstructor1).isNotEqualTo(areaInstructor2);

        areaInstructor2.setId(areaInstructor1.getId());
        assertThat(areaInstructor1).isEqualTo(areaInstructor2);

        areaInstructor2 = getAreaInstructorSample2();
        assertThat(areaInstructor1).isNotEqualTo(areaInstructor2);
    }

    @Test
    void areaTest() {
        AreaInstructor areaInstructor = getAreaInstructorRandomSampleGenerator();
        Area areaBack = getAreaRandomSampleGenerator();

        areaInstructor.setArea(areaBack);
        assertThat(areaInstructor.getArea()).isEqualTo(areaBack);

        areaInstructor.area(null);
        assertThat(areaInstructor.getArea()).isNull();
    }

    @Test
    void instructorTest() {
        AreaInstructor areaInstructor = getAreaInstructorRandomSampleGenerator();
        Instructor instructorBack = getInstructorRandomSampleGenerator();

        areaInstructor.setInstructor(instructorBack);
        assertThat(areaInstructor.getInstructor()).isEqualTo(instructorBack);

        areaInstructor.instructor(null);
        assertThat(areaInstructor.getInstructor()).isNull();
    }
}
