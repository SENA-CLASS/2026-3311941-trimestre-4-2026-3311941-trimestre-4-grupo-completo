package com.mycompany.ejemplo04.domain;

import static com.mycompany.ejemplo04.domain.CuentaTestSamples.*;
import static com.mycompany.ejemplo04.domain.TipoDocumentoTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.ejemplo04.web.rest.TestUtil;
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
    void cuentaTest() {
        TipoDocumento tipoDocumento = getTipoDocumentoRandomSampleGenerator();
        Cuenta cuentaBack = getCuentaRandomSampleGenerator();

        tipoDocumento.addCuenta(cuentaBack);
        assertThat(tipoDocumento.getCuentas()).containsOnly(cuentaBack);
        assertThat(cuentaBack.getTipoDocumento()).isEqualTo(tipoDocumento);

        tipoDocumento.removeCuenta(cuentaBack);
        assertThat(tipoDocumento.getCuentas()).doesNotContain(cuentaBack);
        assertThat(cuentaBack.getTipoDocumento()).isNull();

        tipoDocumento.cuentas(new HashSet<>(Set.of(cuentaBack)));
        assertThat(tipoDocumento.getCuentas()).containsOnly(cuentaBack);
        assertThat(cuentaBack.getTipoDocumento()).isEqualTo(tipoDocumento);

        tipoDocumento.setCuentas(new HashSet<>());
        assertThat(tipoDocumento.getCuentas()).doesNotContain(cuentaBack);
        assertThat(cuentaBack.getTipoDocumento()).isNull();
    }
}
