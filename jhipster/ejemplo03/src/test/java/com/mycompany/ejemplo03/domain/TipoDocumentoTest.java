package com.mycompany.ejemplo03.domain;

import static com.mycompany.ejemplo03.domain.CuentaTestSamples.*;
import static com.mycompany.ejemplo03.domain.TipoDocumentoTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.ejemplo03.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class TipoDocumentoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoDocumento.class);
        TipoDocumento tipoDocumento1 = getTipoDocumentoSample1();
        TipoDocumento tipoDocumento2 = new TipoDocumento();
        assertThat(tipoDocumento1).isNotEqualTo(tipoDocumento2);

        tipoDocumento2.setId(tipoDocumento1.getId());
        assertThat(tipoDocumento1).isEqualTo(tipoDocumento2);

        tipoDocumento2 = getTipoDocumentoSample2();
        assertThat(tipoDocumento1).isNotEqualTo(tipoDocumento2);
    }

    @Test
    void cuentasTest() {
        TipoDocumento tipoDocumento = getTipoDocumentoRandomSampleGenerator();
        Cuenta cuentaBack = getCuentaRandomSampleGenerator();

        tipoDocumento.addCuentas(cuentaBack);
        assertThat(tipoDocumento.getCuentases()).containsOnly(cuentaBack);
        assertThat(cuentaBack.getTipoDocumento()).isEqualTo(tipoDocumento);

        tipoDocumento.removeCuentas(cuentaBack);
        assertThat(tipoDocumento.getCuentases()).doesNotContain(cuentaBack);
        assertThat(cuentaBack.getTipoDocumento()).isNull();

        tipoDocumento.cuentases(new HashSet<>(Set.of(cuentaBack)));
        assertThat(tipoDocumento.getCuentases()).containsOnly(cuentaBack);
        assertThat(cuentaBack.getTipoDocumento()).isEqualTo(tipoDocumento);

        tipoDocumento.setCuentases(new HashSet<>());
        assertThat(tipoDocumento.getCuentases()).doesNotContain(cuentaBack);
        assertThat(cuentaBack.getTipoDocumento()).isNull();
    }
}
