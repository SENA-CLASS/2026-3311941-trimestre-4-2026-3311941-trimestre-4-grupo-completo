package co.edu.sena.domain;

import static co.edu.sena.domain.CampusTestSamples.*;
import static co.edu.sena.domain.ClassroomTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class CampusTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Campus.class);
        Campus campus1 = getCampusSample1();
        Campus campus2 = new Campus();
        assertThat(campus1).isNotEqualTo(campus2);

        campus2.setId(campus1.getId());
        assertThat(campus1).isEqualTo(campus2);

        campus2 = getCampusSample2();
        assertThat(campus1).isNotEqualTo(campus2);
    }

    @Test
    void classroomTest() {
        Campus campus = getCampusRandomSampleGenerator();
        Classroom classroomBack = getClassroomRandomSampleGenerator();

        campus.addClassroom(classroomBack);
        assertThat(campus.getClassrooms()).containsOnly(classroomBack);
        assertThat(classroomBack.getCampus()).isEqualTo(campus);

        campus.removeClassroom(classroomBack);
        assertThat(campus.getClassrooms()).doesNotContain(classroomBack);
        assertThat(classroomBack.getCampus()).isNull();

        campus.classrooms(new HashSet<>(Set.of(classroomBack)));
        assertThat(campus.getClassrooms()).containsOnly(classroomBack);
        assertThat(classroomBack.getCampus()).isEqualTo(campus);

        campus.setClassrooms(new HashSet<>());
        assertThat(campus.getClassrooms()).doesNotContain(classroomBack);
        assertThat(classroomBack.getCampus()).isNull();
    }
}
