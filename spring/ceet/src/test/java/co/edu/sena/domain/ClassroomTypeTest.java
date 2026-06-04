package co.edu.sena.domain;

import static co.edu.sena.domain.ClassroomTestSamples.*;
import static co.edu.sena.domain.ClassroomTypeTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class ClassroomTypeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ClassroomType.class);
        ClassroomType classroomType1 = getClassroomTypeSample1();
        ClassroomType classroomType2 = new ClassroomType();
        assertThat(classroomType1).isNotEqualTo(classroomType2);

        classroomType2.setId(classroomType1.getId());
        assertThat(classroomType1).isEqualTo(classroomType2);

        classroomType2 = getClassroomTypeSample2();
        assertThat(classroomType1).isNotEqualTo(classroomType2);
    }

    @Test
    void classroomTest() {
        ClassroomType classroomType = getClassroomTypeRandomSampleGenerator();
        Classroom classroomBack = getClassroomRandomSampleGenerator();

        classroomType.addClassroom(classroomBack);
        assertThat(classroomType.getClassrooms()).containsOnly(classroomBack);
        assertThat(classroomBack.getClassroomType()).isEqualTo(classroomType);

        classroomType.removeClassroom(classroomBack);
        assertThat(classroomType.getClassrooms()).doesNotContain(classroomBack);
        assertThat(classroomBack.getClassroomType()).isNull();

        classroomType.classrooms(new HashSet<>(Set.of(classroomBack)));
        assertThat(classroomType.getClassrooms()).containsOnly(classroomBack);
        assertThat(classroomBack.getClassroomType()).isEqualTo(classroomType);

        classroomType.setClassrooms(new HashSet<>());
        assertThat(classroomType.getClassrooms()).doesNotContain(classroomBack);
        assertThat(classroomBack.getClassroomType()).isNull();
    }
}
