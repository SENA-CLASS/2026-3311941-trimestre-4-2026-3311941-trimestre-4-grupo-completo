package co.edu.sena.domain;

import static co.edu.sena.domain.BondingInstructorTestSamples.*;
import static co.edu.sena.domain.BondingTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class BondingTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Bonding.class);
        Bonding bonding1 = getBondingSample1();
        Bonding bonding2 = new Bonding();
        assertThat(bonding1).isNotEqualTo(bonding2);

        bonding2.setId(bonding1.getId());
        assertThat(bonding1).isEqualTo(bonding2);

        bonding2 = getBondingSample2();
        assertThat(bonding1).isNotEqualTo(bonding2);
    }

    @Test
    void bondingInstructorTest() {
        Bonding bonding = getBondingRandomSampleGenerator();
        BondingInstructor bondingInstructorBack = getBondingInstructorRandomSampleGenerator();

        bonding.addBondingInstructor(bondingInstructorBack);
        assertThat(bonding.getBondingInstructors()).containsOnly(bondingInstructorBack);
        assertThat(bondingInstructorBack.getBonding()).isEqualTo(bonding);

        bonding.removeBondingInstructor(bondingInstructorBack);
        assertThat(bonding.getBondingInstructors()).doesNotContain(bondingInstructorBack);
        assertThat(bondingInstructorBack.getBonding()).isNull();

        bonding.bondingInstructors(new HashSet<>(Set.of(bondingInstructorBack)));
        assertThat(bonding.getBondingInstructors()).containsOnly(bondingInstructorBack);
        assertThat(bondingInstructorBack.getBonding()).isEqualTo(bonding);

        bonding.setBondingInstructors(new HashSet<>());
        assertThat(bonding.getBondingInstructors()).doesNotContain(bondingInstructorBack);
        assertThat(bondingInstructorBack.getBonding()).isNull();
    }
}
