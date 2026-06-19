package co.edu.sena.domain;

import static co.edu.sena.domain.AreaInstructorTestSamples.*;
import static co.edu.sena.domain.AreaTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class AreaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Area.class);
        Area area1 = getAreaSample1();
        Area area2 = new Area();
        assertThat(area1).isNotEqualTo(area2);

        area2.setId(area1.getId());
        assertThat(area1).isEqualTo(area2);

        area2 = getAreaSample2();
        assertThat(area1).isNotEqualTo(area2);
    }

    @Test
    void areaInstructorTest() {
        Area area = getAreaRandomSampleGenerator();
        AreaInstructor areaInstructorBack = getAreaInstructorRandomSampleGenerator();

        area.addAreaInstructor(areaInstructorBack);
        assertThat(area.getAreaInstructors()).containsOnly(areaInstructorBack);
        assertThat(areaInstructorBack.getArea()).isEqualTo(area);

        area.removeAreaInstructor(areaInstructorBack);
        assertThat(area.getAreaInstructors()).doesNotContain(areaInstructorBack);
        assertThat(areaInstructorBack.getArea()).isNull();

        area.areaInstructors(new HashSet<>(Set.of(areaInstructorBack)));
        assertThat(area.getAreaInstructors()).containsOnly(areaInstructorBack);
        assertThat(areaInstructorBack.getArea()).isEqualTo(area);

        area.setAreaInstructors(new HashSet<>());
        assertThat(area.getAreaInstructors()).doesNotContain(areaInstructorBack);
        assertThat(areaInstructorBack.getArea()).isNull();
    }
}
